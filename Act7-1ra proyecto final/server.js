const express = require('express')
const app = express()

const Contenedor = require('./src/contenedor')
const contenedor = new Contenedor('./api/productos.json', [
  'timestamp',
  'title',
  'price',
  'description',
  'code',
  'image',
  'stock',
])
const carrito = new Contenedor('./api/carrito.json', ['timestamp', 'products'])

const { Router } = express

/*------Middlewares------*/
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

/*-----Configuro accesos ----*/
const isAdmin = false //le puse false para probar y no permite el acceso

const isNotAdmin = (rout, method) => {
  const error = {
    error: -1,
  }
  if (rout && method) {
    error.description = `ruta ${rout} metodo ${method} no implementada`
  } else {
    error.description = 'no autorizado'
  }
  return error
}

const authMiddleware = (req, res, next) => {
  !isAdmin ? res.status(401).json(isNotAdmin()) : next()
}

/*---- Configuro los routers-----*/
const routerProducts = new Router()
const routerCart = new Router()

app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCart)

// GET /api/productos  > devuelve todos los productos
routerProducts.get('/', async (req, res) => {
  const products = await contenedor.getAll()
  res.status(200).json(products)
})

// GET /api/productos/:id  > devuelve un producto según su id
routerProducts.get('/:id', async (req, res) => {
  const { id } = req.params
  const product = await contenedor.getById(id)

  product
    ? res.status(200).json(product)
    : res.status(400).json({ error: 'producto no encontrado' })
})

// POST /api/productos  > recibe y agrega un producto, y lo devuelve con su id asignado
routerProducts.post('/', authMiddleware, async (req, res) => {
  const { body } = req
  body.timestamp = Date.now()
  const newProductId = await contenedor.save(body)

  newProductId
    ? res
        .status(200)
        .json({ success: 'producto agregado con ID: ' + newProductId })
    : res.status(400).json({ error: 'clave invalida' })
})

// PUT /api/productos/:id > recibe y actualiza un producto según su id
routerProducts.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const { body } = req
  const wasUpdated = await contenedor.updateById(id, body)

  wasUpdated
    ? res.status(200).json({ success: 'producto actualizado' })
    : res.status(404).json({ error: 'producto no encontrado' })
})

// DELETE /api/productos/:id
routerProducts.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const wasDeleted = await contenedor.deleteById(id)

  wasDeleted
    ? res.status(200).json({ success: 'producto eliminado exitosamente' })
    : res.status(404).json({ error: 'producto no encontrado' })
})

/* ------------------------ Cart Endpoints ------------------------ */

// POST /api/carrito

routerCart.post('/', async (req, res) => {
  const { body } = req

  body.timestamp = Date.now()
  body.products = []
  const newCartId = await carrito.save(body)

  newCartId
    ? res.status(200).json({ success: 'agregado con ID: ' + newCartId })
    : res.status(400).json({ error: 'clave invalida' })
})

// DELETE /api/carrito/id
routerCart.delete('/:id', async (req, res) => {
  const { id } = req.params
  const wasDeleted = await carrito.deleteById(id)

  wasDeleted
    ? res.status(200).json({ success: 'eliminado exitosamente' })
    : res.status(404).json({ error: 'carrito vacio o no encontrado' })
})

// POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async (req, res) => {
  const { id } = req.params
  const { body } = req

  const product = await contenedor.getById(body['id'])

  if (product) {
    const cartExist = await carrito.addToArrayById(id, { products: product })
    cartExist
      ? res.status(200).json({ success: 'producto agregado' })
      : res.status(404).json({ error: 'carrito no encontrado' })
  } else {
    res.status(404).json({
      error: 'producto no encontrado, verifique el ID.',
    })
  }
})

// GET /api/carrito/:id/productos
routerCart.get('/:id/productos', async (req, res) => {
  const { id } = req.params
  const cart = await carrito.getById(id)

  cart
    ? res.status(200).json(cart.products)
    : res.status(404).json({ error: 'carrito no encontrado' })
})

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params
  const productExists = await contenedor.getById(id_prod)
  if (productExists) {
    const cartExists = await carrito.removeFromArrayById(
      id,
      id_prod,
      'products',
    )
    cartExists
      ? res.status(200).json({ success: 'producto eliminado' })
      : res.status(404).json({ error: 'carrito no encontrado' })
  } else {
    res.status(404).json({ error: 'producto no encontrado' })
  }
})

/*-----Servidor-----*/
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(
    ` >>>>> 🚀 Servidor escuchando en el puerto http://localhost:${PORT}`,
  )
})
server.on('error', (err) => console.log(`Error en servidor ${err}`))

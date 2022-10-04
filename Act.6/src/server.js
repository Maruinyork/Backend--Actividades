const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { engine } = require('express-handlebars')

// instanciar servidor, socket y api
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./contenedor')
const contenedor = new Contenedor('productos.json')
const chat = new Contenedor('chat.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('views', './src/views')
app.set('view engine', 'hbs')

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  }),
)

// configuro el socket
io.on('connection', async (socket) => {
  console.log('🟢 Usuario conectado')

  // carga inicial de productos
  const productos = await contenedor.getAll()
  socket.emit('listaInicial', productos)

  // carga inicial de mensajes
  const mensajes = await chat.getAll()
  socket.emit('listaMensajes', mensajes)

  // actualizacion de mensajes
  socket.on('nuevoMensaje', async (data) => {
    await chat.save(data)

    const mensajes = await chat.getAll()
    io.sockets.emit('listaMensajesActualizada', mensajes)
  })

  // actualizacion de productos
  socket.on('productoAgregado', async (data) => {
    console.log('producto agregado')
    await contenedor.save(data)

    const productos = await contenedor.getAll()
    io.sockets.emit('listaActualizada', productos)
  })

  socket.on('disconnect', () => {
    console.log('🔴 Usuario desconectado')
  })
})

app.get('/productos', async (req, res) => {
  const productos = await contenedor.getAll()
  res.render('pages/list', { productos })
})

app.post('/productos', async (req, res) => {
  const { body } = req
  await contenedor.save(body)
  res.redirect('/')
})

app.get('/', (req, res) => {
  res.render('pages/form', {})
})

const PORT = 13000
httpServer.listen(PORT, () => {
  console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

httpServer.on('error', (err) => console.log(err))

const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

// instanciar servidor, socket y api
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//Uso de motor de plantillas
app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const Contenedor = require('./public/contenedor')
const db = new Contenedor('products')

const ContenedorChat = require('./public/contenedorChat')
const dbChat = new ContenedorChat('mensajes')

////////////////////////CLIENTE///////////////////////
// Configuro el socket
io.on('connection', (socket) => {
  console.log('🟢 Usuario conectado')

  //Carga de productos//
  db.get()
    .then((products) => {
      socket.emit('connection', { products: products })
    })
    .catch((err) => {
      err['code'] === 'ER_NO_SUCH_TABLE' ? db.createTable() : console.log(err)
      throw err
    })

  //Carga de mensajes//
  dbChat
    .get()
    .then((msgs) => {
      socket.emit('connection', { messages: msgs })
    })
    .catch((err) => {
      dbChat.createTable()
      console.log(err)
      throw err
    })

  // Actualizacion de productos
  socket.on('newProduct', (product) => {
    db.add(product)
    io.emit('newProduct', product)
  })

  // Actualizacion de mensajes
  socket.on('newMessage', (message) => {
    dbChat.add(message)
    io.emit('newMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('🔴 Usuario desconectado')
  })
})

//////////////////////////////////////////////////////
const productsRouter = require('./routes/Products')
app.use('/', productsRouter)

app.use((req, res) => {
  res.status(404)
})

//////////////////Puerto////////////////////////
const PORT = process.env.PORT || 8080

httpServer.listen(PORT, () => {
  console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

httpServer.on('error', (err) => console.log(err))

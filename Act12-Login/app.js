const express = require("express")
const app = express()
const { Server:HttpServer } = require("http")
const httpServer = new HttpServer(app)
const { Server:ServerIo } = require("socket.io")
const io = new ServerIo(httpServer)
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

app.set("view engine", "pug")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(cookieParser(process.env.COOKIES_SECRET || 'secret'))

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
    store: MongoStore.create({
        mongoUrl:process.env.MONGOATLAS_URL ||'mongodb+srv://MaruinYork:******@cluster0.n9vmygq.mongodb.net/?retryWrites=true&w=majority', 
        mongoOptions:advancedOptions
    })

}))

app.use(logger('dev'))

const productsRouter = require('./routes/Productos')
const sessionRouter = require('./routes/session')
const testRouter = require('./routes/Test')

app.use("/api/", productsRouter)
app.use("/api/", testRouter)
app.use("/api/session", sessionRouter)

app.use( (req, res) => {
    res.status(404);
    res.send("Aqui no hay nada. Proba: http://localhost:5000/api/session/login");
})


////////////////////////CLIENTE///////////////////////

const ProductosDaosFirebase = require('./daos/ProductosDaosFirebase')
const db = new ProductosDaosFirebase()

const ChatDaosFirebase = require('./daos/ChatDaosFirebase')
const { Session } = require("inspector")
const chatdb = new ChatDaosFirebase()

io.on('connection', (socket) => {
    console.log('🟢 Usuario conectado')

    db.get().then((products) => {
        socket.emit('connection', {"products": products})
    }).catch((err) => {
        console.log(err) ; throw err
    })

    chatdb.crudChat().then((chat) => {
        socket.emit('connection', {"chat":chat})
    }).catch((err) => {
        console.log(err) ; throw err
    })

    // NUEVOS PRODUCTOS
    socket.on('postProduct', (product) => {
        db.add(product)
        io.emit('postProduct', product)
    })

    // NUEVOS MENSAJES DEL CHAT
    socket.on('chatter', (message) => {
        chatdb.crudChat(message)
        io.emit('chatter', message)
    })
    socket.on('disconnect', () => {
        console.log('🔴 Usuario desconectado')
    })
})


//////////////////////////////////////////////////////

module.exports = {
    app,
    httpServer,
    io
}
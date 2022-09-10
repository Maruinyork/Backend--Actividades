const express = require('express')
const app = express()

const Archivos = require('./Contenedor/Contenedor') //importamos los archivos
const data = new Archivos('./productos.txt')

app.get('/', (req, res)=>{
    res.send('hola tutora')
})

app.get('/productos',(req,res)=>{
    data.getAll() //primero los obtengo todos
    .then((data)=>{
        res.send(data);
    })
    
})
app.get('/productoRandom',(req,res)=>{
    data.getRandom()
    .then((data)=>{
        res.send(data);
    })
    
})
const PORT = 8080;//asignamos el puerto

const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando por el puerto ${PORT}`);
})

server.on("error", (err)=>console.log(`Error en el servidor: ${err}`))


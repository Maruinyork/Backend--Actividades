const express = require('express')
const router = express.Router()

const { faker } = require('@faker-js/faker')

faker.locale = 'es'

//api/productos-test
router.get('/productos-test', (req, res) => {
    const testedProducts = []

    for (let i = 0; i < 5; i++) {

        const tested = {
            id: faker.datatype.uuid(),
            timestamp: faker.datatype.datetime(),
            title: faker.vehicle.bicycle(),
            detail: faker.lorem.sentence(5),
            thumbnail: faker.image.imageUrl(400,600,'bike', true),
            price: faker.commerce.price(1, 100, 0),
            code: faker.datatype.hexadecimal(),
            stock: faker.datatype.number({min: 10, max:100})
        }

        testedProducts.push(tested)
    }

    console.log(testedProducts)

    res.render("productosTest", {form:false, products:testedProducts})
})

router.get('/info', (req, res) => {
    const os = require("os")

    res.json({
        'Argumentos de entrada' : process.argv.slice(2),
        'Nombre de la plataforma ': process.platform,
        'Versión de node.js': process.versions['node'],
        'Memoria total reservada': process.memoryUsage()['rss'],
        'Path de ejecución': process.argv[1],
        'Process id': process.pid,
        'Carpeta del proyecto': process.cwd(),
        'Número de procesadores': os.cpus().length 
    })

    //artillery quick --count 50 -n 20 http://localhost:8080/api/info > profiling/result_nolog.txt
    // node --prof-process profiling/nolog-v8.log > profiling/result_nolog.txt

})

router.get('/infolog', (req, res) => {
    const os = require("os")

    console.log({
        argumentosDeEntrada: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.versions['node'],
        memoriaTotalReservada: process.memoryUsage()['rss'],
        exPath: process.argv[1],
        processID: process.pid,
        carpetaProyecto: process.cwd(),
        Procesadores: os.cpus().length
    })

    res.json({
        argumentosDeEntrada: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.versions['node'],
        memoriaTotalReservada: process.memoryUsage()['rss'],
        exPath: process.argv[1],
        processID: process.pid,
        carpetaProyecto: process.cwd(),
        Procesadores: os.cpus().length
    })

    //artillery quick --count 50 -n 20 http://localhost:8080/api/info > profiling/result_log.txt
    // node --prof-process 14-Loggers/profiling/log-v8.log > profiling/result_log.txt

})

module.exports = router
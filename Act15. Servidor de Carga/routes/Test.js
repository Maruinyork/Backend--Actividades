const express = require('express')
const router = express.Router()
const os = require('node:os');
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


// api/info
router.get('/info', (req, res) => {
    const processInfo ={
        'Argumentos de entrada' : process.argv.slice(2),
        'Nombre de la plataforma ': process.platform,
        'Versión de node.js': process.versions['node'],
        'Memoria total reservada': process.memoryUsage()['rss'],
        'Path de ejecución': process.argv[1],
        'Process id': process.pid,
        'Carpeta del proyecto': process.cwd(),
        'Número de procesadores': os.cpus().length //consigna 1
    };
    res.status(200).json(processInfo);
})
module.exports = router
const express = require('express')
const router = express.Router()

const { faker } = require('@faker-js/faker')
faker.locale = 'es'

router.get('/productos-test', (req, res) => {
    const dummies = []

    for (let i = 0; i < 5; i++) {

        const dummy = {
            id: faker.datatype.uuid(),
            timestamp: faker.datatype.datetime(),
            title: faker.vehicle.bicycle(),
            detail: faker.lorem.sentence(5),
            thumbnail: faker.image.imageUrl(400,600,'bike', true),
            price: faker.commerce.price(1, 100, 0),
            code: faker.datatype.hexadecimal(),
            stock: faker.datatype.number({min: 10, max:100})
        }

        dummies.push(dummy)
    }

    console.log(dummies)

    res.render("productosTest", {form:false, products:dummies})
})

module.exports = router
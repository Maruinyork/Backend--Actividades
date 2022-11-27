const express = require("express")
const router = express.Router()

const { getDefault, getProducts, postProduct, putProduct, deleteProduct } = require('../controllers/productos.controller')

router.get("/", getDefault)

router.get("/productos", getProducts)

router.get("/productos/:id", getProducts)

router.post("/productos", postProduct)

router.put("/productos/:id", putProduct)

router.delete("/productos/:id", deleteProduct)


module.exports = router
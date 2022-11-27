const express = require("express")
const router = express.Router()
const Contenedor = require('../public/contenedor')

const db = new Contenedor('products')


router.get("/", (req, res) => {
    res.render("index", {form:true})

})

router.get("/productos", (req, res) => {

    db.get().then((rows) => {
        res.render("index", {form:false, products:rows})
    }).catch((err) => {
        (err['code'] === 'ER_NO_SUCH_TABLE') ? db.createTable() : console.log(err) ; throw err
    })

})

router.get("/productos/:id", (req, res) => {
    const { id } = req.params

    db.get(id).then((row) => {
        res.json({success:true, product:row} || {success:false, err:"ID no existe."})
    }).catch((err) => {
        (err['code'] === 'ER_NO_SUCH_TABLE') ? db.createTable() : console.log(err) ; throw err  
    })

})

router.post("/productos", (req, res) => {

    const {title, price, thumbnail, detail, stock } = req.body

    const product = {
        "title": title,
        "price": price,
        "thumbnail": thumbnail,
        "detail": detail,
        "stock": stock
    }

    db.add(product)

    res.json({success:true, product:product})

    
})

router.put("/productos/:id", (req, res) => {
    
    const { id } = req.params
    const {title, price, thumbnail, detail, stock } = req.body

    res.json({success:false, err:"ID no existe."})


})

router.delete("/productos/:id", (req, res) => {

    const { id } = req.params

    db.delete(id).then(() => {
        res.json({success:true, text:"Si el ID existe, ha sido eliminado!"})
    }).catch((err) => {
        console.log(err) ; throw err
    })


})


module.exports = router
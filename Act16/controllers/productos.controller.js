const { response } = require('express')
const ProductosDaos = require('../daos/ProductosDaos')
const { logger } = require('../logs/logger')

const db = new ProductosDaos()

const getDefault = async (req, res = response) => {
    const username = req.user['username']
    res.render("index", {form:true, username:username})
}

const getProducts = async (req, res = response) => {
    const { id } = req.params
    const username = req.user['username']
    
    db.get(id).then((products) => {

        if (id) {
            res.json({success:true, product:products} || {success:false, err:"ID no existe."})
        }else{
            res.render("index", {form:false, products:products, username:username})
        }

    }).catch((err) => {
        logger.error(err) ; throw err
    })
}

const postProduct = async (req, res = response) => {

    const {title, price, thumbnail, detail, stock } = req.body

    const product = {
        title:
        title,
        price:
        price,
        thumbnail:
        thumbnail,
        detail:
        detail,
        stock:
        stock
    }

    db.add(product).then((id) => {
        res.json({success:true, newID:id})
    }).catch((err) => {
        res.json({success:false, error:err})
    })
}

const putProduct = async (req, res = response) => {

    const { id } = req.params
    const {title, price, thumbnail, detail, stock } = req.body

    const product = {title: title, price: price, thumbnail: thumbnail, detail: detail, stock: stock}

    db.update(id, product).then(() => {
        res.json({success:true})
    }).catch((err) => {
        logger.error(err) ; throw err
    })
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params

    db.delete(id).then((result) => {
        res.json({success: true, log: result})
    }).catch((err) => {
        logger.error(err) ; throw err
    })
}

module.exports = {
    getDefault,
    getProducts,
    postProduct,
    putProduct,
    deleteProduct
}
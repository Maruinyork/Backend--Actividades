const { response } = require('express')
const ProductosDaosFirebase = require('../daos/ProductosDaosFirebase')

const db = new ProductosDaosFirebase()

const getDefault = async (req, res = response) => {
    const username = req.signedCookies.logged
    res.render("index", {form:true, username:username})
}

const getProducts = async (req, res = response) => {
    const { id } = req.params

    db.get(id).then((products) => {

        if (id) {
            res.json({success:true, product:products} || {success:false, err:"ID no existe."})
        }else{
            res.render("index", {form:false, products:products})
        }

    }).catch((err) => {
        console.log(err) ; throw err
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
        console.log(err) ; throw err
    })
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params

    db.delete(id).then((result) => {
        res.json({success: true, log: result})
    }).catch((err) => {
        console.log(err) ; throw err
    })
}

const logged = (req, res, next) => {
    const log = req.signedCookies.logged
    const ses = req.session.user

    if (log && log === ses) {
        res.cookie('logged', log, {signed:true, maxAge:60000})
        next()   
    } else{
    req.session.destroy((err) => {
        if (err) {
            return err
        }else{
            res.render("index", {logged:true});
            res.clearCookie('logged')
            
        }
    })} 
}


module.exports = {
    getDefault,
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
    logged
}
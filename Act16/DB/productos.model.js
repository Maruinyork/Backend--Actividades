const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(

    {    
        title: {
            type: String,
            trim: true,
            required: true
        },

        thumbnail: {
            type: String,
            trim: true,
            required: false
        },

        detail: {
            type: String,
            trim: true,
            required: false
        },

        price: {
            type: Number,
            trim: true,
            required: true
        },

        stock: {
            type: Number,
            trim: true,
            required: true
        },

    },

    { timestamps: true }
)

module.exports = mongoose.model('productos', ProductSchema)
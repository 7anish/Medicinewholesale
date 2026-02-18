const mongoose = require('mongoose')


const rangeSchema = new mongoose.Schema({
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

const productScheam = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ourPrice: {
        type: Number,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    itemtype: {
        type: String,
        required: true
    },
    productimage: [
        {
            imageurl: {
                type: String
            }
        }
    ],
    range: [rangeSchema],
    size : {
        type : String,
    },
    composition : {
        type : String,
    },
    inventory : {
        type : Number,
        required : true
    },
    featured : {
        type : Boolean,
        default : false
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
})


const product = mongoose.model('product', productScheam)

module.exports = product

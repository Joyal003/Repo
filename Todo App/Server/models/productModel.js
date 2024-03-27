const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        description: {
            type : String,
            required:true,
            default :0
        },
        status : {
            type : Number,
            required:false,
        },
        completed : {
            type : Boolean ,
            required : true,
            default:false
        },
        image : {
            type : String ,
            required : false
        }
    },
    {
        timestamps : true
    }
)

const product = mongoose.model('Product', productSchema)

module.exports = product
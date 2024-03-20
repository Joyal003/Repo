const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required :[true,"Please enter a title"]
        },
        description: {
            type : String,
            required:true,
            default :0
        },
        status : {
            type : Number,
            required:false,
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
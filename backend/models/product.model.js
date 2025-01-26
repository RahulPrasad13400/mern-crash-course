import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    price : {
        type : Number,
        required : true 
    },
    image : {
        type : String,
        required : true 
    }
},{
    timestamps : true // the product will have a created At and updated At on each document 
})

const Product = mongoose.model('Product', productSchema)
export default Product
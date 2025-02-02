import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProducts =  async (req,res)=>{
    try{
        const products = await Product.find()
        res.status(200).json({
            status : "sucess",
            data : products 
        })
    }catch(error){
        console.log("error occured in creating the product", error.message)
        res.status(500).json({
            success : false,
            message : "server error"
        })       
    }
}

export const deleteProduct =  async (req,res)=>{
    const {id} = req.params
    try{
        await Product.findByIdAndDelete(id)
        res.status(200).json({
            success : true
        })
    }catch(error){
        console.log("error occured while deleting the product", error.message)
        res.status(500).json({
            success : false,
            message : "server error"
        })
    }
}

export const createProduct = async (req,res)=>{
    const product = req.body
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({
            success : false,
            message : "Please provide all fields"
        })
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save()
        res.status(201).json({
            success : true,
            data : newProduct 
        })
    }catch(error){
        console.log("error occured in creating the product", error.message)
        res.status(500).json({
            success : false,
            message : "server error"
        })
    }
}

export const updateProduct =  async (req,res)=>{
    const {id} = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){  // to check whether the id is valid or not 
        res.status(404).json({
            success : false,
            message : "Invalid product id"           
        }) 
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new : true}) // if new : false it will return the product before the update and if new : true it will return the product after update 
        res.status(200).json({
            success : true,
            data : updatedProduct
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "update failed"           
        })
    }
}
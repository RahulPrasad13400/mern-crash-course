import express from 'express'
import dotenv from "dotenv"
import {connectDB} from "./config/db.js"
import Product from './models/product.model.js'

const app = express()
dotenv.config() 

app.use(express.json())

app.post("/api/products",async (req,res)=>{
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
})

app.listen(4000,()=>{
    connectDB()
    console.log("server running")
})

// VMDyBfxtrtQ98Lbg
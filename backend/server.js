import express from 'express'
import dotenv from "dotenv"
import {connectDB} from "./config/db.js"
import productRoutes from './routes/product.route.js'
const PORT = process.env.PORT || 5000
const app = express()
dotenv.config() 

app.use(express.json())

app.use('/api/products', productRoutes)

app.listen(PORT,()=>{
    connectDB()
    console.log("server running")
})

// VMDyBfxtrtQ98Lbg
import express from 'express'
import dotenv from "dotenv"
import {connectDB} from "./config/db.js"
import productRoutes from './routes/product.route.js'
import path from "path"
const PORT = process.env.PORT || 5000
const app = express()
dotenv.config() 

const __dirname = path.resolve()
 
app.use(express.json())

app.use('/api/products', productRoutes)

console.log("node env : ",process.env.NODE_ENV)

if(process.env.NODE_ENV.trim() === "production"){
    console.log("hello")
        app.use(express.static(path.join(__dirname, "/frontend/dist")))
        app.get("*", (req, res)=>{
            res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
        })
}

app.listen(PORT,()=>{
    connectDB()
    console.log("server running")
})

// VMDyBfxtrtQ98Lbg
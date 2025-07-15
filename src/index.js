const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const port = process.env.PORT

const ApiRoutes = require('./routes/index')

app.use(express.json())

app.use("/api", ApiRoutes)

app.listen(port , () =>{
  console.log(`Server running at ${port}`)
})
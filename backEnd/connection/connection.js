const mongoose = require("mongoose")
const env = require("dotenv")
env.config()
const uri = process.env.mongodb_uri
mongoose.connect(uri)
.then(()=>console.log("mongodb is connected"))
const mongoose = require ('mongoose')
require('dotenv').config();
// const mongoUri = "mongodb://localhost:27017/inotebook"
// const mongoUri = "mongodb+srv://notedocar:notedocar%40atlas.mongodb@notedocar.yuxmn.mongodb.net/"
const mongoUri = process.env.DB_URI;


const conectTomongo = ()=>{
    mongoose.connect(mongoUri).then((data)=>{
        console.log("connected")
    })
}

module.exports = conectTomongo;
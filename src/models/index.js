const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
try {
    mongoose.connect(`${process.env.dbUrl}/${process.env.dbName}`)
} catch (error) {
    console.log(error)
}
module.exports = mongoose
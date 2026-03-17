const mongoose = require("mongoose") // this package allows for communication between the db and your server


const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        //console.log(`Information about the connection object : `,connection)
        console.log(`MongoDB connected: ${connection.connection.host}`)
    }
    catch(error){
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB
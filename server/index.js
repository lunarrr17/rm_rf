const express = require("express")
const dotenv = require("dotenv")

/*
this is the moment dotenv reads your .env file and loads everything inside into
"process.env".
So if your .env has a variable called as PORT then after the following line 
process.env.PORT exists and it does not before that
*/
dotenv.config()  


const app = express()
app.use(express.json()) //is a built in middleware that automatically parses the raw text into a proper JSON object

const PORT = process.env.PORT || 5000

/*
 This is what actually starts your server. It tells your computer "start listening for incoming requests on this port number." 
 The function inside runs once when the server successfully starts — that's when you see the console message.
*/
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

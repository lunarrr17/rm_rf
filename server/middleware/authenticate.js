const jwt = require("jsonwebtoken")

const authenticate = (req , res , next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" })
        }

        const token = authHeader.split(" ")[1] // it gives you the access token

        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET) // this does three things automatically - checks if the signature is valid , checks if the token has not expired and decodes and returns the payload

        req.user = decoded  // you are attaching the decoded payload to the request object so that any controller that works after this middleware can access the user payload

        next()
    }
    catch(error) {
        res.status(401).json({ message: "Invalid or expired token" })
    }
}

module.exports = authenticate
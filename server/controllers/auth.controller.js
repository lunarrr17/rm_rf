const User = require("../models/User")
const bcrypt = require("bcryptjs")


// this is the authentication controller that works when a new user tries to signuo on our platform
const register = async (req , res) => {
    const { username , email , password } = req.body;
    try{

        if(!username || !email || !password) {
            res.status(400).json({ message: "Username , password and email are mandatory fields!" })
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        })

    if (existingUser) {
        if (existingUser.email === email) {
            return res.status(400).json({ message: 'Email already in use' })
        }
        if (existingUser.username === username) {
            return res.status(400).json({ message: 'Username already taken' })
        }
}

        salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: "user",
            isVerified: false
        })

        return res.status(200).json({ 
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                verified: user.isVerified,
                timestamp: user.createdAt
            }
         })
    }
    catch(error) {
        return res.status(500).json({ message: "Server Error" , error: error.message })
    }
}

module.exports = { register }
const jwt = require("jsonwebtoken")

const generateToken =  (user) => {
    const { _id , username , email , role } = user;
    const payload = {
        id: _id,
        username: username,
        role: role,
    }

    const accessSecretKey = process.env.ACCESS_TOKEN_SECRET
    const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET

    const accessKeyOptions = {
        expiresIn: "15m"
    }

    const refreshKeyOptions = {
        expiresIn: "7d"
    }

    const accessToken = jwt.sign(payload , accessSecretKey , accessKeyOptions);
    const refreshToken = jwt.sign(payload , refreshSecretKey , refreshKeyOptions);

    return { accessToken , refreshToken }
}

module.exports = generateToken
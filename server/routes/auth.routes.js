const express = require("express");
const router = express.Router()
const { register , signin } = require("../controllers/auth.controller")
const authenticate = require("../middleware/authenticate")

router.get("/me" , authenticate, (req , res) => {
    return res.status(200).json({ user: req.user })
})

router.post("/register" , register)
router.post("/signin" , signin)

module.exports = router
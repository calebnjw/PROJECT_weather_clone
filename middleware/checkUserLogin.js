const jwt =require("jsonwebtoken");

const authenticateJWT = async (req, res, next) => {
    try {
        const authToken = req.header("Authorization").replace("Bearer", "");
        const jwtVerify = jwt.verify(authToken, process.env.JWT_SECRET);
        console.log(`jwtVerify`, jwtVerify)
        next();
    } catch(err){
        return res.json({ message: "JWT expired" })
    }
};

module.exports = authenticateJWT;

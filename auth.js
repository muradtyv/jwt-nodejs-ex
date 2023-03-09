const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "secretkey");
        next();
    }catch(err) {
        if(err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({message: "invalid token"})
        }
        return res.status(500).json({message: "Server error"});
    }
}
const jwt = require("jsonwebtoken");

const protect = (req,res,next) => {

    try {

        console.log(
            "AUTH HEADER:",
            req.headers.authorization
        );

        const authHeader =
            req.headers.authorization;

        if(!authHeader){

            return res.status(401).json({
                success:false,
                message:"No token"
            });

        }

        const token =
            authHeader.split(" ")[1];
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );
        req.user = decoded;

        next();

    } catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });

    }

};

module.exports = protect;
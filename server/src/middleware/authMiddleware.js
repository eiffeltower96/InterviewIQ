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

        console.log(
    "PATH:",
    req.originalUrl
);

console.log(
    "TOKEN:",
    token.substring(0, 30)
);

        console.log(
            "JWT_SECRET:",
            process.env.JWT_SECRET
        );

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        console.log(
            "DECODED:",
            decoded
        );
console.log(
    "EXP:",
    decoded?.exp
);
        req.user = decoded;

        next();

    } catch(error){

        console.log(
            "JWT ERROR:",
            error
        );
console.log(
    "FAILED PATH:",
    req.originalUrl
);
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });

    }

};

module.exports = protect;
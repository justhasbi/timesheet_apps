import jwt from 'jsonwebtoken';
import { request, response } from 'express';

//Authorization
export const verifyToken = async (req = request, res = response, next) => {
    try {
        let token = req.header("Authorization");
        console.log(token);

        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const {JWT_SECRET} = process.env;
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        // eslint-disable-next-line no-undef
        next();
    } catch (error) {
        return res.status(501).json({
            success: false,
            error: error.message
        })
    }
}
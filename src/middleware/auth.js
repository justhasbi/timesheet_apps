import jwt from 'jsonwebtoken';
import { request, response } from 'express';

//Authorization
export const verifyToken = async (req = request, res = response) => {
    try {
        let token = req.headers("Authorization");

        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startWith("Bearer")){
            token = token.slice(7, token.length).trimLeft();
        }
        const {JWT_SECRET} = process.env;
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        // eslint-disable-next-line no-undef
        next();
    } catch (error) {
        return res.status.json({
            success: false,
            error: error.message
        })
    }
}
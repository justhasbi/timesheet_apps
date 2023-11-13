import dotenv from "dotenv"
dotenv.config()

export const config = { 
    //port: process.env.PORT,
    DB: process.env.DATABASE_NAME,
    USER: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD, 
    HOST: process.env.DB_HOST, 
    port: process.env.DB_PORT
}
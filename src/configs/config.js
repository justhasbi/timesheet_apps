import dotenv from "dotenv"
dotenv.config()

export const config = { 
    port: process.env.PORT,
    dbname: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD, 
    dbhost: process.env.DB_HOST, 
    dbport: process.env.DB_PORT
}
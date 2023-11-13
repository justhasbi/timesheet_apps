
import app from "./src/app.js"
import { config } from "./src/configs/config.js"
import { sequelizeDbInit } from "./src/models/index.js"
import dotenv from "dotenv"
dotenv.config();

const {PORT} = process.env || 6001;
try {
    console.log('Checking database connection...')
    await sequelizeDbInit.authenticate()
    console.log('Success Connecting to the database')
} catch (error) {
    console.log('Unable to connect to the database')
    console.log(error)
    process.exit(1)
}

app.listen(PORT, ()=> {
    console.log(`Server is running http://localhost:${config.port}.`);
})
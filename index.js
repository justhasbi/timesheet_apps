import app from "./src/app.js"
import { config } from "./src/configs/config.js"
import { sequelizeDbInit } from "./src/models/index.js"

try {
    console.log('Checking database connection...')
    await sequelizeDbInit.authenticate()
    console.log('Success Connecting to the database')
} catch (error) {
    console.log('Unable to connect to the database')
    console.log(error)
    process.exit(1)
}

app.listen(config.port, ()=> {
    console.log(`Server is running htt://localhost:${config.port}.`);
})
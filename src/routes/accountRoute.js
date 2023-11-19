import express from "express" 
import {createAccount, loginAccount, getAccounts} from "../controllers/index.js";


const account_route = express.Router()

account_route.post("/register", createAccount);

account_route.post("/login", loginAccount);

account_route.get("/accounts", getAccounts);



export default account_route
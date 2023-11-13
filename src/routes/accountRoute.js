import express from "express" 
import {createAccount, loginAccount} from "../controllers/index.js";

const account_route = express.Router()

account_route.post("/register", createAccount);
account_route.post("/login", loginAccount);

export default account_route
import express from "express";
import {verifyToken} from "../middleware/auth.js";
import {createAccount, loginAccount, getAccounts, changePasswordAccount, getAccountById} from "../controllers/index.js";


const account_route = express.Router()

account_route.post("/register", createAccount);

account_route.post("/login", loginAccount);

account_route.get("/accounts", verifyToken ,getAccounts);

account_route.get("/:account_id", verifyToken ,getAccountById);

//change password
account_route.post("/:account_id/changePassword", verifyToken, changePasswordAccount);



export default account_route
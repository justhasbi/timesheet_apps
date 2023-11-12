import express from "express" 

const account_route = express.Router()

account_route.post("/", () => {})
account_route.get("/:id", () => {})
account_route.get("/", () => {})
account_route.put("/", () => {})
account_route.delete("/:id", () => {})

export default account_route
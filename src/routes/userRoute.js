import express from "express" 

const user_route = express.Router()

user_route.post("/", (req, res) => {
    res.send("success")
})
user_route.get("/", () => {})
user_route.get("/:id", () => {})
user_route.put("/", () => {})
user_route.delete("/:id", () => {})

export default user_route
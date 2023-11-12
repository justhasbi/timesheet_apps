import express from "express";
import noderouter from "./routes/index.js";

const app = express();

app.use(express.json());

// We provide a root route just as an example
app.get('/', (req, res) => {
	res.send(`<h2>Hello, Sequelize + Express!</h2>`);
});

app.use("/api/v1", noderouter)

export default app;
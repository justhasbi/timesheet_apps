import express from "express";

import {createEmployee, getAllEmployee, getEmployeeById, updateEmployee, deleteEmployee} from "../../controllers/index.js";

const employee_route = express.Router();

employee_route.post("/", createEmployee);
employee_route.get("/", getAllEmployee);
employee_route.get("/:employee_id", getEmployeeById);
employee_route.patch("/:employee_id", updateEmployee);
employee_route.delete("/:employee_id", deleteEmployee);

export default employee_route;
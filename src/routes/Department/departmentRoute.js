import express from "express";

import {createDepartment, getAllDepartments, getDepartment, updateDepartment} from "../../controllers/index.js";


const department_route = express.Router();

department_route.post("/create", createDepartment);

department_route.get("/departments", getAllDepartments);

department_route.get("/:department_id", getDepartment);

department_route.patch("/:department_id/update", updateDepartment);





export default department_route;
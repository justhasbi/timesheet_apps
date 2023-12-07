import express from "express";

import {createDepartment, deleteDepartment, getAllDepartments, getDepartment, updateDepartment} from "../../controllers/index.js";


const department_route = express.Router();

department_route.post("/create", createDepartment);

department_route.get("/", getAllDepartments);

department_route.get("/:department_id", getDepartment);

department_route.patch("/:department_id", updateDepartment);

department_route.delete("/:department_id", deleteDepartment);





export default department_route;
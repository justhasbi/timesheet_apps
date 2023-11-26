import { model }  from "../../models/index.js";
import { request, response } from "express";

const Department = model.tb_m_department;

// create a new department
export const createDepartment = async (req = request, res = response) => {

    try {
        
        const {department_name} = await req.body;
        const departmentNameValidation = await Department.count({
            where: {department_name}
        });

        console.log(departmentNameValidation.department_name);

        if(departmentNameValidation > 0) {
            return res.status(403).json({
                success: false,
                message: "Department is exists, change other name"
            });
        }
        const created = await Department.create({
            department_name
        });

        return res.status(201).json({
            success: true,
            message: "Data created successfully",
            data: created
        });

    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });    
    }

}

// get all departments
export const getAllDepartments = async (req, res = response) => {
    try {
        
        const departments = await Department.findAll();

        if(departments.length == 0) {
            return res.status(404).json({
                success: false,
                message: "data not found"
            })
        }   

        return res.status(200).json({
            success: true,
            message: "data found",
            data: departments
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });    
    }

}

//get department by id
export const getDepartment = async (req = request, res = response) => {
    try {
        const {department_id} = await req.params;

        const department = await Department.findOne({
            where: {department_id}
        });
        console.log(department)
        if (department === null ) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: "department found",
            data: department
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });    
    }
}

//update department
export const updateDepartment = async (req = request, res = response) => {
    try {
        const {department_id} = await req.params;
        const {department_name} = await req.body;

        const departmentNameValidation = await Department.count({
            where: {department_name}
        });

        if(departmentNameValidation > 0){
            return res.status(501).json({
                success: false,
                message: "Department is exists, change other name"
            });
        }

        const updatedDepartment = await Department.update(
            {
                department_name
            },
            {
                where: {department_id}
            }
        );

        return res.status(200).json({
            success: true,
            message: "Department updated successfully",
            data: updatedDepartment
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });    
    }
}
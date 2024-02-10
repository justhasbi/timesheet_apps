import {request, response} from "express";
import { model } from "../../models/index.js";

const Employee = model.tb_m_employee;

export const createEmployee = async (req = request, res = response) => {
    try {
        const {
            name, 
            email, 
            address, 
            birth_date, 
            join_date, 
            manager_id, 
            department_id, 
            role_id
        } = await req.body;

        const employee = await Employee.create({
            name,
            email,
            address,
            birth_date,
            join_date,
            manager_id,
            department_id,
            role_id
        })

        return res.status(201).json({
            success: true,
            message: "data created successfully",
            data: employee
        })
        
    } catch(error) {
        return res.status(501).json({
            success: false,
            message: error.message
        }); 
    }
}

export const getAllEmployee = async (req, res) => {
    try {
        const employees = await Employee.findAll()

        if(employees.length == 0) {
            return res.status(404).json({
                success: false,
                message: "data not found"
            }) 
        }

        return res.status(200).json({
            success: true,
            message: "data found",
            data: employees
        })

    } catch(error) {
        return res.status(501).json({
            success: false,
            message: error.message
        }); 
    }
}

export const getEmployeeById = async (req = request, res = response) => {
    try {
        const {employee_id} = await req.params;

        const employee = await Employee.findOne({
            where: {employee_id}
        });
        
        if (employee === null ) {
            return res.status(404).json({
                success: false,
                message: 'employee not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: "department found",
            data: employee
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });    
    }
}

export const updateEmployee = async (req = request, res = response) => {
    try {
        const {employee_id} = await req.params;
        const {name, email, address, birth_date, join_date, department_id, role_id} = await req.body;

        const employeeCount = await Employee.count({
            where: {employee_id}
        });

        if(employeeCount === 1 || employeeCount > 1){
            return res.status(501).json({
                success: false,
                message: "Failed update employee data"
            });
        }

        const updatedEmployee = await Employee.update(
            {
                name, email, address, birth_date, join_date, department_id, role_id
            },
            {
                where: {employee_id}
            }
        );

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: updatedEmployee
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });    
    }
}

export const deleteEmployee = async (req = request, res = response) => {
    try {
        const {employee_id} = await req.params;

        const deletedEmployee = await Employee.destroy({
            where: {employee_id}
        });   

        if(deletedEmployee === 0){
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Employee has deleted'
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });    
    }
}
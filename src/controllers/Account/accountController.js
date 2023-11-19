import { model }  from "../../models/index.js";
import { response } from "express";

const Account = model.tb_m_account;
const Employee = model.tb_m_employee;

export const getAccounts = async (req, res = response) => {
    try {
        // get all accounts
        const accounts = await Account.findAll({
            attributes: ['account_id', 'username', 'employee_id'],
            include: {
                model: Employee, as: 'employee',
                attributes: ['name', 'email', 'address', 'manager_id']
            }
        });

        if(accounts.length === 0 || accounts.length === null){
            return res.status(404).json({
                success: false,
                message: "Accounts not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Accounts found",
            data: accounts
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
}
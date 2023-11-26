import { model } from "../../models/index.js";
import {request, response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Account = model.tb_m_account;
const Employee = model.tb_m_employee;

export const createAccount = async (req = request, res = response) => {
    try {
        //create account
        const {
            username,
            password,
            employee_id
        } = await req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const employee = await Employee.findByPk(employee_id);
        
        const createdAccount = await Account.create({
            username,
            password: passwordHash,
            hash: passwordHash,
            salt: salt,
            created_at: Date.now(),
            updated_at: Date.now(),
            employee_id: employee.employee_id
        });

        return res.status(200).json({
            success: true,
            message: "Data berhasil dibuat",
            data: createdAccount
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
}

export const loginAccount = async (req = request, res = response) => {
    try {
        const {username, password} = await req.body;

        const accountUser = await Account.findOne({
        where : {
            username: username,
        }
        })
        console.log(accountUser);
        if (!accountUser) {
            return res.status(404).json({
                status: false,
                message: "account belum terdaftar"
            });
        }

        const isMatch = await bcrypt.compare(password, accountUser.password);
        if(!isMatch) {
            return res.status(404).json({
                status: false,
                message: "password salah"
            });
        }

        const employeeName = await Employee.findOne({
            where: {
                employee_id: accountUser.employee_id
            }
        });

        console.log(employeeName);

        const {JWT_SECRET} = process.env;
        const token = jwt.sign({
            username: accountUser.username, 
            employee: employeeName.name,
            email: employeeName.email
        }, JWT_SECRET);

        return res.status(200).json({
            status: true,
            message: "berhasil login",
            token: token
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
    
}

// change password account
export const changePasswordAccount = async (req = request, res = response) => {
    try {
        const {account_id} = await req.params;
        const {
            password
        } = await req.body;

        const salt = await bcrypt.genSalt();
        const newPassword = await bcrypt.hash(password, salt);

        const changePassword = await Account.update(
            {
                password: newPassword,
                created_at: Date.now(),
                updated_at: Date.now()
            },
            {
                where: {
                    account_id: account_id,
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Password changed",
            data: changePassword
        });

    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
} 

//logout 
// export const logout = async (req, res = response) => {
//     try {
//         req.session.destroy(() => {
//             res.redirect("/login");
//         });

//         return res.status(200).json({
//             success: true,
//             message: 'Logged out'
//         });
//     } catch (error) {
//         return res.status(501).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

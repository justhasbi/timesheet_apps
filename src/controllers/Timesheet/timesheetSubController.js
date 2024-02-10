import { model } from '../../models/index.js';
import {request, response} from 'express';

const TimesheetSubs = model.tb_m_timesheetsubmission;
const Timesheet = model.tb_m_timesheet;
const Manager = model.tb_m_employee;

// export const createSubmission = async (req = request, res = response) => {
//     try {
        
//     } catch (error) {
        
//     }
// };

// Create Approve  
export const approveTimesheet = async (req = request, res = response) => {


    try {

        const {
            information,
            timesheet_id,
            manager_id
        } = await req.body;

        console.log(timesheet_id);
        const timesheetIdValidation = await TimesheetSubs.count({
            where: { timesheet_id }
        });
        
        if (timesheetIdValidation > 0) {
            return res.status(409).json({
                success: false,
                message: "Timesheet has already been registered"
            });
        }

        const timesheet = await Timesheet.findByPk(timesheet_id);
        const manager = await Manager.findOne({
            where: {manager_id: manager_id}
        })

        console.log("Manager", manager)

        const created = await TimesheetSubs.create({
            submission_status: 'Approve',
            information,
            timesheet_id: timesheet.timesheet_id,
            manager_id: manager.manager_id
        });

        await Timesheet.update(
            {
                status: "Approved",
            },
            {
                where: {timesheet_id}
            }
        )

        //console.log(update)

        return res.status(201).json({
            success: true,
            message: "Timesheet has been successfully Approved",
            data: created
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });    
    }

}
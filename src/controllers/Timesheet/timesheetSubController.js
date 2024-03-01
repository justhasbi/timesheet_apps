import { model } from '../../models/index.js';
import {request, response} from 'express';

const TimesheetSubs = model.tb_m_timesheetsubmission;
const Timesheet = model.tb_m_timesheet;
const Manager = model.tb_m_employee;

// Create submission baru
export const createSubmission = async (req = request, res = response) => {
    try {
        const {
            information,
            timesheet_id,
            manager_id
        } = await req.body;
        console.log({
            information,
            timesheet_id,
            manager_id
        });
        const timesheetIdValidation = await TimesheetSubs.count({
            where: {timesheet_id}
        });
        console.log(timesheetIdValidation);

        if(timesheetIdValidation > 0){  
            return res.status(409).json({
                success: false,
                message: "Timesheet has already been registered"
            });
        }

        const timesheet = await Timesheet.findByPk(timesheet_id);
        const manager = await Manager.findOne({
            where: {manager_id: manager_id}
        });

        console.log("Timesheet", timesheet);
        console.log("Manager", manager);

        const created = await TimesheetSubs.create({
            submission_status: '',
            information,
            timesheet_id: timesheet.timesheet_id,
            manager_id: manager.manager_id
        });

        return res.status(201).json({
            success: true,
            message: "Timesheet Submissions created successfully",
            data: created
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
}



// Update Approve timesheet 
export const approveTimesheet = async (req = request, res = response) => {
    try {
        // manager_id = employee_id ini dikarenakan agar kondisinya jika role bukan sama dengan manager maka tidak bisa approve
        const {timesheet_submission_id,timesheet_id,manager_id} = req.params;
        const { 
            information
        } = req.body;
        
        const timesheetSubsValidation = await TimesheetSubs.findByPk(timesheet_submission_id);
        const timesheetIdValidation = await Timesheet.findByPk(timesheet_id);
        const managerIdValidation = await Manager.findByPk(manager_id);

        //console.log({managerIdValidation, timesheetIdValidation})
        //console.log(managerIdValidation.role_id);

        if(managerIdValidation.role_id === 2){

            if(!timesheetSubsValidation){
                return res.status(501).json({
                    success: false,
                    message: "Timesheet Submission not found"
                });
            }
            if(!timesheetIdValidation) {
                return res.status(501).json({
                    success: false,
                    message: "Timesheet not found"
                });
            }
            // if(managerIdValidation == null || managerIdValidation === 0){
            //     return res.status(501).json({
            //         success: false,
            //         message: "Manager not found"
            //     });
            // }
            // Logic detail ketika timesheet sudah di approve maka tidak bisa di approve ulang
            console.log('Ini status ' + timesheetIdValidation.status);
            if(timesheetIdValidation.status === 'Approved'){
                return res.status().json({
                    success: false,
                    message: "Timesheet has been approved"
                });
            }
    
    
            const approvedTimesheet = await TimesheetSubs.update(
                {
                    information,
                    submission_status: "Approve"
                },
                {
                    
                    where: {timesheet_submission_id, timesheet_id, manager_id}
                }
            );
    
            await Timesheet.update(
                {
                    status: "Approved"
                },
                {
                    where: {timesheet_id}
                }
            );
    
            return res.status(200).json({
                success: true,
                message: "Updated Timesheet",
                data: approvedTimesheet
            });
        }else {
            return res.status(501).json({
                success: false,
                message: "You are not allowed to approve a Timesheet"
            });
        }
        


    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
}








// Delete submission data
export const deleteSubmission = async (req = request, res = response) => {

    try {
        const {timesheet_submission_id} = req.params

        if(timesheet_submission_id === 0 || timesheet_submission_id === null){
            return res.status(404).json({
                success: false,
                message: 'Timesheet submission not found'
            });
        }

        const deletedSubmission = await TimesheetSubs.destroy({
            where: {timesheet_submission_id}
        });

        return res.status(200).json({
            success: true,
            message: 'Timesheet submission deleted successfully',
            data: deletedSubmission
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }

}
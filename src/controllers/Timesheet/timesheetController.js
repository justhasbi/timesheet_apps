import { model } from "../../models";
import { TIMESHEET_STATUS_LIST } from "../../utils/constant";

const Timesheet = model.tb_m_timesheet;

export const CreateTimesheet = async (req, res) => {
  try {
    const { period } = await req.body;

    const addTimesheet = await Timesheet.create({
      status: "",
      period,
    });

    return res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: addTimesheet,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateTimesheet = async (req, res) => {
  try {
    const { timesheet_id, status } = await req.body;

    if (TIMESHEET_STATUS_LIST.includes(status)) {
      const isTimesheetExist = await Timesheet.count({
        where: { timesheet_id },
      });

      if (isTimesheetExist > 0) {
        const update = await Timesheet.update(
          {
            status,
          },
          {
            where: { timesheet_id },
          }
        );

        return res.status(200).json({
          success: true,
          message: "Updated successfully",
          data: update,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeleteTimesheet = async (req, res) => {
  try {
    const { timesheet_id } = await req.params;

    const deletedTimesheet = await Timesheet.destroy({
      where: { timesheet_id },
    });

    if (deletedTimesheet === 0) {
      return res.status(404).json({
        success: false,
        message: "Timesheet not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Timesheet has deleted",
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetTimesheets = async (req, res) => {
  try {
    const timesheets = await Timesheet.findAll();

    if (timesheets.length == 0) {
      return res.status(404).json({
        success: false,
        message: "data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "data found",
      data: timesheets,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetTimesheetById = async (req, res) => {
  try {
    const { timesheet_id } = await req.params;

    const role = await Timesheet.findOne({
      where: { timesheet_id },
    });

    if (role === null) {
      return res.status(404).json({
        success: false,
        message: "Timesheet not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Success",
      data: role,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

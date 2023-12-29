import { request, response } from "express";
import { model } from "../../models/index.js";

const Roles = model.tb_m_roles;

//create a new Role
export const createRole = async (req = request, res = response) => {
  try {
    const { role_name } = await req.body;
    const roleNameValidation = await Roles.count({
      where: { role_name },
    });

    if (roleNameValidation > 0) {
      return res.status(403).json({
        success: false,
        message: "Role is exists, change other name",
      });
    }

    const created = await Roles.create({
      role_name,
    });

    return res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: created,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllRoles = async (req, res = response) => {
  try {
    const roles = await Roles.findAll();

    if (roles.length == 0) {
      return res.status(404).json({
        success: false,
        message: "data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "data found",
      data: roles,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRole = async (req = request, res = response) => {
  try {
    const { role_id } = await req.params;

    const role = await Roles.findOne({
      where: { role_id },
    });

    if (role === null) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role is Found",
      data: role,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

//update role
export const updateRole = async (req = request, res = response) => {
  try {
    const { role_id } = await req.params;
    const { role_name } = await req.body;

    const roleNameValidation = await Roles.count({
      where: { role_name },
    });
    if (roleNameValidation > 0) {
      return res.status(403).json({
        success: false,
        message: "Role is exists, change other name",
      });
    }

    const update = await Roles.update(
      {
        role_name,
      },
      {
        where: { role_id },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Roles updated successfully",
      data: update,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

//delete role
export const deleteRole = async (req = request, res = response) => {
  try {
    const { role_id } = await req.params;

    const deletedRole = await Roles.destroy({
      where: { role_id },
    });

    if (deletedRole === 0) {
      return res.status(404).json({
        success: false,
        message: "Roles not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Roles has deleted",
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

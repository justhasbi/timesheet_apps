import { DataTypes } from "sequelize";
import _tb_m_account from "./tb_m_account.js";
import _tb_m_dailytimesheet from "./tb_m_dailytimesheet.js";
import _tb_m_department from "./tb_m_department.js";
import _tb_m_employee from "./tb_m_employee.js";
import _tb_m_roles from "./tb_m_roles.js";
import _tb_m_timesheet from "./tb_m_timesheet.js";
import _tb_m_timesheetsubmission from "./tb_m_timesheetsubmission.js";

function initModels(sequelize) {
  var tb_m_account = _tb_m_account(sequelize, DataTypes);
  var tb_m_dailytimesheet = _tb_m_dailytimesheet(sequelize, DataTypes);
  var tb_m_department = _tb_m_department(sequelize, DataTypes);
  var tb_m_employee = _tb_m_employee(sequelize, DataTypes);
  var tb_m_roles = _tb_m_roles(sequelize, DataTypes);
  var tb_m_timesheet = _tb_m_timesheet(sequelize, DataTypes);
  var tb_m_timesheetsubmission = _tb_m_timesheetsubmission(sequelize, DataTypes);

  tb_m_employee.belongsTo(tb_m_department, { as: "department", foreignKey: "department_id"});
  tb_m_department.hasMany(tb_m_employee, { as: "tb_m_employees", foreignKey: "department_id"});
  tb_m_account.belongsTo(tb_m_employee, { as: "employee", foreignKey: "employee_id"});
  tb_m_employee.hasMany(tb_m_account, { as: "tb_m_accounts", foreignKey: "employee_id"});
  tb_m_employee.belongsTo(tb_m_employee, { as: "manager", foreignKey: "manager_id"});
  tb_m_employee.hasMany(tb_m_employee, { as: "tb_m_employees", foreignKey: "manager_id"});
  tb_m_timesheet.belongsTo(tb_m_employee, { as: "employee", foreignKey: "employee_id"});
  tb_m_employee.hasMany(tb_m_timesheet, { as: "tb_m_timesheets", foreignKey: "employee_id"});
  tb_m_timesheetsubmission.belongsTo(tb_m_employee, { as: "manager", foreignKey: "manager_id"});
  tb_m_employee.hasMany(tb_m_timesheetsubmission, { as: "tb_m_timesheetsubmissions", foreignKey: "manager_id"});
  tb_m_employee.belongsTo(tb_m_roles, { as: "role", foreignKey: "role_id"});
  tb_m_roles.hasMany(tb_m_employee, { as: "tb_m_employees", foreignKey: "role_id"});
  tb_m_dailytimesheet.belongsTo(tb_m_timesheet, { as: "timesheet", foreignKey: "timesheet_id"});
  tb_m_timesheet.hasMany(tb_m_dailytimesheet, { as: "tb_m_dailytimesheets", foreignKey: "timesheet_id"});
  tb_m_timesheetsubmission.belongsTo(tb_m_timesheet, { as: "timesheet", foreignKey: "timesheet_id"});
  tb_m_timesheet.hasMany(tb_m_timesheetsubmission, { as: "tb_m_timesheetsubmissions", foreignKey: "timesheet_id"});

  return {
    tb_m_account,
    tb_m_dailytimesheet,
    tb_m_department,
    tb_m_employee,
    tb_m_roles,
    tb_m_timesheet,
    tb_m_timesheetsubmission,
  };
}
export {initModels as default, initModels}

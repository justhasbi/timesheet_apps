// http handler disini
export {createAccount, loginAccount, changePasswordAccount} from "./Auth/authController.js";
export {getAccounts, getAccountById} from "./Account/accountController.js";
export {createDepartment, getAllDepartments, getDepartment, updateDepartment, deleteDepartment} from "./Department/departmentController.js";
export {createRole, getAllRoles, getRole, deleteRole, updateRole} from "./Role/roleController.js";
export {createEmployee, getAllEmployee, getEmployeeById, updateEmployee, deleteEmployee} from "./Employee/employeeController.js";


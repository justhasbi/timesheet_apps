import express from 'express';

import {getRole, createRole, getAllRoles, deleteRole, updateRole} from '../../controllers/index.js';

const role_route = express.Router();

role_route.post("/create", createRole);
role_route.get("/", getAllRoles);
role_route.get("/:role_id", getRole);
role_route.patch("/:role_id", updateRole);
role_route.delete("/:role_id", deleteRole);

export default role_route;
import express from "express";
import account_route from "./accountRoute.js";
import user_route from "./userRoute.js";
import department_route from "./Department/departmentRoute.js";

const noderouter = express.Router();

const defaultRoutes = [
    {
        path: '/account',
        route: account_route
    },
    {
        path: '/user',
        route: user_route
    },
    {
        path: '/department',
        route: department_route
    }
];

defaultRoutes.forEach((route) => {
    noderouter.use(route.path, route.route);
});

export default noderouter;
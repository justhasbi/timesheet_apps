import express from "express";
import account_route from "./accountRoute.js";
import user_route from "./userRoute.js";

const noderouter = express.Router();

const defaultRoutes = [
    {
        path: '/account',
        route: account_route
    },
    {
        path: '/user',
        route: user_route
    }
];

defaultRoutes.forEach((route) => {
    noderouter.use(route.path, route.route);
});

export default noderouter;
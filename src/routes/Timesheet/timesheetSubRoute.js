import express from 'express';

import {approveTimesheet} from '../../controllers/index.js';

const submission_route = express.Router();

submission_route.post('/create', approveTimesheet);

export default submission_route;
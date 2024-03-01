import express from 'express';
import {verifyToken} from '../../middleware/auth.js';
import {createSubmission, approveTimesheet} from '../../controllers/index.js';

const submission_route = express.Router();

submission_route.post('/create', createSubmission);

submission_route.patch('/:timesheet_submission_id/:timesheet_id/:manager_id', verifyToken ,approveTimesheet);

export default submission_route;
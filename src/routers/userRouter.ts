import express from 'express';
import { register, login, verifyOTP } from '../controller/userController';
import catchAsync from '../utils/catchAsync';
const router = express.Router();

router.post('/register', catchAsync(register));
router.post('/login', catchAsync(login));
router.post('/verify-otp', catchAsync(verifyOTP));

export default router;
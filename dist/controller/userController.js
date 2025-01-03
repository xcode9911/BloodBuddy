"use strict";
// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const prisma = new client_1.PrismaClient();
// Create a Nodemailer transporter using environment variables for SMTP credentials
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com", // Ensure correct SMTP host for Gmail or your provider
    port: 587,
    secure: false, // false for TLS, true for SSL
    auth: {
        user: process.env.SMTP_USER, // Use environment variable
        pass: process.env.SMTP_PASS, // Use environment variable
    },
    logger: true, // Enable debugging logs
    debug: true, // Enable debug output in the console
});
// Function to generate OTP (6 digits)
const generateOTP = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};
// Function to send OTP email
const sendOTPEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            from: `"BloodBuddy" <${process.env.SMTP_USER}>`, // sender address
            to: email, // recipient's email
            subject: "Your OTP for BloodBuddy", // subject line
            text: `Your OTP for account verification is: ${otp}`, // plain text body
            html: `<p>Your OTP for account verification is: <strong>${otp}</strong></p>`, // HTML body
        });
        console.log("Message sent: %s", info.messageId);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
// Validate password strength
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 letter and 1 number
    return passwordRegex.test(password);
};
// Register a new user (Donor or Gainer)
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, contactNo, userType, bloodType, location, } = req.body;
    console.log(req.body);
    try {
        // Validate userType
        if (!['Donor', 'Gainer'].includes(userType)) {
            return res.status(400).json({ message: 'Invalid user type. Must be Donor or Gainer.' });
        }
        // Validate password strength
        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least 1 letter and 1 number.' });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        let user;
        let otp;
        if (userType === 'Donor') {
            // Create a Donor
            user = yield prisma.donor.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    contactNo,
                    bloodType,
                    location,
                },
            });
            // Generate OTP
            otp = generateOTP();
            console.log(otp, "OTP");
            // Optionally, store OTP in the database (use a cache like Redis for better performance)
            yield prisma.donor.update({
                where: { email: user.email },
                data: { otpCode: otp }, // Use otpCode instead of otp
            });
            // Send OTP to Donor's email
            console.log("send mainl");
            yield sendOTPEmail(email, otp);
            return res.status(201).json({ message: 'Donor registered successfully. OTP sent to email.', user });
        }
        if (userType === 'Gainer') {
            // Create a Gainer
            user = yield prisma.gainer.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    contactNo,
                    location,
                },
            });
            // Generate OTP
            otp = generateOTP();
            // Optionally, store OTP in the database (use a cache like Redis for better performance)
            yield prisma.gainer.update({
                where: { email: user.email },
                data: { otpCode: otp }, // Use otpCode instead of otp
            });
            // Send OTP to Gainer's email
            yield sendOTPEmail(email, otp);
            return res.status(201).json({ message: 'Gainer registered successfully. OTP sent to email.', user });
        }
    }
    catch (err) {
        console.error('Error registering user:', err);
        // Check for specific errors like unique constraint violations
        if ((err === null || err === void 0 ? void 0 : err.code) === 'P2002') {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // Generic error response
        return res.status(500).json({
            message: 'Error registering user',
            error: err.message,
        });
    }
    // Ensure all paths return a response
    return res.status(400).json({ message: 'User registration failed' });
});
exports.register = register;
// Login existing user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userType } = req.body;
    try {
        let user;
        if (userType === 'Donor') {
            user = yield prisma.donor.findUnique({ where: { email } });
        }
        else if (userType === 'Gainer') {
            user = yield prisma.gainer.findUnique({ where: { email } });
        }
        else {
            return res.status(400).json({ message: 'Invalid user type' });
        }
        // Add null check for user and user.password
        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Ensure password is a string before comparing
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password || '' // Provide a fallback empty string if somehow still null
        );
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, userType }, process.env.JWT_SECRET || 'bloodbank123', // Ensure this is set in environment
        { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token, user });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});
exports.login = login;
//# sourceMappingURL=userController.js.map
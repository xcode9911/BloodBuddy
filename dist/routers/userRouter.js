"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routers/userRouter.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const router = express_1.default.Router();
router.post('/register', (0, catchAsync_1.default)(userController_1.register));
router.post('/login', (0, catchAsync_1.default)(userController_1.login));
exports.default = router;
//# sourceMappingURL=userRouter.js.map
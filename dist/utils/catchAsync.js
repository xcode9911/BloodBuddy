"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// CatchAsync utility to wrap async route handlers
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next); // Pass errors to Express error handling middleware
    };
};
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map
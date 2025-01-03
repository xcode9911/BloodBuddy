// utils/catchAsync.ts
import { Request, Response, NextFunction } from 'express';

// Define a type for async route handlers
type AsyncRouteHandler = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => Promise<Response | void>;

// CatchAsync utility to wrap async route handlers
const catchAsync = (fn: AsyncRouteHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
      .catch(next); // Pass errors to Express error handling middleware
  };
};

export default catchAsync;
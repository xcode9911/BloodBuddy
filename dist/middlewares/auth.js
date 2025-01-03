"use strict";
// // middlewares/auth.ts
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };
// export default authenticate;
//# sourceMappingURL=auth.js.map
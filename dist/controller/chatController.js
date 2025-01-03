"use strict";
// import { Request, Response } from 'express';
// import prisma from '../models/index.js';
// import { Donor, NormalUser } from '@prisma/client'; 
// // Create a chat message
// export const sendMessage = async (req: Request, res: Response) => {
//   const { receiverId, message } = req.body;
//   try {
//     const chat = await prisma.chat.create({
//       data: {
//         senderId: req.user.userId,
//         receiverId,
//         message,
//       },
//     });
//     res.status(201).json(chat);
//   } catch (err) {
//     const error = err as Error;
//     res.status(400).json({ message: 'Error sending message', error: error.message });
//   }
// };
// // Get chat messages between two users
// export const getMessages = async (req: Request, res: Response) => {
//   const { receiverId } = req.params;
//   try {
//     const chats = await prisma.chat.findMany({
//       where: {
//         OR: [
//           { senderId: req.NormalUser.userId, receiverId: Number(receiverId) },
//           { senderId: Number(receiverId), receiverId: req.user.userId },
//         ],
//       },
//       orderBy: { timestamp: 'asc' },
//     });
//     res.json(chats);
//   } catch (err) {
//     const error = err as Error;
//     res.status(400).json({ message: 'Error fetching messages', error: error.message });
//   }
// };
//# sourceMappingURL=chatController.js.map
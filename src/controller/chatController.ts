import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { donorId, gainerId, message } = req.body;

    if (!donorId || !gainerId || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const chat = await prisma.chat.create({
      data: { donorId, gainerId, message },
    });

    res.status(201).json({ message: 'Message sent successfully', chat });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { receiverId } = req.params;

    if (!receiverId) {
      res.status(400).json({ error: 'Receiver ID is required' });
      return;
    }

    const chats = await prisma.chat.findMany({
      where: { gainerId: parseInt(receiverId) },
      include: {
        donor: { select: { name: true, email: true } },
        gainer: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.status(200).json({ messages: chats });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

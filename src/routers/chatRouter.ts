import { Router } from 'express';
import { sendMessage, getMessages } from '../controller/chatController';

const router = Router();

router.post('/send', sendMessage);
router.get('/:receiverId', getMessages);

export default router;

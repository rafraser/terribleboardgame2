import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { Room } from '../types/room';

const router = Router();

router.get('/', (req, res) => {
  const roomData = Room.publicRooms().map((room) => (
    { roomCode: room.roomCode, playerCount: room.playerCount, status: room.state.status }
  ));
  res.json(roomData);
});

router.get('/:roomId', (req, res) => {
  const room = Room.findRoom(req.params.roomId);
  if (!room) {
    res.json({ exists: false });
  } else {
    res.json({ exists: true, playerCount: room.playerCount(), status: room.state.status });
  }
});

// Rate limit for room creation - 5 per 15 minutes
const createRoomLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many rooms created!',
});

router.post('/', createRoomLimiter, (req, res) => {
  const room = Room.create();
  res.json({ roomCode: room.roomCode });
});

export default router;

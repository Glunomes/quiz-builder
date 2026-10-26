import quizController from "../controllers/quizController";
import express from 'express';

const router = express.Router();

router.get('/', quizController.getQuizzes);

export default router;
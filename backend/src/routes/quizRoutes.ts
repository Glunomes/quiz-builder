import quizController from "../controllers/quizController";
import express from "express";

const router = express.Router();

router.get("/", quizController.getQuizzes);

router.post("/", quizController.addQuizzes);

router.get("/:id", quizController.getQuiz);

router.delete("/:id", quizController.deleteQuiz);

export default router;

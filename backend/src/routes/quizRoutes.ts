import quizController from "../controllers/quizController";
import express from "express";

const router = express.Router();

router.get("/", quizController.getQuizzes);

router.post("/", quizController.addQuizzes);

router.get("/:id", quizController.getQuizz);

router.delete("/:id", quizController.deleteQuizz);

export default router;

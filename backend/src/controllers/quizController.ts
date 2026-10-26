import { Request, Response } from "express";
import quizService from "../services/quizService";

const getQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch quizzes" });
  }
}

export default {
  getQuizzes,
}
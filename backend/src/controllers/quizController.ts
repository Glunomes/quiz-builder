import type { Request, Response } from "express";
import quizService from "../services/quizService";
import { createQuizSchema } from "../schemas/quizSchema";
import { Prisma } from "../../generated/prisma/client";

const getQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch quizzes" });
  }
};

const addQuizzes = async (req: Request, res: Response) => {
  try {
    const result = createQuizSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const quiz = await quizService.createQuizzes(result.data);

    return res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getQuiz = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const quizz = await quizService.getQuizById(req.params.id);
    if (!quizz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    return res.json(quizz);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch quizz" });
  }
};

const deleteQuiz = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await quizService.deleteQuizById(req.params.id);
    return res.status(204).send();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    console.error(error);
    return res.status(500).json({ message: "Failed to delete quiz" });
  }
};

export default {
  getQuizzes,
  addQuizzes,
  getQuiz,
  deleteQuiz,
};

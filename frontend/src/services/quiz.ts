import axios from "axios";
import type { QuizListItem, QuizDetail, CreateQuizDto } from "../types/quiz";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/quizzes",
  headers: {
    "Content-Type": "application/json",
  },
});

const getAll = async (): Promise<QuizListItem[]> => {
  const res = await api.get<QuizListItem[]>("/");
  return res.data;
};

const getById = async (id: string): Promise<QuizDetail> => {
  const res = await api.get<QuizDetail>(`/${id}`);
  return res.data;
};

const createQuiz = async (data: CreateQuizDto): Promise<QuizDetail> => {
  const res = await api.post<QuizDetail>("/", data);
  return res.data;
};

const deleteQuiz = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};

export default {
  getAll,
  getById,
  createQuiz,
  deleteQuiz
}
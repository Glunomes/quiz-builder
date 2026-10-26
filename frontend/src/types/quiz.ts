import type { QuestionFormData, CreateQuizFormData } from "../schemas/quizFormSchema";

export type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  order: number;
  quizId?: string;
  booleanAnswer?: boolean | null;
  textAnswer?: string | null;
  options: Option[];
}

export interface QuizListItem {
  id: string;
  title: string;
  createdAt: string;
  _count: {
    questions: number;
  };
}

export interface QuizDetail {
  id: string;
  title: string;
  createdAt: string;
  questions: Question[];
}

export type CreateQuizDto = CreateQuizFormData;
export type { QuestionFormData };
import prisma from "../lib/prisma";
import type { CreateQuizInput } from "../schemas/quizSchema";

type QuestionInput = CreateQuizInput["questions"][number];

const mapQuestion = (q: QuestionInput) => {
  const base = { type: q.type, text: q.text, order: q.order };

  switch (q.type) {
    case "BOOLEAN":
      return { ...base, booleanAnswer: q.booleanAnswer };
    case "INPUT":
      return { ...base, textAnswer: q.textAnswer };
    case "CHECKBOX":
      return {
        ...base,
        options: {
          create: q.options.map((o) => ({
            text: o.text,
            isCorrect: o.isCorrect,
          })),
        },
      };
  }
};

const getAllQuizzes = async () => {
  return prisma.quiz.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      _count: {
        select: { questions: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const createQuizzes = async (data: CreateQuizInput) => {
  return prisma.quiz.create({
    data: {
      title: data.title,
      questions: {
        create: data.questions.map(mapQuestion),
      },
    },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { options: true },
      },
    },
  });
};

export default {
  getAllQuizzes,
  createQuizzes,
};
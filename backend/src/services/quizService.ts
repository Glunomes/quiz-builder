import prisma from "../lib/prisma";

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
}

export default {
  getAllQuizzes,
}
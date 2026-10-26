import { z } from "zod";

const baseQuestion = z.object({
  text: z.string().trim().min(1, "Question text is required"),
  order: z.number().int().nonnegative(),
});

const booleanQuestion = baseQuestion.extend({
  type: z.literal("BOOLEAN"),
  booleanAnswer: z.boolean(),
});

const inputQuestion = baseQuestion.extend({
  type: z.literal("INPUT"),
  textAnswer: z.string().trim().min(1, "Answer is required"),
});

const checkboxQuestion = baseQuestion.extend({
  type: z.literal("CHECKBOX"),
  options: z
    .array(
      z.object({
        text: z.string().trim().min(1, "Option text is required"),
        isCorrect: z.boolean(),
      }),
    )
    .min(2, "At least 2 options are required")
    .refine((options) => options.some((o) => o.isCorrect), {
      message: "At least 1 correct option is required",
    })
    .refine(
      (options) =>
        new Set(options.map((o) => o.text.toLowerCase())).size ===
        options.length,
      { message: "Option texts must be unique" },
    ),
});

const questionSchema = z.discriminatedUnion("type", [
  booleanQuestion,
  inputQuestion,
  checkboxQuestion,
]);

export const createQuizSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  questions: z.array(questionSchema).min(1, "At least 1 question is required"),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
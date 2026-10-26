import { z } from "zod";

export const questionTypeSchema = z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]);

const baseQuestionSchema = z.object({
  text: z.string().trim().min(1, "Question text is required"),
  order: z.number().int().nonnegative(),
});

export const booleanQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("BOOLEAN"),
  booleanAnswer: z.boolean(),
});

export const inputQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("INPUT"),
  textAnswer: z.string().trim().min(1, "Answer is required"),
});

export const checkboxOptionSchema = z.object({
  text: z.string().trim().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

export const checkboxQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("CHECKBOX"),
  options: z
    .array(checkboxOptionSchema)
    .min(2, "At least 2 options are required")
    .refine((options) => options.some((opt) => opt.isCorrect), {
      message: "At least 1 correct option is required",
    })
    .refine(
      (options) =>
        new Set(options.map((opt) => opt.text.trim().toLowerCase())).size ===
        options.length,
      { message: "Option texts must be unique" },
    ),
});

export const questionSchema = z.discriminatedUnion("type", [
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema,
]);

export const createQuizSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  questions: z.array(questionSchema).min(1, "At least 1 question is required"),
});

export type CreateQuizFormData = z.infer<typeof createQuizSchema>;
export type QuestionFormData = z.infer<typeof questionSchema>;
export type OptionFormData = z.infer<typeof checkboxOptionSchema>;


export const DEFAULT_BOOLEAN_QUESTION: Extract<QuestionFormData, { type: "BOOLEAN" }> = {
  type: "BOOLEAN",
  text: "",
  order: 0,
  booleanAnswer: false,
};

export const DEFAULT_INPUT_QUESTION: Extract<QuestionFormData, { type: "INPUT" }> = {
  type: "INPUT",
  text: "",
  order: 0,
  textAnswer: "",
};

export const DEFAULT_CHECKBOX_QUESTION: Extract<QuestionFormData, { type: "CHECKBOX" }> = {
  type: "CHECKBOX",
  text: "",
  order: 0,
  options: [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],
};
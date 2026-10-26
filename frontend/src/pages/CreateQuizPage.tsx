import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { customZodResolver } from "../utils/zodResolver";
import { Plus } from "lucide-react";
import { createQuizSchema, DEFAULT_BOOLEAN_QUESTION } from "../schemas/quizFormSchema";
import type { CreateQuizFormData } from "../schemas/quizFormSchema";
import quizApi from "../services/quiz";
import { QuestionItem } from "../components/QuestionItem";
import styles from "./CreateQuizPage.module.css";

export const CreateQuizPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm<CreateQuizFormData>({
    resolver: customZodResolver(createQuizSchema),
    defaultValues: {
      title: "",
      questions: [{ ...DEFAULT_BOOLEAN_QUESTION, order: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "questions",
  });

  const onSubmit = async (data: CreateQuizFormData) => {
    try {
      setIsSubmitting(true);
      setServerError(null);

      const payload: CreateQuizFormData = {
        title: data.title,
        questions: data.questions.map((q, idx) => ({ ...q, order: idx })),
      };

      await quizApi.createQuiz(payload);
      navigate("/quizzes");
    } catch (err) {
      console.error("Failed to create quiz:", err);
      setServerError("Failed to create quiz. Please verify inputs or server status.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Quiz</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Quiz Title</label>
            <input
              {...methods.register("title")}
              className={styles.input}
              placeholder="e.g. TypeScript Fundamentals"
            />
            {methods.formState.errors.title && (
              <span className={styles.error}>{methods.formState.errors.title.message}</span>
            )}
          </div>

          <div className={styles.sectionHeader}>
            <h2 style={{ fontSize: "1.2rem", margin: 0 }}>Questions</h2>
            <button
              type="button"
              onClick={() => append({ ...DEFAULT_BOOLEAN_QUESTION, order: fields.length })}
              className={styles.addBtn}
            >
              <Plus size={16} style={{ verticalAlign: "middle", marginRight: "4px" }} />
              Add Question
            </button>
          </div>

          {methods.formState.errors.questions?.message && (
            <span className={styles.error}>{methods.formState.errors.questions.message}</span>
          )}

          {/* Тепер QuestionItem приймає лише 2 прості параметри замість 6 */}
          {fields.map((field, index) => (
            <QuestionItem
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}

          {serverError && <p className={styles.error}>{serverError}</p>}

          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? "Creating..." : "Save Quiz"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
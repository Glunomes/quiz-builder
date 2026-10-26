import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, CheckCircle2, Circle } from "lucide-react";
import quizApi from "../services/quiz";
import type { QuizDetail } from "../types/quiz";
import styles from "./QuizDetailPage.module.css";

export const QuizDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await quizApi.getById(id);
        setQuiz(data);
      } catch (err) {
        console.error("Failed to load quiz:", err);
        setError("Failed to load quiz details. Please verify the URL or server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.statusMessage}>
        <Loader2 className="animate-spin" size={32} style={{ margin: "0 auto 1rem auto" }} />
        <p>Loading quiz details...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className={`${styles.statusMessage} ${styles.errorState}`}>
        <p>{error || "Quiz not found"}</p>
        <Link to="/quizzes" className={styles.backLink} style={{ marginTop: "1rem" }}>
          <ArrowLeft size={16} /> Back to Quizzes
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link to="/quizzes" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Quizzes
        </Link>
      </div>

      <div className={styles.headerCard}>
        <h1 className={styles.title}>{quiz.title}</h1>
        <div className={styles.metaRow}>
          <span>Questions: {quiz.questions?.length ?? 0}</span>
          <span>Created: {new Date(quiz.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className={styles.questionsList}>
        {quiz.questions?.map((question, index) => (
          <div key={question.id || index} className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionIndex}>Question #{index + 1}</span>
              <span className={styles.badge}>{question.type}</span>
            </div>

            <p className={styles.questionText}>{question.text}</p>

            <div className={styles.answerBlock}>
              <span className={styles.answerLabel}>Correct Answer(s)</span>

              {question.type === "BOOLEAN" && (
                <span className={styles.answerValue}>
                  {question.booleanAnswer ? "True" : "False"}
                </span>
              )}

              {question.type === "INPUT" && (
                <span className={styles.answerValue}>{question.textAnswer}</span>
              )}

              {question.type === "CHECKBOX" && (
                <div className={styles.optionsList}>
                  {question.options?.map((option) => (
                    <div
                      key={option.id}
                      className={`${styles.optionItem} ${option.isCorrect ? styles.correctOption : ""}`}
                    >
                      <span>{option.text}</span>
                      {option.isCorrect ? (
                        <CheckCircle2 size={18} color="#16a34a" />
                      ) : (
                        <Circle size={18} color="#cbd5e1" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
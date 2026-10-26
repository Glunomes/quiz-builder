import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Loader2 } from "lucide-react";
import quizApi from "../services/quiz";
import type { QuizListItem } from "../types/quiz";
import styles from "./QuizListPage.module.css";

export const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await quizApi.getAll();
        setQuizzes(data);
      } catch (err) {
        console.error("Failed to load quizzes:", err);
        setError("Failed to load quizzes. Please check the backend connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!isConfirmed) return;

    try {
      await quizApi.deleteQuiz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (err) {
      console.error("Failed to delete quiz:", err);
      alert("Failed to delete quiz.");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.statusMessage}>
        <Loader2 className="animate-spin" size={32} style={{ margin: "0 auto 1rem auto" }} />
        <p>Loading quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.statusMessage} ${styles.errorState}`}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Quizzes</h1>
      </div>

      {quizzes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No quizzes available yet.</p>
          <Link to="/create" className={styles.viewBtn} style={{ display: "inline-block", marginTop: "1rem" }}>
            Create Quiz
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className={styles.card}>
              <div>
                <h2 className={styles.quizTitle}>{quiz.title}</h2>
                <div className={styles.metaInfo}>
                  <p>Questions: {quiz._count?.questions ?? 0}</p>
                  <p>Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className={styles.cardActions}>
                <Link to={`/quizzes/${quiz.id}`} className={styles.viewBtn}>
                  View
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(quiz.id, quiz.title)}
                  className={styles.deleteBtn}
                  title="Delete quiz"
                  aria-label="Delete quiz"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
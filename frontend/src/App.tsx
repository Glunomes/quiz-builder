import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { QuizListPage } from "./pages/QuizListPage";
import { QuizDetailPage } from "./pages/QuizDetailPage";
import { CreateQuizPage } from "./pages/CreateQuizPage";

export default function App() {
  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/quizzes" replace />} />
          <Route path="/quizzes" element={<QuizListPage />} />
          <Route path="/quizzes/:id" element={<QuizDetailPage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "2rem" }}>404 — Сторінку не знайдено</h2>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

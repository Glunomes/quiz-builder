import { useParams } from "react-router-dom";

export const QuizDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Quiz Details</h1>
      <p>{id}</p>
    </div>
  );
};
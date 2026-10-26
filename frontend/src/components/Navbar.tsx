import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <header
      style={{ borderBottom: "1px solid #e2e8f0", padding: "1rem 2rem", marginBottom: "2rem" }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <NavLink
          to="/quizzes"
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            textDecoration: "none",
            color: "#0f172a",
          }}
        >
          QuizBuilder
        </NavLink>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <NavLink
            to="/quizzes"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#2563eb" : "#64748b",
              fontWeight: isActive ? "600" : "normal",
            })}
          >
            Quiz List
          </NavLink>
          <NavLink
            to="/create"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#2563eb" : "#64748b",
              fontWeight: isActive ? "600" : "normal",
            })}
          >
            Create new Quizz
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

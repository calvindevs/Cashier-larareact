import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      if (response.data.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/dashboard-kasir", { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login Gagal");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Password"
        />
        <br />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}

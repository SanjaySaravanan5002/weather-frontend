import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    if (email && password) {
      setLoading(true); 
      try {
      
        setTimeout(() => {
          
          localStorage.setItem("token", "your_token_here"); 
          setIsAuthenticated(true);
          navigate("/");
          setLoading(false); // Reset loading state
          setEmail(""); // Clear email input
          setPassword(""); // Clear password input
        }, 1000); // Simulated delay for API call
      } catch (err) {
        setLoading(false); // Reset loading state
        setError("Login failed. Please try again.");
      }
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>} {/* Show error message */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
};

export default Login;

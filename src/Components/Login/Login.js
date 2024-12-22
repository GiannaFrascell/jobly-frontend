import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"; // Import AuthContext
import JoblyApi from "../../api"; // Import your API utility class

const Login = () => {
  const { login } = useContext(AuthContext); // Access login function from context
  const navigate = useNavigate();// Use navigate hook to redirect user
  // State to store form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // Loading state

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Start loading

    try {
      const { username, password } = formData;

      // Call JoblyApi to login and get the token
      const token = await JoblyApi.login({ username, password });

      // Call login from context to set the token
      login(token);

      // Redirect to the homepage after successful login
      console.log("Login Successful, token:", token);
      navigate("/"); // Redirect to homepage or another protected route
    } catch (err) {
      // Handle error - invalid credentials, etc.
      setError("Invalid login credentials. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-center align-items-center bg-secondary p-4 rounded shadow-lg gap-1 h-auto w-100 w-md-50"
      >
        <h2 className="text-center mt-2 mb-6">LOGIN</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-75 mb-2 mt-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-75 mb-3"
          required
        />
        <button
          type="submit"
          className="btn btn-success w-50 mt-4"
          disabled={loading} 
        >
          {loading ? "Logging in..." : "Log in"} 
        </button>
        {error && <div className="text-danger mt-3">{error}</div>}
      </form>
      
    </div>
  );
};

export default Login;

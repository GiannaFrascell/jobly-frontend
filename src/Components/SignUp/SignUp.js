import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import JoblyApi from "../../api"; // Import the API class

const SignUp = () => {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
// State to store messages
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false); // Loading state
// Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // Clear any previous messages

    // Password validation
    if (formData.password.length < 5) {
      setMessage({
        type: "error",
        text: "Password must be at least 5 characters long.",
      });
      return;
    }

    setLoading(true); // Start loading

    // Call the API to register the user
    try {
      const { username, firstName, lastName, email, password } = formData;
      const userData = { username, firstName, lastName, email, password };

      
      const res = await JoblyApi.request("auth/register", userData, "post");

      // Handle success
      setMessage({ type: "success", text: "Profile created successfully!" });
      navigate("/login");// Redirect to login page
      console.log("User registered:");
    } catch (err) {
      // Handle error
      setMessage({
        type: "error",
        text: "Error registering. Please try again.",
      });
      console.error("Error registering user:", err);
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
        <h2 className="text-center mb-4 mt-3">SIGN UP</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="mb-2 w-75 mt-3"
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="mb-2 w-75"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="mb-2 w-75"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-2 w-75"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-3 w-75"
          required
        />
        <button
          type="submit"
          className="btn btn-success w-50 mt-4 mb-2"
          style={{ fontSize: "1rem" }}
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Signing up..." : "Sign up"} {/* Show loading text */}
        </button>
        {/* Success or Error message */}
        {message.text && (
          <div
            className={`mt-3 text-center w-75 ${
              message.type === "success" ? "text-success" : "text-danger"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;

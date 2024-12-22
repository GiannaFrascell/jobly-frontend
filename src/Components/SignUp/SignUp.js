import React, { useState } from "react";
import JoblyApi from "../../api"; // Import the API class

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "", // Added username field
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, firstName, lastName, email, password } = formData;
      const userData = { username, firstName, lastName, email, password };

      // Call the API to register the user
      const res = await JoblyApi.request("auth/register", userData, "post");

      // Handle success (you can store the token here or show a success message)
      setMessage({ type: "success", text: "Profile Created successfully!" });
      console.log("User registered:", res.token);
    } catch (err) {
      // Handle error
      setMessage({
        type: "error",
        text: "Error Registering. Please try again.",
      });

      console.error("Error registering user:", err);
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
          name="username" // Updated to include username
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="mb-2 w-75 mt-3"
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="mb-2 w-75"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="mb-2 w-75"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-2 w-75"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-3 w-75"
        />
        <button
          type="submit"
          className="btn btn-success w-50 mt-4 mb-2"
          style={{ fontSize: "1rem" }}
        >
          Sign up
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

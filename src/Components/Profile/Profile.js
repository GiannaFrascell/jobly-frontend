import React, { useEffect, useState, useContext } from "react";
import JoblyApi from "../../api"; // Assuming JoblyApi is the correct path for the API
import { AuthContext } from "../../Context/AuthContext";

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
 

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      });
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, ...updatedData } = formData;

    try {
      const updatedUser = await JoblyApi.updateUser(username, updatedData);
      console.log("Updated Profile:", updatedUser);

      setCurrentUser(updatedUser);

      // Set success message
      setMessage({ type: "success", text: "Profile updated successfully!" });

    } catch (err) {
      // Set error message
      setMessage({ type: "error", text: "Error updating profile. Please try again." });
  
    }
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-center align-items-center bg-secondary p-4 rounded shadow-lg gap-1 h-auto w-100 w-md-50"
      >
        <h2 className="text-center mt-6 mb-5">Edit Profile</h2>

        {/* Username field */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          disabled
          className="w-75 mb-2 mt-7"
        />

        {/* First Name field */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-75 mb-2"
        />

        {/* Last Name field */}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-75 mb-2"
        />

        {/* Email field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-75 mb-3"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-success w-50 mt-4"
          style={{ fontSize: "1rem" }}
        >
          Save
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

export default Profile;
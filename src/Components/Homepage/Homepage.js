import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"; // Import the AuthContext


const Homepage = () => {
  const { currentUser } = useContext(AuthContext); // Access currentUser from AuthContext

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
      {currentUser ? (
        // If the user is logged in, display welcome message with user's first name
        <>
           <h1 className="display-4 fw-bold text-white">
            WELCOME BACK, <span className="text-primary text-uppercase">{currentUser.firstName} !</span>
          </h1>
          <h2 className="h1 mt-2 text-white-50">JOBLY</h2>
          <p className="h5 text-white-50">
            All the jobs in one, convenient place.
          </p>
         
        </>
      ) : (
        // If the user is not logged in, show login and sign up buttons
        <>
          <h1 className="display-2 fw-bold text-white">
            WELCOME <span className="text-primary">USER</span>
          </h1>
          <h2 className="h1 text-white-50 h2">JOBLY</h2>
          <p className="h5 text-white-50" >
            All the jobs in one, convenient place.
          </p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-primary me-2">
              Log In
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;


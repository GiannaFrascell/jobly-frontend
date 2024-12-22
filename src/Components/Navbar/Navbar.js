import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext); // Using context to track user state
  const navigate = useNavigate(); // Initialize useNavigate hook in the component

  const handleLogout = () => {
    navigate("/"); // Redirect to home page after logout
    logout(); // Call logout from context
    
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          <strong className="h4">Jobly</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              // If user is logged in, show Profile and Logout options
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/companies"
                  >
                    Companies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/jobs"
                  >
                    Jobs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Log Out {currentUser.username}
                  </button>
                </li>
              </>
            ) : (
              // If not logged in, show Log In and Sign Up links
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

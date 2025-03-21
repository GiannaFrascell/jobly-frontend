import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import routes from "./Routes/routes";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//Custom CSS
import "./App.css";

const App = () => {
    return (
        <AuthProvider>
            {" "}
            {/* Use AuthProvider to wrap your entire app */}
            <Router>
                <Navbar />
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;

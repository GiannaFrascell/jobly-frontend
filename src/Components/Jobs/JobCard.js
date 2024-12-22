import React, { useState } from "react";
import JoblyApi from "../../api"; // Ensure the correct path to your API

const JobCard = ({ title, company, salary, equity, jobId, username }) => {
  const [isApplied, setIsApplied] = useState(false); // State to track if the job has been applied

  const handleApply = async () => {
    if (isApplied) return; // Prevent applying if already applied

    try {
      console.log(username)
      const response = await JoblyApi.applyToJob(username, jobId);
      console.log("Apply response:", response); // Log the response

      if (response && response.applied === jobId) {
        setIsApplied(true); // Mark as applied
      }
    } catch (err) {
      //Console log error and make Applied
      setIsApplied(true);
      console.log("Error applying to job:", err); // Log the error without alerting user
    }
  };

  return (
    <div
      className="card text-center bg-dark text-white shadow-sm h-100"
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-5">{title}</h5>
        <p className="card-text">
          <strong>Company:</strong> {company}
        </p>
        
        <p className="card-text mb-0">
          <strong>Salary:</strong> {salary}
        </p>
        <p className="card-text mb-0">
          <strong>Equity:</strong> {equity}
        </p>
        <button
          className="btn w-50 mt-auto mt-md-2"
          onClick={handleApply}
          disabled={isApplied} // Disable button after applying
        >
          {isApplied ? "Applied" : "Apply"} {/* Change text based on application status */}
        </button>
      </div>
    </div>
  );
};

export default JobCard;

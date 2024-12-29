import React, { useState } from "react";
import JoblyApi from "../../api"; // Ensure the correct path to your API

const JobCard = ({ title, company, salary, equity, jobId, username }) => {
  const [isApplied, setIsApplied] = useState(false); // State to track if the job has been applied
  const [loading, setLoading] = useState(false); // Loading state

  const handleApply = async () => {
    if (isApplied || loading) return; // Prevent applying if already applied or loading

    setLoading(true); // Set loading to true before making the API call
    try {
      const response = await JoblyApi.applyToJob(username, jobId);
      console.log("Apply response:", response); // Log the response

      if (response && response.applied === jobId) {
        setIsApplied(true); // Mark as applied
      }
    } catch (err) {
      setIsApplied(true);//Even already applied Set applied to true
      console.log("Error applying to job:", err); // Log the error 
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  return (
    <div className="card text-center bg-dark text-white shadow-sm h-100">
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
          className="btn btn-success w-50 mt-auto mt-md-2"
          onClick={handleApply}
          disabled={isApplied || loading} // Disable button while applying or after applied
        >
          {loading ? "Applying..." : isApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default JobCard;

import React, { useState, useEffect,useContext } from "react";
import JobCard from "./JobCard";
import JoblyApi from "../../api";
import { AuthContext } from "../../Context/AuthContext";

const Jobs = () => { 
  const [jobs, setJobs] = useState([]);// State to store jobs
  const [searchTerm, setSearchTerm] = useState("");// State to store search term
  const [searchInput, setSearchInput] = useState(""); // For controlled input
  const [isLoading, setIsLoading] = useState(true);// Loading state
  const [error, setError] = useState(null);// Error state

  const { currentUser } = useContext(AuthContext);

  // Fetch jobs based on the search term
  useEffect(() => {
    const fetchJobs = async () => {
      
      setIsLoading(true);
      setError(null);

      try {
        const filters = searchTerm ? { title: searchTerm } : {};
        const fetchedJobs = await JoblyApi.searchJobs(filters);
        setJobs(fetchedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Could not load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchInput); // Trigger search with the input value
  };

  if (isLoading){
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#000" }}
      >
        <div
          className="spinner-border text-success"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="sr-only visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container py-4 text-white mt-5">
      <h2 className="text-center mb-4 mt-5">Jobs</h2>
      <div className="input-group mb-5 w-75 w-sm-50 d-flex align-items-center justify-content-center mx-auto">
        <input
          type="text"
          className="w-75"
          placeholder="Search Jobs"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="col" key={job.id}>
              <JobCard
                title={job.title}
                company={job.companyName}
                salary={job.salary}
                equity={job.equity}
                jobId={job.id} 
                username={currentUser ? currentUser.username : null} 
              />
            </div>
          ))
        ) : (
          <p className="text-center">No jobs match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;

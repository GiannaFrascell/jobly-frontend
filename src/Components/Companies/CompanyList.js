import React, { useState, useEffect } from "react";
import JoblyApi from "../../api";
import CompanyCard from "./CompanyCard";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);// State to store companies
  const [searchTerm, setSearchTerm] = useState("");// State to store search term
  const [searchInput, setSearchInput] = useState(""); // For controlled input
  const [isLoading, setIsLoading] = useState(true);// Loading state
  const [error, setError] = useState(null);// Error state

  // Fetch companies based on the search term or initial load
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Set filters based on the search term
        const filters = searchTerm ? { name: searchTerm } : {};
        const fetchedCompanies = await JoblyApi.getCompanies(filters);
        setCompanies(fetchedCompanies);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Could not load companies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchInput); 
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
      <h2 className="text-center mb-5 mt-5">Companies</h2>
      <div className="input-group mb-5 w-75 d-flex align-items-center justify-content-center mx-auto">
        <input
          type="text"
          className="w-75"
          placeholder="Search companies..."
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
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {companies.length > 0 ? (
          companies.map((company) => (
            <div className="col h-100" key={company.handle}>
              <CompanyCard
                name={company.name}
                description={company.description}
                handle={company.handle}
              />
            </div>
          ))
        ) : (
          <p>No companies found.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyList;

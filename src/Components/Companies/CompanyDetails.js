import { useEffect,useState,useContext } from "react"; 
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import JobCard from "../Jobs/JobCard"
import { AuthContext } from "../../Context/AuthContext";



const CompanyDetail = () => {
  const { handle } = useParams(); // Extract company handle from URL
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching company details for:", handle);

        // Fetch company details, which includes the jobs array
        const fetchedCompany = await JoblyApi.getCompany(handle);
        setCompany(fetchedCompany);
        console.log("Company details:", fetchedCompany);
      } catch (err) {
        console.error("Error fetching company details:", err);
        setError("Could not load company details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [handle]);

  if (isLoading) {
    return <p>Loading company details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!company) {
    return <p>Company not found.</p>;
  }

  return (
    <div className="container">
      <div className="mt-5">
        
        <h2 className="mt-3">{company.name}</h2>
        <p>{company.description}</p>
        <p>Number of Employees: {company.numEmployees}</p>
      </div>

      <div className="mt-5">
        <h3>Jobs at {company.name}</h3>
        {company.jobs.length === 0 ? (
          <p>No jobs available for this company.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {company.jobs.map((job) => (
              <div className="col-md-4" key={job.id}>
                <JobCard
                title={job.title}
                company={handle}
                salary={job.salary}
                equity={job.equity}
                jobId={job.id} 
                username={currentUser.username} 
              />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;
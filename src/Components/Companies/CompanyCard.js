import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ name, description, handle }) => {
  return (
    <div className="card text-center bg-dark text-white shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title mb-4">{name}</h5>
        <p className="card-text">{description}</p>
        <Link
          to={`/companies/${handle}`}
          className="btn btn-outline-info btn-sm mt-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;

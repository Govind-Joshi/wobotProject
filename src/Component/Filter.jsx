import React, { useState } from "react";
import "../css/Filters.css";



const statuses = ["Active", "Inactive"];

function Filters({ loction_data,callback_loction,callback_status,selectedLocation,selectedStatus }) {



  const handleLocationChange = (event) => {
    const value = event.target.value;
    console.log(value,"value....")
    callback_loction(value)
  
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    callback_status(value)

  };

  if(!loction_data)return;
  return (
    <div className="filters-container">
   
      <div className="filter-item">       {/* Here I Apply Location Filter */}
     
        <select
          id="location-select"
          className="filter-dropdown"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option value="">Select Location</option>
          {Array.from(loction_data).map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

   
      <div className="filter-item">         {/*here i apply status filter */}
     
        <select
          id="status-select"
          className="filter-dropdown"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">Select Status</option>
          {statuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;

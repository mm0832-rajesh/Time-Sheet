import React from "react";
import "./employeeScreen.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const EmployeeScreen = () => {
  const location = useLocation();
  const { employee } = location.state || {};

  // console.log(employee);

  return (
    <div className="empScreen-container">
      <div className="top">
        <div className="empHeader">
          <div className="avatar">🧑‍💼</div>
          <div className="empName">Hii {employee.empName}</div>
        </div>
        <Link to="/holiday" style={{ textDecoration: "none" }}>
          <div className="holiday">Holiday</div>
        </Link>
      </div>

      <div className="empTimesheetBody">
        <div className="leaveBody">
          <div className="sickLeave">
            <h2 style={{ color: "yellowgreen" }}>Sick</h2>
            <div className="sickCount">
              <h4>Total Sick : 7</h4>
              <h4>Approved : {employee.empLeaves}</h4>
              <h4>Remaining : {7 - employee.empLeaves}</h4>
            </div>
          </div>
          <div className="casualLeave">
            <h2 style={{ color: "yellowgreen" }}>Casual</h2>
            <div className="casualCount">
              <h4>Total Casual : 18</h4>
              <h4>Approved : {employee.empLeaves - 2}</h4>
              <h4>Remaining : 16</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeScreen;

import React from "react";
import "./employeeScreen.css";
import { useLocation } from "react-router-dom";

const EmployeeScreen = () => {
  const location = useLocation();
  const { employee } = location.state || {};

  // console.log(employee);

  return (
    <div className="empScreen-container">
      <div className="empHeader">
        <div className="avatar">🧑‍💼</div>
        <div className="empName">Hii {employee.empName}</div>
      </div>
      <div className="empTimesheetBody">Body</div>
    </div>
  );
};

export default EmployeeScreen;

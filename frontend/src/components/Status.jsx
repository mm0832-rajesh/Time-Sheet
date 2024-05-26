import React, { useEffect, useState } from "react";
import "./status.css";

const Status = ({taskData}) => {

  console.log(taskData);
  const [formData, setFormData] = useState({
    overallStatus: "",
    approver: "",
    approverRemark: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if there are any tasks
        if (taskData.length > 0) {
          // Assuming the overall status is based on the first task's status
          const overallStatus = taskData[0].status;
          const approverRemarks = taskData[0].remarks;
          // Fetch additional data if needed
          // const response = await fetch("/api/decision");
          // const data = await response.json();
          setFormData({
            overallStatus: overallStatus,
            approver: approverRemarks,
            approverRemark: "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [taskData]);

  return (
    <div className="status">
      <div className="statusContainer">
        <div className="inputField">
          <label>Overall Status:</label>
          <input type="text" value={formData.overallStatus} disabled />
        </div>
        <div className="inputField">
          <label>Approver:</label>
          <input type="text" value={formData.approver} disabled />
        </div>
        <div className="inputField">
          <label>Approver Remark:</label>
          <input type="text" value={formData.approverRemark} disabled />
        </div>
      </div>
      <div className="infoContainer">
        {[
          { color: "violet", label: "Today" },
          { color: "red", label: "Holiday" },
          { color: "sky", label: "Weekend" },
          { color: "blue", label: "Applied Leave" },
          { color: "darkGreen", label: "Full Day Leave" },
          { color: "green", label: "Half Day Leave" },
        ].map((day, index) => (
          <div className="day" key={index}>
            <div className={`box ${day.color}`}></div>
            <div className="dayName">{day.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;

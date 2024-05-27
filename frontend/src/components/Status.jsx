import React from "react";
import "./status.css";

const Status = ({ statusObj }) => {
  console.log(statusObj);

  return (
    <div className="status">
      <div className="statusContainer">
        <div className="inputField">
          <label>Overall Status:</label>
          <input type="text" value={statusObj.status} disabled />
          {/* {console.log(formData.overallStatus)} */}
        </div>
        <div className="inputField">
          <label>Approver:</label>
          <input
            type="text"
            value={statusObj.remarks ? "Manish" : ""}
            disabled
          />
        </div>
        <div className="inputField">
          <label>Approver Remark:</label>
          <input type="text" value={statusObj.remarks} disabled />
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

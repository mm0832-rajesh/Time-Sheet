import React from "react";
import "./leaveScreen.css";

const LeaveScreen = () => {
  const handleSubmit=()=>{
    alert("Leave applied successfully")
}
return (
<div className="container ml-20">
  <div className="col-5 ml-5 leaveform">
    <p className="h3 text-center p-2">Leave Apply</p>
    <form className="row g-3 ml-200" onSubmit={(e) => {
        e.preventDefault(); 
        handleSubmit(); 
      }}>
      <div className="col-md-6">
        <label htmlFor="startDate" className="form-label">Start Date</label>
        <input type="date" className="form-control" id="startDate" />
      </div>
      <div className="col-md-6">
        <label htmlFor="endDate" className="form-label">End Date</label>
        <input type="date" className="form-control" id="endDate" />
      </div>
      <div className="col-12">
        <label htmlFor="leaveReason" className="form-label">Leave Reason</label>
        <input type="text-area" className="form-control" id="leaveReason" placeholder="Type leave reason" />
      </div>
      <div className="col-md-4">
        <label htmlFor="leaveType" className="form-label">Leave Type</label>
        <select id="leaveType" className="form-select">
          <option selected>Choose...</option>
          <option>Casual Leave</option>
          <option>Sick Leave</option>
        </select>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="halfDay" value="halfDay" />
        <label className="form-check-label" htmlFor="halfDay">
          Half Day
        </label>
      </div>
      <div className="form-check ml-3">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="fullDay" value="fullDay" checked />
        <label className="form-check-label" htmlFor="fullDay">
          Full Day
        </label>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">Apply</button>
      </div>
    </form>
  </div>
  <hr />
  <div className="col-10 leaveHistory">
    <p class="h3 ">Leave History</p>
    <div >
        <select id="leaveType" className="form-select">
          <option selected>This Month</option>
          <option>Previous Month</option>
          <option>This Year</option>
          <option>Previous Year</option>
        </select>
      </div>
<div class="table-wrapper">
  <table class="table table-striped">
    <thead >
      <tr>
        <th>Emp Name</th>
        <th>Leave Type</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Reason</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>Casual Leave</td>
        <td>2023-06-01</td>
        <td>2023-06-10</td>
        <td>Family Trip</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>Sick Leave</td>
        <td>2023-07-12</td>
        <td>2023-07-15</td>
        <td>Flu</td>
      </tr>
      <tr>
        <td>John Doe</td>
        <td>Casual Leave</td>
        <td>2023-06-01</td>
        <td>2023-06-10</td>
        <td>Family Trip</td>
      </tr>
      <tr>
        <td>John Doe</td>
        <td>Casual Leave</td>
        <td>2023-06-01</td>
        <td>2023-06-10</td>
        <td>Family Trip</td>
      </tr>
      <tr>
        <td>John Doe</td>
        <td>Casual Leave</td>
        <td>2023-06-01</td>
        <td>2023-06-10</td>
        <td>Family Trip</td>
      </tr>
      <tr>
        <td>John Doe</td>
        <td>Casual Leave</td>
        <td>2023-06-01</td>
        <td>2023-06-10</td>
        <td>Family Trip</td>
      </tr>
      <tr>
        <td>John Doe</td>
        <td>Casual Leave</td>
        <td>2023-06-01</td>
        <td>2023-06-10</td>
        <td>Family Trip</td>
      </tr>
      <tr>
        <td>John Doe</td>
        <td>Casual Leave</td>
        <td>2023-06-01</td>
        <td>2023-06-10</td>
        <td>Family Trip</td>
      </tr>
      <tr>
        <td>John Doe</td>
        <td>Casual Leave</td>
        <td>2023-06-01</td>
        <td>2023-06-10</td>
        <td>Family Trip</td>
      </tr>
      <tr>
        <td>John Doe</td>
        <td>Casual Leave</td>
        <td>2023-06-01</td>
        <td>2023-06-10</td>
        <td>Family Trip</td>
      </tr>
    </tbody>
  </table>
</div>
</div>

  </div>
  );
};

export default LeaveScreen;

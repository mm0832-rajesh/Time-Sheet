import React from "react";
import "./leaveScreen.css";
import { useSnackbar } from "notistack";

const LeaveScreen = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = () => {
    enqueueSnackbar('Leave applied successfully', { variant: 'success' });
  };

  return (
    <div className="container-fluid leave-container">
      <div className="row ">
        <div className="col-md-4 left-column ">
          <div className="card rounded-0 sick-card ">
            <div className="card-body">
              <h4 className="card-title">Sick Leave</h4>
              <div className="card-text">
                <p>Total Sick: 7</p>
                <p>Approved: 3</p>
                <p>Remaining: 4</p>
              </div>
            </div>
          </div>
          <div className="card rounded-0 casual-card ">
            <div className="card-body">
              <h4 className="card-title">Casual Leave</h4>
              <div className="card-text">
                <p>Total Sick: 12</p>
                <p>Approved: 6</p>
                <p>Remaining: 6</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 right-column">
          <div className="card rounded-1 mb-2 mt-1 right-cards">
            <div className="card-body pt-1 pb-1">
              <h4 className="card-title-right">Leave Apply</h4>
              <form
                className="row g-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="col-md-4">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <input type="date" className="form-control" id="startDate" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <input type="date" className="form-control" id="endDate" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="leaveType" className="form-label">Leave Type</label>
                  <select id="leaveType" className="form-select">
                    <option defaultValue>Choose...</option>
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                  </select>
                </div>
                <div className="col-12 mt-0">
                  <label htmlFor="leaveReason" className="form-label" style={{textAlign:'start', 'padding-left':'80px'}}>Leave Reason</label>
                  <textarea
                    className="form-control"
                    id="leaveReason"
                    placeholder="Type leave reason"
                    rows="1"
                  />
                </div>
                
                <div className="col-5 mt-1 "></div>
                <div className="col-2 mt-1">
                  <button type="submit" className="btn btn-primary small-button">Apply</button>
                </div>
              </form>
            </div>
          </div>
          <div className="card rounded-1 right-cards">
            <div className="card-body">
              <div className="row align-items-center ">
              <h4 className="col-6 card-title-right" style={{'padding-right':'25%'}} >Leave History</h4>
             
              
              <div className="col-3 mt-0 dropdown">
                <select id="leaveHistoryType" className="form-select">
                  <option defaultValue>This Month</option>
                  <option>Previous Month</option>
                  <option>This Year</option>
                  <option>Previous Year</option>
                </select>
              </div>
              </div>
              
              <div className="table-wrapper">
                <table className="table table-striped">
                  <thead className="table-header">
                    <tr>
                      <th>Employee Name</th>
                      <th>Leave Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                
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
        </div>
      </div>
    </div>
  );
};

export default LeaveScreen;

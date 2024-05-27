import React from "react";
import "./leaveScreen.css";

const LeaveScreen = () => {
  const handleSubmit = () => {
    alert("Leave applied successfully");
  };
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-4 ">
          <div className="card rounded-0 sick-card">
            <div className="card-body">
              <h4 className="card-title">Sick Leave</h4>
              <p className="card-text">
              <h6>Total Sick: 7</h6>
                <h6>Approved: 3</h6>
                <h6>Remaining: 4</h6>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="card rounded-0 casual-card">
            <div className="card-body">
            <h4 className="card-title">Casual Leave</h4>
              <p className="card-text">
              <h6>Total Sick: 12</h6>
                <h6>Approved: 6</h6>
                <h6>Remaining: 6</h6>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mt-4">
      <div className="col-md-5">
  <div className="card rounded-0">
    <div className="card-body">
      <h4 className="card-title">Leave Apply</h4>
      <form
        className="row g-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="col-md-6">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input type="date" className="form-control" id="startDate" />
        </div>
        <div className="col-md-6">
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="halfDay"
              value="halfDay"
            />
            <label className="form-check-label" htmlFor="halfDay">
              Half Day
            </label>
          </div>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="fullDay"
              value="fullDay"
              checked
            />
            <label className="form-check-label" htmlFor="fullDay">
              Full Day
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input type="date" className="form-control" id="endDate" />
        </div>
        <div className="col-md-6">
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault2"
              id="halfDay2"
              value="halfDay"
            />
            <label className="form-check-label" htmlFor="halfDay2">
              Half Day
            </label>
          </div>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault2"
              id="fullDay2"
              value="fullDay"
              checked
            />
            <label className="form-check-label" htmlFor="fullDay2">
              Full Day
            </label>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="leaveReason" className="form-label">
            Leave Reason
          </label>
          <textarea
            className="form-control"
            id="leaveReason"
            placeholder="Type leave reason"
            rows="1"
          />
        </div>
        <div className="col-md-12 mt-2">
          <label htmlFor="leaveType" className="form-label mr-5">
            Leave Type
          </label>
          <select id="leaveType" className="form-select ">
            <option selected>Choose...</option>
            <option>Casual Leave</option>
            <option>Sick Leave</option>
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Apply
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
        <div className="col-md-7">
          <div className="card rounded-0 ">
            <div className="card-body">
              <h4 className="card-title">Leave History</h4>
              <div>
                <select id="leaveType" className="form-select">
                  <option selected>This Month</option>
                  <option>Previous Month</option>
                  <option>This Year</option>
                  <option>Previous Year</option>
                </select>
              </div>
              <div class="table-wrapper">
                <table class="table table-striped">
                  <thead>
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
        </div>
      </div>
    </div>
  );
};

export default LeaveScreen;

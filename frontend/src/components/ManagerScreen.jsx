import React, { useEffect, useState } from "react";
import "./managerScreen.css";
import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
import HolidayScreen from "./HolidayScreen";
import Calendar from "react-calendar";
import Status from "./Status";
import LeaveScreen from "./LeaveScreen";
import AssignTask from "./AssignTask";
import Approval from "./Approval";

const ManagerScreen = () => {
  const [showHoliday, setShowHoliday] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(true);
  const [showLeave, setShowLeave] = useState(false);
  const [showTimesheet, setShowTimesheet] = useState(false);
  const [showApproval, setShowApproval] = useState(false);

  const [date, setDate] = useState(new Date());
  const [holidayData, setHolidayData] = useState([]);
  const [visibleDays, setVisibleDays] = useState(0);

  const [active, setActive] = useState("timesheet");

  const handleOptionClick = (option, handler) => {
    setActive(option);
    handler();
  };

  const location = useLocation();

  const { manager } = location.state || {};

  // console.log(manager);

  const holidayBtnHandler = () => {
    setShowHoliday(true);
    setShowAssignTask(false);
    setShowLeave(false);
    setShowTimesheet(false);
    setShowApproval(false);
  };

  const leaveHandler = () => {
    setShowLeave(true);
    setShowAssignTask(false);
    setShowHoliday(false);
    setShowTimesheet(false);
    setShowApproval(false);
  };

  const timesheetHandler = () => {
    setShowTimesheet(true);
    setShowLeave(false);
    setShowAssignTask(false);
    setShowHoliday(false);
    setShowApproval(false);
  };

  const assignTaskHandler = () => {
    setShowTimesheet(false);
    setShowLeave(false);
    setShowAssignTask(true);
    setShowHoliday(false);
    setShowApproval(false);
  };

  const approvalHandler = () => {
    setShowTimesheet(false);
    setShowLeave(false);
    setShowAssignTask(false);
    setShowHoliday(false);
    setShowApproval(true);
  };

  const onChange = (date) => {
    setDate(date);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/holiday/1");
      const data = await response.json();
      setHolidayData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const activeStartDate = new Date(year, month, 1);
    handleActiveStartDateChange({ activeStartDate, view: "month" });
  }, []);

  const extractMonthAndDate = (str) => {
    const parts = str.split(",")[0].trim().split(" ");
    const month = parts[0];
    const date = parts[1];
    return `${month} ${date}`;
  };

  const getClassName = ({ date, view }) => {
    const dayOfWeek = date.getDay();
    const dateString = date.toDateString();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (view === "month" && dateString === new Date().toDateString()) {
      return "today";
    }

    if (view === "month" && isWeekend) {
      return "weekend";
    }

    const result = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}`;

    const isHoliday = holidayData.some((holiday) => {
      const extractedDate = extractMonthAndDate(holiday.date);
      return extractedDate === result;
    });

    if (isHoliday) {
      return "holiday1";
    }

    return "";
  };

  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view === "month") {
      const year = activeStartDate.getFullYear();
      const month = activeStartDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      // console.log("Result is :" + daysInMonth);
      setVisibleDays(daysInMonth);
    }
  };

  return (
    <div className="container">
      <div className="top">
        <div className="empHeader">
          <div className="avatar">🧑‍💼</div>
          <div className="empName">Hi Manager</div>
        </div>
        <div className="navOptions">
          <div
            className={`taskAssign ${active === "taskAssign" ? "active" : ""}`}
            onClick={() => handleOptionClick("taskAssign", assignTaskHandler)}
          >
            AssignTask
          </div>

          <div
            className={`approval ${active === "approval" ? "active" : ""}`}
            onClick={() => handleOptionClick("approval", approvalHandler)}
          >
            Approval
          </div>

          <div
            className={`timesheet ${active === "timesheet" ? "active" : ""}`}
            onClick={() => handleOptionClick("timesheet", timesheetHandler)}
          >
            Timesheet
          </div>
          <div
            className={`holiday ${active === "holiday" ? "active" : ""}`}
            onClick={() => handleOptionClick("holiday", holidayBtnHandler)}
          >
            Holiday
          </div>
          <div
            className={`leave ${active === "leave" ? "active" : ""}`}
            onClick={() => handleOptionClick("leave", leaveHandler)}
          >
            Leave
          </div>
        </div>
      </div>

      {/* {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <button className="close-btn" onClick={togglePopup}>
                ❌
              </button>
            </div>
            <div className="popup-body">
              <div className="emp-task">
                <label htmlFor="employeeId">
                  Employee Id<span className="required">*</span>
                </label>
                <select
                  name="employeeId"
                  id="employeeId"
                  // value={data.employeeId}
                  // onChange={handleChange}
                >
                  <option value="">Select Employee ID</option>
                  {manager.employees.map((employee) => (
                    <option key={employee.empId} value={employee.empId}>
                      {employee.empId}
                    </option>
                  ))}
                </select>
                <br />
                <label htmlFor="employeeName">
                  Employee Name<span className="required">*</span>
                </label>
                <select
                  name="employeeName"
                  id="employeeName"
                  // value={data.employeeName}
                  // onChange={handleChange}
                >
                  <option value="">Select Employee Name</option>
                  {manager.employees.map((employee) => (
                    <option key={employee.empId} value={employee.empName}>
                      {employee.empName}
                    </option>
                  ))}
                </select>
                <br />
                <label htmlFor="taskName">
                  Task Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="taskName"
                  id="taskName"
                  placeholder="Task Name"
                  required
                  // value={data.taskName}
                  // onChange={handleChange}
                />
                <br />
              </div>

              <div className="task-date">
                <label htmlFor="startDate">
                  Start Date<span className="required">* </span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  // value={data.startDate}
                  // onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="endDate">
                  End Date<span className="required">* </span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  // value={data.endDate}
                  // onChange={handleChange}
                />
              </div>

              <div className="task-hour">
                <label htmlFor="planedHour">Planed Hours:</label>
                <input
                  type="number"
                  name="planedHour"
                  id="planedHour"
                  // value={data.planedHour}
                  // onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="billableHour">Billable Hours:</label>
                <input
                  type="number"
                  name="billableHour"
                  id="billableHour"
                  // value={data.billableHour}
                  // onChange={handleChange}
                />
              </div>
            </div>

            <div className="popup-footer">
              <button className="popup-btn" onClick={saveHandler}>
                Save
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )} */}

      {showAssignTask && <AssignTask manager={manager} />}

      {showApproval && <Approval />}

      {showHoliday && <HolidayScreen />}
      {showLeave && (
        <div className="empTimesheetBody">
          <div className="leaveBody">
            <div className="sickLeave">
              <h2 className="leaveTitle">Sick</h2>
              <div className="leaveCount">
                <h4>Total Sick: 7</h4>
                <h4>Approved: 2</h4>
                <h4>Remaining: 5</h4>
              </div>
            </div>
            <div className="casualLeave">
              <h2 className="leaveTitle">Casual</h2>
              <div className="leaveCount">
                <h4>Total Casual: 18</h4>
                <h4>Approved: 3</h4>
                <h4>Remaining: 15</h4>
              </div>
            </div>
          </div>
          <LeaveScreen />
        </div>
      )}
      {showTimesheet && (
        <div className="timesheetContainer">
          <div className="upperPart">
            <div className="timesheetBtns">
              <button className="saveTimesheet">Save</button>
              <button className="submitTimesheet">Submit</button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>TH</th>
                    {Array.from({ length: visibleDays }, (_, index) => (
                      <th key={index}>{index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Hour</td>
                    <td>0</td>
                    {Array.from({ length: visibleDays }, (_, index) => (
                      <td key={index}>
                        <input type="number" disabled />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="lowerPart">
            <Calendar
              onChange={onChange}
              value={date}
              tileClassName={getClassName}
              onActiveStartDateChange={handleActiveStartDateChange}
            />
            <Status />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerScreen;

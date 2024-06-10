import React, { useEffect, useState } from "react";
import "./managerScreen.css";
import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
import HolidayScreen from "./HolidayScreen";
import Calendar from "react-calendar";
// import Status from "./Status";
import LeaveScreen from "./LeaveScreen";
import AssignTask from "./AssignTask";
import Approval from "./Approval";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";

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
    <div className="mgrcontainer">
      <div className="top">
        <div className="empHeader">
          <div className="avatar">🧑‍💼</div>
          <div className="empName">Welcome {manager.mgrName}</div>
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

      {showAssignTask && <AssignTask manager={manager} />}

      {showApproval && <Approval />}

      {showHoliday && <HolidayScreen />}
      {showLeave && <LeaveScreen />}
      {showTimesheet && (
        <div className="timesheetContainer">
          <div className="upperPart">
            <div className="timesheetBtns">
              <button className="saveTimesheet">
                <SaveOutlined /> Save
              </button>
              <button className="submitTimesheet">
                <UploadOutlined /> Submit
              </button>
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
            <div className="status">
              <div className="statusContainer">
                <div className="inputField">
                  <label>Overall Status:</label>
                  <input type="text" value="" disabled />
                  {/* {console.log(formData.overallStatus)} */}
                </div>
                <div className="inputField">
                  <label>Approver:</label>
                  <input type="text" value="" disabled />
                </div>
                <div className="inputField">
                  <label>Approver Remark:</label>
                  <input type="text" value="" disabled />
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerScreen;

import React, { useEffect, useState } from "react";
import "./employeeScreen.css";
import { useLocation } from "react-router-dom";
import HolidayScreen from "./HolidayScreen";
import Calendar from "react-calendar";
import Status from "./Status";

const EmployeeScreen = () => {
  const [showHoliday, setShowHoliday] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showTimesheet, setShowTimesheet] = useState(true);

  const [date, setDate] = useState(new Date());
  const [holidayData, setHolidayData] = useState([]);

  const onChange = (date) => {
    setDate(date);
  };

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

  const location = useLocation();
  const { employee } = location.state || {};

  const holidayHandler = () => {
    setShowHoliday(true);
    setShowLeave(false);
    setShowTimesheet(false);
  };

  const leaveHandler = () => {
    setShowLeave(true);
    setShowHoliday(false);
    setShowTimesheet(false);
  };

  const timesheetHandler = () => {
    setShowTimesheet(true);
    setShowHoliday(false);
    setShowLeave(false);
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

  return (
    <div className="empScreen-container">
      <div className="top">
        <div className="empHeader">
          <div className="avatar">🧑‍💼</div>
          <div className="empName">Hi {employee?.empName || "Employee"}</div>
        </div>
        <div className="navOptions">
          <div className="timesheet" onClick={timesheetHandler}>
            Timesheet
          </div>
          <div className="holiday" onClick={holidayHandler}>
            Holiday
          </div>
          <div className="leave" onClick={leaveHandler}>
            Leave
          </div>
        </div>
      </div>

      {showHoliday && <HolidayScreen />}
      {showLeave && (
        <div className="empTimesheetBody">
          <div className="leaveBody">
            <div className="sickLeave">
              <h2 className="leaveTitle">Sick</h2>
              <div className="leaveCount">
                <h4>Total Sick: 7</h4>
                <h4>Approved: {employee?.empLeaves || 0}</h4>
                <h4>Remaining: {7 - (employee?.empLeaves || 0)}</h4>
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
        </div>
      )}
      {showTimesheet && (
        <div className="timesheetContainer">
          <div className="upperPart">
            <h1>Upper Part fillup</h1>
          </div>
          <div className="lowerPart">
            <Calendar
              onChange={onChange}
              value={date}
              tileClassName={getClassName}
            />
            <Status />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeScreen;

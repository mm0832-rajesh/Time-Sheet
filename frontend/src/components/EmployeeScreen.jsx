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
  const [visibleDays, setVisibleDays] = useState(0);

  const [date, setDate] = useState(new Date());
  const [holidayData, setHolidayData] = useState([]);

  const [taskData, setTaskData] = useState([]);
  const [empTaskData, setEmpTaskData] = useState([]);

  const [hours, setHours] = useState({});

  const [timesheetData, setTimesheetData] = [];

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

  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view === "month") {
      const year = activeStartDate.getFullYear();
      const month = activeStartDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      setVisibleDays(daysInMonth);
    }
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

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const activeStartDate = new Date(year, month, 1);
    handleActiveStartDateChange({ activeStartDate, view: "month" });
  }, []);

  const saveTimesheetHandler = () => {
    let totalHours = 0;
    for (const taskId in hours) {
      for (const day in hours[taskId]) {
        totalHours += Number(hours[taskId][day] || 0);
      }
    }
    console.log("Total Hours:", totalHours);
  };

  const submitTimesheetHandler = () => {
    console.log("Submit Timesheet");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8000/task");
        const tasksData = await response.json();
        setTaskData(tasksData);
      } catch (error) {
        console.log(`Error is :- ${error}`);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const matchEmpId = () => {
      if (taskData.length && employee) {
        const result = taskData.filter(
          (item) => item.employeeId === employee.empId
        );
        setEmpTaskData(result);
      }
    };
    matchEmpId();
  }, [taskData, employee]);

  const handleHourChange = (taskId, day, value) => {
    setHours((prevHours) => ({
      ...prevHours,
      [taskId]: {
        ...prevHours[taskId],
        [day]: value,
      },
    }));
  };

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
            <div className="timesheetBtns">
              <button className="saveTimesheet" onClick={saveTimesheetHandler}>
                Save
              </button>
              <button
                className="submitTimesheet"
                onClick={submitTimesheetHandler}
              >
                Submit
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
                  {empTaskData.map((task, taskIndex) => (
                    <tr key={taskIndex}>
                      <td>{task.description}</td>
                      <td>
                        {Object.values(hours[task.id] || {}).reduce(
                          (acc, hour) => acc + Number(hour || 0),
                          0
                        )}
                      </td>
                      {Array.from({ length: visibleDays }, (_, dayIndex) => (
                        <td key={dayIndex}>
                          <input
                            type="number"
                            value={
                              (hours[task.id] && hours[task.id][dayIndex + 1]) || ""
                            }
                            onChange={(e) =>
                              handleHourChange(task.id, dayIndex + 1, e.target.value)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
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

export default EmployeeScreen;

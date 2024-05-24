import React, { useEffect, useState } from "react";
import "./employeeScreen.css";
import { useLocation } from "react-router-dom";
import HolidayScreen from "./HolidayScreen";
import Calendar from "react-calendar";
import Status from "./Status";
import LeaveScreen from "./LeaveScreen";

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

  const [isDisabled, setIsDisabled] = useState(false);

  const [active, setActive] = useState("timesheet");

  const handleOptionClick = (option, handler) => {
    setActive(option);
    handler();
  };

  // const [timesheetEmpData, setTimesheetEmpData] = useState([]);

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

  // console.log(employee);

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

  //Check
  const checkIfTimesheetExists = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/timesheet/${employeeId}`
      );
      const data = await response.json();
      console.log(data.length);
      return data.length;
    } catch (error) {
      console.error("Error checking timesheet existence:", error);
      return false;
    }
  };

  const saveTimesheetHandler = async () => {
    const timesheetData = {
      inputHour: 0,
      date: new Date().toISOString().split("T")[0],
      employeeId: employee.empId,
    };

    for (const taskId in hours) {
      for (const day in hours[taskId]) {
        timesheetData.inputHour += Number(hours[taskId][day] || 0);
      }
    }

    const timesheetExists = await checkIfTimesheetExists(employee.empId);

    console.log(timesheetExists);

    try {
      const response = await fetch(
        `http://localhost:8000/timesheet${
          timesheetExists ? `/${employee.empId}` : ""
        }`,
        {
          method: timesheetExists ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(timesheetData),
        }
      );

      if (response.ok) {
        console.log("Timesheet data saved successfully.");
      } else {
        console.error("Failed to save timesheet data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving timesheet data:", error);
    }
  };

  const submitTimesheetHandler = async () => {
    console.log("Submit Timesheet: ", empTaskData);

    // Validate hours
    for (const taskId in hours) {
      for (let day = 1; day <= visibleDays; day++) {
        const hourValue = hours[taskId]?.[day];

        // Create a new date object for the current day
        const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
        const dayOfWeek = currentDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const dateString = `${currentDate.toLocaleString("default", {
          month: "short",
        })} ${currentDate.getDate()}`;
        const isHoliday = holidayData.some((holiday) => {
          const extractedDate = extractMonthAndDate(holiday.date);
          return extractedDate === dateString;
        });

        // If the day is not a holiday or weekend, check for empty or exceeding hours
        if (!isHoliday && !isWeekend) {
          if (hourValue === undefined || hourValue === "") {
            alert(`Hours for task ID ${taskId} on day ${day} cannot be empty.`);
            return; // Stop submission if validation fails
          }
          if (Number(hourValue) > 8) {
            alert(
              `Hours for task ID ${taskId} on day ${day} exceed the maximum limit of 8.`
            );
            return; // Stop submission if validation fails
          }
        }
      }
    }

    const updatedEmpTaskData = empTaskData.map((task) => ({
      ...task,
      status: "submited",
    }));

    // Update the state with the new data
    setEmpTaskData(updatedEmpTaskData);
    // setIsDisabled(true);

    try {
      const response = await fetch(
        `http://localhost:8000/task/${employee.empId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(...updatedEmpTaskData),
        }
      );

      if (response.ok) {
        console.log("Tasks submitted successfully.");
        setIsDisabled(true);
      } else {
        console.error("Failed to submit tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting tasks:", error);
    }
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

  useEffect(() => {
    const shouldDisable = empTaskData.some(
      (task) => task.status === "submitted" || task.status === "approved"
    );
    setIsDisabled(shouldDisable);
  }, [empTaskData]);

  const handleHourChange = (taskId, day, value) => {
    setHours((prevHours) => ({
      ...prevHours,
      [taskId]: {
        ...prevHours[taskId],
        [day]: value,
      },
    }));
  };

  // Previous month button handler
  // const prevMonthHandler = () => {
  //   const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  //   // setDate(prevMonthDate);
  //   console.log(prevMonthDate);
  // };

  // // Next month button handler
  // const nextMonthHandler = () => {
  //   const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  //   // setDate(nextMonthDate);
  //   console.log(nextMonthDate);
  // };

  return (
    <div className="empScreen-container">
      <div className="top">
        <div className="empHeader">
          <div className="avatar">🧑‍💼</div>
          <div className="empName">Hi {employee?.empName || "Employee"}</div>
        </div>
        <div className="navOptions">
          <div
            className={`timesheet ${active === "timesheet" ? "active" : ""}`}
            onClick={() => handleOptionClick("timesheet", timesheetHandler)}
          >
            Timesheet
          </div>
          <div
            className={`holiday ${active === "holiday" ? "active" : ""}`}
            onClick={() => handleOptionClick("holiday", holidayHandler)}
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
          <LeaveScreen />
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
                    <th>Task</th>
                    <th>TH</th>
                    {Array.from({ length: visibleDays }, (_, index) => (
                      <th key={index}>{index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {empTaskData.length ? (
                    empTaskData.map((task, taskIndex) => (
                      <tr key={taskIndex}>
                        <td>{task.taskName}</td>
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
                                (hours[task.id] &&
                                  hours[task.id][dayIndex + 1]) ||
                                ""
                              }
                              onChange={(e) =>
                                handleHourChange(
                                  task.id,
                                  dayIndex + 1,
                                  e.target.value
                                )
                              }
                              disabled={isDisabled}
                            />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <h6>No data</h6>
                  )}
                </tbody>
              </table>
            </div>
            {/* <div className="month-navigation">
              <button onClick={prevMonthHandler}>&lt;</button>
              <button onClick={nextMonthHandler}>&gt;</button>
            </div> */}
          </div>
          <div className="lowerPart">
            <Calendar
              onChange={onChange}
              // onChange={setDate}
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

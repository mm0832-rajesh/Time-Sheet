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

  const [timesheetData, setTimesheetData] = useState([]);

  const [timesheetResult, setTimesheetResult] = useState({});

  const [statusObj, setStatusObj] = useState({});

  const [timesheetObject, setTimesheetObject] = useState({
    inputHour: 0,
    date: "",
    employeeId: "",
    task: {
      taskId: 0,
    },
  });

  const handleOptionClick = (option, handler) => {
    setActive(option);
    handler();
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/holiday/1");
        const data = await response.json();
        setHolidayData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const activeStartDate = new Date(year, month, 1);
    handleActiveStartDateChange({ activeStartDate, view: "month" });
  }, []);

  const saveTimesheetHandler = async () => {
    const res = [];
    res.push(timesheetObject);
    console.log(timesheetResult);
    try {
      if (timesheetResult && timesheetResult.id) {
        // If timesheetResult exists and has an id, update the existing timesheet entry
        await fetch(`http://localhost:8000/timesheet/${timesheetResult.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(timesheetObject),
        });
      } else {
        // Otherwise, save a new timesheet entry
        await fetch("http://localhost:8000/timesheet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res),
        });
      }
    } catch (error) {
      console.log("Error is : ", error);
    }
  };

  const submitTimesheetHandler = async () => {
    const errorMessages = [];

    const allTasksFilled = empTaskData.every((task) => {
      for (let day = 1; day <= visibleDays; day++) {
        const value = hours[task.taskId]?.[day];
        const date = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          day
        );
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        const holiday = holidayData.some((holiday) => {
          const holidayDate = new Date(holiday.date);
          return (
            holidayDate.getDate() === day &&
            holidayDate.getMonth() === date.getMonth() &&
            holidayDate.getFullYear() === date.getFullYear()
          );
        });

        if (isWeekend || holiday) {
          if (value !== undefined && value !== "") {
            errorMessages.push(
              `Day ${day}: Should be empty for weekends/holidays.`
            );
            return false;
          }
        } else {
          if (
            value === undefined ||
            value === "" ||
            isNaN(value) ||
            Number(value) !== 8
          ) {
            errorMessages.push(`Day ${day}: Should be exactly 8 hours.`);
            return false;
          }
        }
      }
      return true;
    });

    if (!allTasksFilled) {
      alert(`Errors found:\n${errorMessages.join("\n")}`);
      return;
    }

    try {
      for (const task of empTaskData) {
        const taskResponse = await fetch(
          `http://localhost:8000/task/${task.taskId}`
        );
        if (!taskResponse.ok) {
          throw new Error(`Failed to fetch task with ID ${task.taskId}`);
        }
        const taskData = await taskResponse.json();
        taskData.status = "submitted";

        const updateResponse = await fetch(
          `http://localhost:8000/task/${task.taskId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
          }
        );

        if (!updateResponse.ok) {
          throw new Error(`Failed to update task with ID ${task.taskId}`);
        }
      }

      alert("All timesheets submitted successfully.");
      setIsDisabled(true);
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Error submitting timesheets. Please try again later.");
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

  const handleHourChange = (taskId, day, e) => {
    const { value } = e.target;
    console.log(taskId, day, value);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString("default", { month: "short" });
    const dateString = `${year}-${month}-${day}`;

    setHours((prevHours) => ({
      ...prevHours,
      [taskId]: {
        ...prevHours[taskId],
        [day]: value,
      },
    }));

    setTimesheetObject((prev) => {
      return {
        ...prev,
        inputHour: value,
        date: dateString,
        employeeId: employee.empId,
        task: {
          taskId: taskId,
        },
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/timesheet");
      const data = await response.json();
      setTimesheetData(data);
    };
    fetchData();
  }, []);

  const isWeekend = (day) => {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  // const getSubmittedTasks = () => {
  //   // return taskData.filter((task) => task.status === "submitted" || task.status === "approved");
  //   var tempData = taskData.filter((task) => {
  //     return task.employeeId === employee.empId;
  //   });

  //   return tempData
  // };

  const checkTimesheetHandler = (id) => {
    let tempData = taskData.filter((task) => {
      return task.employeeId === employee.empId;
    });

    let valObj = tempData.find((item) => item.taskId === id);
    setStatusObj(valObj);

    // console.log(id);
  };

  const handleInputClick = (taskId, day, employeeId) => {
    console.log(
      `Task ID: ${taskId}, Day: ${day}, Hours: ${
        hours[taskId]?.[day] || ""
      }, EmployeeId : ${employeeId}`
    );
    console.log(timesheetData);
    const res = timesheetData.find((item) => {
      console.log(
        typeof item.date.split("-")[2],
        typeof day,
        item.date.split("-")[2]
      );
      return (
        item.employeeId === employeeId &&
        item.task.taskId === taskId &&
        item.date.split("-")[2] === String(day)
      );
    });
    console.log(res);
    setTimesheetResult(res);
  };

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
      {showLeave && <LeaveScreen />}
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
                      <th key={index + 1}>{index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {empTaskData.length ? (
                    empTaskData.map((task, taskIndex) => (
                      <tr key={task.taskId}>
                        <td onClick={() => checkTimesheetHandler(task.taskId)}>
                          {task.taskName}
                        </td>
                        <td>
                          {Object.values(hours[task.taskId] || {}).reduce(
                            (acc, hour) => acc + Number(hour || 0),
                            0
                          )}
                        </td>
                        {Array.from({ length: visibleDays }, (_, dayIndex) => (
                          <td
                            key={dayIndex + 1}
                            onClick={() => console.log(dayIndex + 1)}
                          >
                            <input
                              className={`custom-input ${
                                isWeekend(dayIndex + 1) ? "weekend-input" : ""
                              }`}
                              type="number"
                              value={hours[task.taskId]?.[dayIndex + 1] || ""}
                              onChange={(e) =>
                                handleHourChange(task.taskId, dayIndex + 1, e)
                              }
                              onClick={() =>
                                handleInputClick(
                                  task.taskId,
                                  dayIndex + 1,
                                  task.employeeId
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
          </div>
          <div className="lowerPart">
            <Calendar
              onChange={onChange}
              value={date}
              tileClassName={getClassName}
              onActiveStartDateChange={handleActiveStartDateChange}
            />
            <Status statusObj={statusObj} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeScreen;

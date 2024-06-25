import React, { useEffect, useState } from "react";
import "./employeeScreen.css";
import { useLocation } from "react-router-dom";
import HolidayScreen from "./HolidayScreen";
import LeaveScreen from "./LeaveScreen";
import Calendar from "react-calendar";
import Status from "./Status";
import {
  CommentOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Tooltip, Modal, Input } from "antd";
import AssignTask from "./AssignTask";
import Approval from "./Approval";
import HolidayMonth from "./HolidayMonth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeScreen = () => {
  const [showHoliday, setShowHoliday] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showTimesheet, setShowTimesheet] = useState(true);
  const [visibleDays, setVisibleDays] = useState(0);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [showApproval, setShowApproval] = useState(false);

  const [date, setDate] = useState(new Date());
  const [holidayData, setHolidayData] = useState([]);

  const [taskData, setTaskData] = useState([]);
  const [empTaskData, setEmpTaskData] = useState([]);

  const [hours, setHours] = useState({});
  const [comments, setComments] = useState({});

  const [isDisabled, setIsDisabled] = useState(false);
  const [activeComment, setActiveComment] = useState(null);

  const [active, setActive] = useState("timesheet");

  const [timesheetData, setTimesheetData] = useState([]);

  const [timesheetResult, setTimesheetResult] = useState({});

  const [statusObj, setStatusObj] = useState({});

  const [textAreaValue, setTextAreaValue] = useState("");

  const [timesheetObject, setTimesheetObject] = useState({
    inputHour: 0,
    comments: "",
    date: "",
    employeeId: "",
    task: {
      taskId: 0,
    },
  });

  const [showEightHour, setShowEightHour] = useState({});

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [filteredEmpTaskData, setFilteredEmpTaskData] = useState([]);

  const [hideBtn, setHideBtn] = useState(false);

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

    const formattedDate = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}`;

    const isHoliday = holidayData.some((holiday) => {
      // Ensure to correctly format and compare the holiday date
      const holidayDate = new Date(holiday.date);
      const extractedDate = `${holidayDate.toLocaleString("default", {
        month: "short",
      })} ${holidayDate.getDate()}`;

      return extractedDate === formattedDate;
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
      setCurrentMonth(month);
      setCurrentYear(year);
    }
  };

  const location = useLocation();
  const { employee } = location.state || {};

  // console.log(employee);

  const holidayHandler = () => {
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
    const timesheetObjects = [];

    // Construct timesheet objects from the hours state
    Object.keys(hours).forEach((taskId) => {
      Object.keys(hours[taskId]).forEach((day) => {
        const value = hours[taskId][day];
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString("default", { month: "short" });
        const dateString = `${year}-${month}-${day}`;

        timesheetObjects.push({
          inputHour: value,
          comments: comments[taskId]?.[day] || "",
          date: dateString,
          employeeId: employee.empId,
          task: { taskId },
        });
      });
    });

    try {
      // Fetch all existing timesheets to check if any entry already exists
      const response = await fetch("http://localhost:8000/timesheet");
      const data = await response.json();

      const updatePromises = [];
      let createObjects = [];

      timesheetObjects.forEach((timesheetObject) => {
        // console.log(timesheetObject);
        // Check if there is an existing timesheet entry with the same date and taskId
        const existingTimesheet = data.find((entry) => {
          // console.log(entry);
          return (
            entry.date === timesheetObject.date &&
            entry.task.taskId === Number(timesheetObject.task.taskId)
          );
        });
        // console.log(existingTimesheet);

        if (existingTimesheet) {
          // Update the existing entry
          updatePromises.push(
            fetch(`http://localhost:8000/timesheet/${existingTimesheet.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(timesheetObject),
            })
          );
        } else {
          // Add to the list of new entries to be created
          createObjects.push(timesheetObject);
        }
      });

      // console.log(updatePromises);
      // console.log(createObjects);

      // Create new entries if there are any
      if (createObjects.length > 0) {
        await fetch("http://localhost:8000/timesheet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createObjects),
        });

        createObjects = [];
      }
      // alert("Timesheet sucessfully saved");
      toast.success("Timesheet successfully saved");
      // Await all update promises
      // await Promise.all(updatePromises);
    } catch (error) {
      console.log("Error is : ", error);
      toast.error("Error saving timesheet");
    }
  };

  const submitTimesheetHandler = async () => {
    console.log(showEightHour);

    try {
      const invalidDays = [];
      Object.entries(showEightHour).forEach(([day, hours]) => {
        if (hours === 0) {
          invalidDays.push(day);
        }
      });
      if (invalidDays.length > 0) {
        toast.error(
          `Total hours for day(s) ${invalidDays.join(
            ", "
          )} should not be empty. Please correct before submitting.`
        );
        return;
      }

      const updatedTasks = [...empTaskData]; // Copy the current task state

      for (const task of empTaskData) {
        const taskResponse = await fetch(
          `http://localhost:8000/task/${task.taskId}`
        );
        if (!taskResponse.ok) {
          throw new Error(`Failed to fetch task with ID ${task.taskId}`);
        }
        const taskData = await taskResponse.json();
        if (taskData.overallStatus !== "approved") {
          taskData.overallStatus = "submitted";
        }
        // taskData.overallStatus = "submitted";
        taskData.empStatus = "submitted";

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

        // Update the local task state
        const taskIndex = updatedTasks.findIndex(
          (t) => t.taskId === task.taskId
        );
        if (taskIndex !== -1) {
          updatedTasks[taskIndex] = { ...task, ...taskData };
        }
      }

      setEmpTaskData(updatedTasks); // Update the state with the modified tasks

      toast.success("All timesheets submitted successfully.");
      setIsDisabled(true);
      // setHideBtn(true)
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error submitting timesheets. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8000/task");
        const tasksData = await response.json();
        setTaskData(tasksData);

        const empAllTasks = taskData.filter((item) => {
          return item.employeeId === employee.empId;
        });
        empAllTasks.forEach((item) => {
          if (
            item.overallStatus === "submitted" ||
            item.overallStatus === "approved"
          ) {
            setHideBtn(true);
          } else {
            setHideBtn(false);
            return;
          }
        });
      } catch (error) {
        console.log(`Error is :- ${error}`);
      }
    };
    fetchTasks();
  }, [employee.empId]);

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

    // Update the hours state for the specific taskId and day
    setHours((prevHours) => ({
      ...prevHours,
      [taskId]: {
        ...prevHours[taskId],
        [day]: value,
      },
    }));
  };

  useEffect(() => {
    // Calculate total hours for each day whenever 'hours' state changes
    const calculateTotalHoursPerDay = () => {
      const totalHoursPerDay = {};

      // Iterate through each taskId
      Object.keys(hours).forEach((taskId) => {
        // Iterate through each day for the current taskId
        Object.keys(hours[taskId]).forEach((day) => {
          const currentHours = parseFloat(hours[taskId][day]) || 0;
          totalHoursPerDay[day] = (totalHoursPerDay[day] || 0) + currentHours;
        });
      });

      // Update showEightHour state with total hours for each day
      setShowEightHour(totalHoursPerDay);
    };

    // Call the function to calculate total hours initially and whenever 'hours' state changes
    calculateTotalHoursPerDay();
  }, [hours]); // Dependency array ensures this effect runs whenever 'hours' state changes

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

  const isHoliday = (day) => {
    const formattedDate = `${date.toLocaleString("default", {
      month: "short",
    })} ${day}`;
    return holidayData.some((holiday) => {
      const holidayDate = new Date(holiday.date);
      const extractedDate = `${holidayDate.toLocaleString("default", {
        month: "short",
      })} ${holidayDate.getDate()}`;
      return extractedDate === formattedDate;
    });
  };

  const checkTimesheetHandler = (id) => {
    let tempData = taskData.filter((task) => {
      return task.employeeId === employee.empId;
    });

    console.log(id);

    let valObj = tempData.find((item) => item.taskId === id);
    console.log(valObj);
    setStatusObj(valObj);
  };

  const handleInputClick = (taskId, day, employeeId) => {
    const res = timesheetData.find((item) => {
      return (
        item.employeeId === employeeId &&
        item.task.taskId === taskId &&
        item.date.split("-")[2] === String(day)
      );
    });
    setTimesheetResult(res);
  };

  const textAreaClickHandler = (taskId, day) => {
    setActiveComment({ taskId, day });
  };

  const handleCommentChange = (taskId, day, e) => {
    const { value } = e.target;

    setComments((prevComments) => ({
      ...prevComments,
      [taskId]: {
        ...prevComments[taskId],
        [day]: value,
      },
    }));

    setTimesheetObject((prev) => ({
      ...prev,
      comments: value,
      date: `${new Date().getFullYear()}-${new Date().toLocaleString(
        "default",
        {
          month: "short",
        }
      )}-${day}`,
      employeeId: employee.empId,
      task: { taskId },
    }));
  };

  useEffect(() => {
    const filteredTasks = empTaskData.filter((task) => {
      const taskStartDate = new Date(task.startDate);
      return (
        taskStartDate.getFullYear() === currentYear &&
        taskStartDate.getMonth() === currentMonth
      );
    });
    setFilteredEmpTaskData(filteredTasks);
  }, [empTaskData, currentMonth, currentYear]);

  useEffect(() => {
    const fetchData = () => {
      const empAllTasks = taskData.filter((item) => {
        return item.employeeId === employee.empId;
      });
      empAllTasks.forEach((item) => {
        if (
          item.overallStatus === "submitted" ||
          item.overallStatus === "approved"
        ) {
          setHideBtn(true);
        } else {
          setHideBtn(false);
          return;
        }
      });
    };
    fetchData();
  }, [taskData]);

  return (
    <div className="empScreen-container">
      <ToastContainer />
      <div className="top">
        <div className="empHeader">
          <div className="avatar">🧑‍💼</div>
          <div className="empName">
            Welcome {employee?.empName || "Employee"}
          </div>
        </div>
        <div className="navOptions">
          {(employee.role === "Project Manager" ||
            employee.role === "Team Manager" ||
            employee.role === "HR") && (
            <div
              className={`taskAssign ${
                active === "taskAssign" ? "active" : ""
              }`}
              onClick={() => handleOptionClick("taskAssign", assignTaskHandler)}
            >
              AssignTask
            </div>
          )}

          {(employee.role === "Project Manager" ||
            employee.role === "Team Manager" ||
            employee.role === "HR") && (
            <div
              className={`approval ${active === "approval" ? "active" : ""}`}
              onClick={() => handleOptionClick("approval", approvalHandler)}
            >
              Approval
            </div>
          )}

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

      {showAssignTask && <AssignTask manager={employee} />}

      {showApproval && <Approval approverId={employee.empId} />}

      {showHoliday && <HolidayScreen />}
      {showLeave && <LeaveScreen />}
      {showTimesheet && (
        <div className="timesheetContainer">
          <div className="upperPart">
            {/* {employee &&  */}
            <div className="timesheetBtns">
              <button
                className="saveTimesheet"
                style={{ display: hideBtn ? "none" : "block" }}
                onClick={saveTimesheetHandler}
              >
                <SaveOutlined /> Save
              </button>
              <button
                className="submitTimesheet"
                style={{ display: hideBtn ? "none" : "block" }}
                onClick={submitTimesheetHandler}
              >
                <UploadOutlined /> Submit
              </button>
            </div>
            {/* } */}
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
                    empTaskData.map((task, taskIndex) => {
                      const taskStartDate = new Date(task.startDate);
                      const taskStartMonth = taskStartDate.getMonth();
                      const taskStartYear = taskStartDate.getFullYear();

                      // Check if task's start month and year match the current displayed month and year
                      if (
                        taskStartMonth === currentMonth &&
                        taskStartYear === currentYear
                      ) {
                        return (
                          <tr key={task.taskId}>
                            <Tooltip
                              title={
                                <>
                                  <div>
                                    <strong>Task Name:</strong> {task.taskName}
                                  </div>
                                  <div>
                                    <strong>Start Date:</strong>{" "}
                                    {task.startDate}
                                  </div>
                                  <div>
                                    <strong>End Date:</strong> {task.endDate}
                                  </div>
                                  <div>
                                    <strong>Status:</strong>{" "}
                                    {task.overallStatus}
                                  </div>
                                  <div>
                                    <strong>Billable Hours:</strong>{" "}
                                    {task.billableHour}
                                  </div>
                                </>
                              }
                            >
                              <td
                                className="taskNameClass"
                                onClick={() =>
                                  checkTimesheetHandler(task.taskId)
                                }
                              >
                                {task.taskName}
                              </td>
                            </Tooltip>

                            <td>
                              {Object.values(hours[task.taskId] || {}).reduce(
                                (acc, hour) => acc + Number(hour || 0),
                                0
                              )}
                            </td>
                            {Array.from(
                              { length: visibleDays },
                              (_, dayIndex) => (
                                <td key={dayIndex + 1}>
                                  <div className="input-comment-container">
                                    <input
                                      className={`custom-input ${
                                        isWeekend(dayIndex + 1)
                                          ? "weekend-input"
                                          : ""
                                      } ${
                                        isHoliday(dayIndex + 1)
                                          ? "holiday-input"
                                          : ""
                                      }`}
                                      type="number"
                                      placeholder="Hour"
                                      value={
                                        hours[task.taskId]?.[dayIndex + 1] || ""
                                      }
                                      onChange={(e) =>
                                        handleHourChange(
                                          task.taskId,
                                          dayIndex + 1,
                                          e
                                        )
                                      }
                                      onClick={() =>
                                        handleInputClick(
                                          task.taskId,
                                          dayIndex + 1,
                                          task.employeeId
                                        )
                                      }
                                      disabled={
                                        task.overallStatus === "submitted" ||
                                        task.overallStatus === "approved"
                                          ? true
                                          : false
                                      }
                                    />
                                    <Tooltip title="Comment">
                                      <CommentOutlined
                                        className="comment-icon"
                                        onClick={() =>
                                          textAreaClickHandler(
                                            task.taskId,
                                            dayIndex + 1
                                          )
                                        }
                                      />
                                    </Tooltip>
                                    {activeComment &&
                                      activeComment.taskId === task.taskId &&
                                      activeComment.day === dayIndex + 1 && (
                                        <textarea
                                          value={
                                            comments[task.taskId]?.[
                                              dayIndex + 1
                                            ] || ""
                                          }
                                          onChange={(e) =>
                                            handleCommentChange(
                                              task.taskId,
                                              dayIndex + 1,
                                              e
                                            )
                                          }
                                          style={{
                                            position: "absolute",
                                            zIndex: 1,
                                          }}
                                        />
                                      )}
                                  </div>
                                </td>
                              )
                            )}
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })
                  ) : (
                    <h6>No data</h6>
                  )}

                  <tr>
                    <td>Total</td>
                    <td></td>
                    {Array.from({ length: visibleDays }, (_, dayIndex) => (
                      <td key={dayIndex + 1}>
                        <input
                          className={`custom-input2 ${
                            isWeekend(dayIndex + 1) ? "weekend-input" : ""
                          } ${isHoliday(dayIndex + 1) ? "holiday-input" : ""}`}
                          type="number"
                          value={showEightHour[dayIndex + 1] || 0}
                          disabled={true}
                        />
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
              locale="en-US"
              firstDayOfWeek={0}
            />
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
            <HolidayMonth />
            <Status statusObj={statusObj} />
          </div>
        </div>
      )}

      <Modal
        title="Add Comment"
        visible={!!activeComment}
        onCancel={() => setActiveComment(null)}
        footer={null} // Remove the footer completely
      >
        <Input.TextArea
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
            // Update comments state here
            setComments((prevComments) => ({
              ...prevComments,
              [activeComment.taskId]: {
                ...prevComments[activeComment.taskId],
                [activeComment.day]: e.target.value,
              },
            }));
          }}
          rows={2}
        />
      </Modal>
    </div>
  );
};

export default EmployeeScreen;

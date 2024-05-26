import React, { useEffect, useState } from "react";
import "./assignTask.css";

const AssignTask = ({ manager }) => {
  //   console.log(manager);
  const [showPopup, setShowPopup] = useState(false);
  const [assignTaskBtn, setAssignTaskBtn] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    taskName: "",
    startDate: "",
    endDate: "",
    planedHour: 0,
    billableHour: 0,
  });
  const [TaskData, setTaskData] = useState([]);
  const [tempId, setTempId] = useState(0);

  const handleOpenPopup = () => {
    setAssignTaskBtn(true);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setAssignTaskBtn(false);
    setShowPopup(false);

    setFormData({
      employeeId: "",
      employeeName: "",
      taskName: "",
      startDate: "",
      endDate: "",
      planedHour: 0,
      billableHour: 0,
    });
  };

  const handleSavePopup = async () => {
    console.log(tempId);
    setAssignTaskBtn(false);
    setShowPopup(false);
    if (
      !formData.employeeId ||
      !formData.employeeName ||
      !formData.taskName ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("Please fill the required fields");
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert("Start date cannot be greater than end date");
      return;
    }

    try {
      if (tempId) {
        await fetch(`http://localhost:8000/task/${tempId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:8000/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }
      //   const response = await fetch("http://localhost:8000/task", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   });
    } catch (error) {
      console.log("Error is : ", error);
    }

    setFormData({
      employeeId: "",
      employeeName: "",
      taskName: "",
      startDate: "",
      endDate: "",
      planedHour: 0,
      billableHour: 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const editHandler = (id) => {
    const taskToEdit = TaskData.find((task) => task.taskId === id);
    setTempId(taskToEdit.taskId);
    if (taskToEdit) {
      setFormData({
        employeeId: taskToEdit.employeeId,
        employeeName: taskToEdit.employeeName,
        taskName: taskToEdit.taskName,
        startDate: taskToEdit.startDate,
        endDate: taskToEdit.endDate,
        planedHour: taskToEdit.planedHour,
        billableHour: taskToEdit.billableHour,
      });
      setAssignTaskBtn(true);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    const fetchTaskData = async () => {
      const response = await fetch("http://localhost:8000/task");
      const data = await response.json();
      setTaskData(data);
    };
    fetchTaskData();
  }, []);

  return (
    <div className="taskAssignment-container">
      <button
        disabled={assignTaskBtn}
        onClick={handleOpenPopup}
        style={{ backgroundColor: "#3498DB" }}
      >
        Assign Task
      </button>
      <div className="taskTable-container">
        <table border="1" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>TaskName</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>BillableHour</th>
              <th>PlanedHour</th>
            </tr>
          </thead>
          <tbody>
            {TaskData &&
              TaskData.map((item) => {
                return (
                  <tr
                    key={item.taskId}
                    onClick={() => editHandler(item.taskId)}
                  >
                    <td>{item.employeeId}</td>
                    <td>{item.employeeName}</td>
                    <td>{item.taskName}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.billableHour}</td>
                    <td>{item.planedHour}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div className="popup">
          <form className="form-container">
            <div className="form-input-container">
              <div className="left">
                <label htmlFor="employeeId">
                  Employee Id<span className="required">*</span>
                </label>
                <select
                  name="employeeId"
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                >
                  <option value="">Select Employee ID</option>
                  {manager.employees.map((employee) => (
                    <option key={employee.empId} value={employee.empId}>
                      {employee.empId}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <label htmlFor="employeeName">
                  Employee Name<span className="required">*</span>
                </label>
                <select
                  name="employeeName"
                  id="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                >
                  <option value="">Select Employee Name</option>
                  {manager.employees.map((employee) => (
                    <option key={employee.empId} value={employee.empName}>
                      {employee.empName}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <label htmlFor="taskName">
                  Task Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="taskName"
                  id="taskName"
                  required
                  value={formData.taskName}
                  onChange={handleChange}
                />
              </div>
              <div className="middle">
                <label htmlFor="startDate">
                  Start Date<span className="required">* </span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
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
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
              <div className="right">
                <label htmlFor="planedHour">Planed Hours:</label>
                <input
                  type="number"
                  name="planedHour"
                  id="planedHour"
                  value={formData.planedHour}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="billableHour">Billable Hours:</label>
                <input
                  type="number"
                  name="billableHour"
                  id="billableHour"
                  value={formData.billableHour}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-btns">
              <button
                style={{ margin: "5px", backgroundColor: "red" }}
                type="submit"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button
                style={{ backgroundColor: "#45CE30" }}
                type="submit"
                onClick={handleSavePopup}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssignTask;

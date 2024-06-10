import React, { useEffect, useState } from "react";
import "./assignTask.css";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

const AssignTask = ({ manager }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [assignTaskBtn, setAssignTaskBtn] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    taskName: "",
    startDate: "",
    endDate: "",
    plannedHour: 0,
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

  const handleSavePopup = async (e) => {
    e.preventDefault();
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

    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "employeeId") {
      const selectedEmployee = manager.employees.find(
        (employee) => employee.empId === value
      );
      if (selectedEmployee) {
        setFormData({
          ...formData,
          employeeId: value,
          employeeName: selectedEmployee.empName,
        });
      } else {
        setFormData({
          ...formData,
          employeeId: value,
          employeeName: "",
        });
      }
    }
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
      <div className="assignTaskBtn">
        <button
        className="tasksAssignBtn"
          disabled={assignTaskBtn}
          onClick={handleOpenPopup}
        >
          <EditOutlined/> Assign Task
        </button>
      </div>
      <div className={`content-container ${showPopup ? "show-popup" : ""}`}>
        {showPopup && (
          <div className="popup">
            <form className="form-container" onSubmit={handleSavePopup}>
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
                  <input
                    type="text"
                    name="employeeName"
                    id="employeeName"
                    required
                    value={formData.employeeName}
                    onChange={handleChange}
                    disabled
                  />
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
                   style={{textTransform: "uppercase"}}
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
                  style={{textTransform: "uppercase"}}
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="right">
                  <label htmlFor="planedHour">Planned Hours:</label>
                  <input
                    type="number"
                    name="plannedHour"
                    id="planedHour"
                    value={formData.plannedHour}
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
                className="cancelAssignTaskBtn"
                  style={{ margin: "5px"}}
                  type="button"
                  onClick={handleClosePopup}
                >
                 <CloseOutlined/> Cancel
                </button>
                <button
                className="saveAssignTaskBtn"
                  type="submit"
                >
                <SaveOutlined/> Save
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="taskTable-container">
          <table border="1" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Task Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Billable Hour</th>
                <th>Planned Hour</th>
              </tr>
            </thead>
            <tbody>
              {TaskData &&
                TaskData.map((item) => (
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
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignTask;

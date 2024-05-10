import React, { useState } from "react";
import "./managerScreen.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ManagerScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [assignBtn, setAssignBtn] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const location = useLocation();

  const { manager } = location.state || {};

  // console.log(manager);

  const [data, setData] = useState({
    employeeId: "",
    employeeName: "",
    taskName: "",
    startDate: "",
    endDate: "",
    planedHour: 0,
    billableHour: 0,
  });

  const [saveData, setSaveData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePopup = () => {
    setData({
      employeeId: "",
      employeeName: "",
      taskName: "",
      startDate: "",
      endDate: "",
      planedHour: 0,
      billableHour: 0,
    });
    setShowPopup(!showPopup);
    setEditingMode(false);
    setEditData(null);
    setAssignBtn(!assignBtn);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const saveHandler = async () => {
    try {
      if (
        !data.employeeId ||
        !data.employeeName ||
        !data.taskName ||
        !data.startDate ||
        !data.endDate
      ) {
        setErrorMessage("Please fill in all required fields.");
        return;
      } else if (new Date(data.endDate) < new Date(data.startDate)) {
        setErrorMessage("End date cannot be less than start date.");
        return;
      }

      let uri = editingMode
        ? `http://localhost:8000/task/${editData.employeeId}`
        : "http://localhost:8000/task";

      // console.log(uri+" :- "+data);

      const requestOptions = {
        method: editingMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(uri, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to save data.");
      }

      const text = await response.text();
      console.log("Data saved successfully:", text);

      if (editingMode) {
        const updatedData = saveData.map((item) =>
          item.employeeId === editData.employeeId ? data : item
        );
        setSaveData(updatedData);
      } else {
        setSaveData([...saveData, data]);
        // setAssignBtn(!assignBtn);
      }
      setAssignBtn(false);
      setShowPopup(false);
      setErrorMessage("");
      setData({
        employeeId: "",
        employeeName: "",
        taskName: "",
        startDate: "",
        endDate: "",
        planedHour: 0,
        billableHour: 0,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      setErrorMessage("Failed to save data. Please try again later.");
    }
  };

  const editHandler = (id) => {
    const selectedItem = saveData.find((item) => item.employeeId === id);
    // console.log(selectedItem);
    setData(selectedItem);
    setEditingMode(true);
    setShowPopup(true);
    setEditData(selectedItem);
    // console.log(editData);
    setAssignBtn(false);
  };

  return (
    <div className="container">
      <div className="header">
        <button className="task-btn" onClick={togglePopup} disabled={assignBtn}>
          Assign Task
        </button>
        <Link to="/holiday" style={{ textDecoration: "none" }}>
          <div className="holiday">Holiday</div>
        </Link>
      </div>

      {showPopup && (
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
                  value={data.employeeId}
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
                <label htmlFor="employeeName">
                  Employee Name<span className="required">*</span>
                </label>
                <select
                  name="employeeName"
                  id="employeeName"
                  value={data.employeeName}
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
                <label htmlFor="taskName">
                  Task Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="taskName"
                  id="taskName"
                  placeholder="Task Name"
                  required
                  value={data.taskName}
                  onChange={handleChange}
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
                  value={data.startDate}
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
                  value={data.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="task-hour">
                <label htmlFor="planedHour">Planed Hours:</label>
                <input
                  type="number"
                  name="planedHour"
                  id="planedHour"
                  value={data.planedHour}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="billableHour">Billable Hours:</label>
                <input
                  type="number"
                  name="billableHour"
                  id="billableHour"
                  value={data.billableHour}
                  onChange={handleChange}
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
      )}

      <table border="1" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>EmpId</th>
            <th>EmpName</th>
            <th>Task-Name</th>
            <th>Start-Date</th>
            <th>End-Date</th>
            <th>Planed-Hour</th>
            <th>Billable-Hour</th>
          </tr>
        </thead>
        <tbody>
          {saveData.map((item, index) => (
            <tr key={index} onClick={() => editHandler(item.employeeId)}>
              <td>{item.employeeId}</td>
              <td>{item.employeeName}</td>
              <td>{item.taskName}</td>
              <td>{item.startDate}</td>
              <td>{item.endDate}</td>
              <td>{item.planedHour}</td>
              <td>{item.billableHour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerScreen;

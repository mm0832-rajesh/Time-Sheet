import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

const Approval = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [remarks, setRemarks] = useState('');
  const [taskData, setTaskData] = useState([]);
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8000/task");
        const res = await response.json();
        const filteredTasks = res.filter(task => task.status === 'submitted');
        setTaskData(filteredTasks);
      } catch (error) {
        console.log(`Error is :- ${error}`);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTimeSheet = async () => {
      try {
        const response = await fetch("http://localhost:8000/timesheet");
        const res = await response.json();
        setTimeSheetData(res);
      } catch (error) {
        console.log(`Error is :- ${error}`);
      }
    };
    fetchTimeSheet();
  }, []);

  useEffect(() => {
    if (taskData.length > 0 && timeSheetData.length > 0) {
      const totalHoursMap = timeSheetData.reduce((acc, timesheet) => {
        // console.log(timesheet);
        if (!acc[timesheet.task.taskId]) {
          console.log(timesheet.task.taskId);
          acc[timesheet.task.taskId] = 0;
        }
        acc[timesheet.task.taskId] += timesheet.inputHour;
        // console.log(timesheet.taskId);
        return acc;
      }, {});
      console.log(totalHoursMap);

      const finalData = taskData.map(task => ({
        empId: task.employeeId,
        empName: task.employeeName,
        taskName: task.taskName,
        totalHour: task.billableHour,
        submitted: totalHoursMap[task.taskId] || 0,
        taskId: task.taskId
      }));

      setProcessedData(finalData);
    }
  }, [taskData, timeSheetData]);

  const handleClose = () => {
    setShow(false);
    setRemarks('');
  };

  const handleShow = (employee) => {
    setSelectedEmployee(employee);
    setShow(true);
  };

  const updateTask = async (status) => {
    try {
      const response = await fetch(`http://localhost:8000/task/taskUpdate/${selectedEmployee.taskId}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, remarks })
      });
      if (response.ok) {
        enqueueSnackbar(`${selectedEmployee.taskName} for ${selectedEmployee.empName} is ${status}`, { variant: 'success' });
        handleClose();
        setTaskData(prevData => prevData.filter(task => task.taskId !== selectedEmployee.taskId));
        setProcessedData(prevData => prevData.filter(task => task.taskId !== selectedEmployee.taskId));
      } else {
        enqueueSnackbar('Failed to update task', { variant: 'error' });
      }
    } catch (error) {
      console.log('Error:', error);
      enqueueSnackbar('Failed to update task', { variant: 'error' });
    }
  };

  const handleApprove = () => {
    updateTask('approved');
  };

  const handleReject = () => {
    updateTask('rejected');
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Emp Id</th>
            <th>Emp Name</th>
            <th>Task Name</th>
            <th>Assigned Hour</th>
            <th>Submitted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {processedData.map((employee) => (
            <tr key={employee.taskId}>
              <td>{employee.empId}</td>
              <td>{employee.empName}</td>
              <td>{employee.taskName}</td>
              <td>{employee.totalHour}</td>
              <td>{employee.submitted}</td>
              <td>
                <Button variant="primary" onClick={() => handleShow(employee)}>
                  Action
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmpId">
              <Form.Label>Emp Id</Form.Label>
              <Form.Control
                type="text"
                value={selectedEmployee.empId}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formEmpName">
              <Form.Label>Emp Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedEmployee.empName}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedEmployee.taskName}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formTotalHour">
              <Form.Label>Assigned Hour</Form.Label>
              <Form.Control
                type="text"
                value={selectedEmployee.totalHour}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formSubmitted">
              <Form.Label>Submitted Hour</Form.Label>
              <Form.Control
                type="text"
                value={selectedEmployee.submitted}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={handleReject}
            disabled={!remarks}
          >
            Reject
          </Button>
          <Button
            variant="success"
            onClick={handleApprove}
            disabled={!remarks}
          >
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Approval;

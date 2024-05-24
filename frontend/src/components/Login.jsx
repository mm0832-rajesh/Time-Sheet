import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [inpData, setInpData] = useState({
    id: "",
    password: "",
  });
  const [managerData, setManagerData] = useState([]);

  const [employeeData, setEmployeeData] = useState([]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const manager = managerData.find(
      (mgr) => inpData.id === mgr.mgrId && inpData.password === mgr.mgrPassword
    );
    const employee = employeeData.find(
      (emp) => inpData.id === emp.empId && inpData.password === emp.empPassword
    );

    if (manager) {
      navigate("/manager", { state: { manager } });
    } else if (employee) {
      navigate("/employee", { state: { employee } });
    } else {
      alert("Wrong Password or UserId");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch("http://localhost:8000/manager");
        let mgrData = await response.json();
        setManagerData(mgrData);
      } catch (error) {
        console.warn("Something went wrong: " + error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch("http://localhost:8000/employee");
        let empData = await response.json();
        setEmployeeData(empData);
      } catch (error) {
        console.warn("Something went wrong: " + error);
      }
    };
    getData();
  }, []);

  return (
    <div className="form-container">
      <form className="loginform" onSubmit={submitHandler}>
        <input
          type="text"
          name="id"
          id="id"
          placeholder="Enter user-id"
          required
          onChange={changeHandler}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          required
          onChange={changeHandler}
        />
        <br />
        <br />
        <button className="submitBtn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

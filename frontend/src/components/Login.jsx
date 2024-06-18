import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import { useSnackbar } from "notistack";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [inpData, setInpData] = useState({
    id: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
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

    // Check if the input data matches any employee's credentials
    const employee = employeeData.find(
      (emp) => inpData.id === emp.empId && inpData.password === emp.empPassword
    );

    if (employee) {
        navigate("/employee", { state: { employee } });
    } else {
      enqueueSnackbar("Wrong Login ID or Password", { variant: "error" });
    }
  };

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
    <div className="container">
      <div className="logo">
        <img
          src="https://maventic.com/wp-content/uploads/2022/images/home/maventic-logo.png"
          alt="Company Logo"
        />
      </div>
      <div className="child-container">
        <div className="child-para">
          <p className="main">Welcome!</p>
          <p className="secondary">
            to <span className="mavenSpan">Maventic</span> Timesheet Portal
          </p>
        </div>
        <div className="login-form child">
          <div className="greeting">Hello there! 👋</div>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="loginId">Login ID</label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="Employee Number"
                value={inpData.id}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={isVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={inpData.password}
                onChange={changeHandler}
                required
              />
              <div
                onClick={() => setIsVisible(!isVisible)}
                className="loginicon"
              >
                {isVisible ? <EyeInvisibleFilled /> : <EyeFilled />}
              </div>
            </div>
            <div className="forgot-password">
              <p>Forgot password?</p>
            </div>
            <button className="loginSCreenBtn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

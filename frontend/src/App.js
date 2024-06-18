import "./App.css";
import EmployeeScreen from "./components/EmployeeScreen";
import HolidayScreen from "./components/HolidayScreen";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <ManagerScreen/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee" element={<EmployeeScreen />} />
          <Route path="/holiday" element={<HolidayScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

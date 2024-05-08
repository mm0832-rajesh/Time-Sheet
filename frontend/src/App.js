import "./App.css";
import EmployeeScreen from "./components/EmployeeScreen";
import Login from "./components/Login";
import ManagerScreen from "./components/ManagerScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <ManagerScreen/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/manager" element={<ManagerScreen />} />
          <Route path="/employee" element={<EmployeeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

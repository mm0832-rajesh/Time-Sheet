import React, { useEffect, useState } from "react";
import "./status.css";
import Progressbar from "./Progressbar";
const Status = ({ statusObj }) => {
  const [empObject, setEmpObject] = useState({});
  const [approverName, setApproverName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [overAllStatus, setOverAllStatus] = useState("");

  useEffect(() => {
    if (!statusObj || Object.keys(statusObj).length === 0) return;

    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employee`);
        const res = await response.json();
        const empData = res.find((item) => item.empId === statusObj.currentApproverId);
        const approverData= res.find((item)=>item.empId===statusObj.approverId)
        console.log(empData);
        console.log(statusObj);
        if (empData) {
          setEmpObject(empData);
        }
        if(statusObj.overallStatus!=='submitted' && statusObj.approverStatus!=='approved' && statusObj.lineManStatus!=="approved"){
          setApproverName("");
        }
        else if (statusObj.overallStatus === 'submitted' && statusObj.approverStatus === 'approved') {
          setOverAllStatus("Partially Approved");
          setRemarks(statusObj.approverRemarks);
          setApproverName(approverData.empName);
        } else if (statusObj.overallStatus === 'rejected') {
          setOverAllStatus("Rejected");
          setRemarks(statusObj.lineManRemarks || statusObj.approverRemarks);
          setApproverName(empData.empName);
        } else if (statusObj.overallStatus === 'approved') {
          setOverAllStatus("Approved");
          setRemarks(statusObj.lineManRemarks);
          console.log(empData);
          setApproverName(empData.empName);
        } else {
          setOverAllStatus("Submitted");
        }
      } catch (error) {
        console.warn("Something went wrong: " + error);
      }
    };

    getData();
  }, [statusObj]);

  if (!statusObj || Object.keys(statusObj).length === 0) {
    return( <div className="status">
    <h2 style={{'color':'#888686', 'display':'flex', 'alignItems':'center', 'padding-left':'20%'}}>No task selected</h2>
    </div>
  )}

  return (
    <div className="status">
      <div className="statusContainer">
        {statusObj.taskName && (
          <div className="inputField">
            <h2 style={{ textDecoration: 'underline', 'fontSize':'18px', 'fontWeight':'bold', 'padding-left':'30%'}}>
              {`Status for ${statusObj.taskName}`}
            </h2>
          </div>
        )}
        <div className="inputField">
          {/* <label>Overall Status:</label> */}
          {/* <input type="text" value={overAllStatus} disabled /> */}
          <Progressbar {...statusObj}/>
        </div>
        <div className="inputField">
          <label>Approver Name:</label>
          <input type="text" value={approverName} disabled />
        </div>
        <div className="inputField">
          <label>Approver Remark:</label>
          <input type="text" value={remarks} disabled />
        </div>
      </div>
    </div>
  );
};

export default Status;

package com.example.backend.task.impl;

import java.util.List;
import java.util.Map;
// import java.util.Optional;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.employee.Employee;
import com.example.backend.employee.impl.EmployeeServiceImpl;
import com.example.backend.task.Task;
import com.example.backend.task.TaskRepo;
import com.example.backend.task.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private EmployeeServiceImpl employeeImpl;

    @Override
    public boolean createTask(Task task) {
      if(task!=null){
        taskRepo.save(task);
        return true;
      }
      return false;
       
    }

    @Override
    public boolean updateTask(Task updateTask, Long taskId) {
        Task task = taskRepo.findById(taskId).orElse(null);
        // System.out.println("Task is :- "+task);
        if (task != null) {
            // Task task = optionalTask.get();
            task.setTaskName(updateTask.getTaskName());
            task.setStartDate(updateTask.getStartDate());
            task.setEndDate(updateTask.getEndDate());
            task.setPlanedHour(updateTask.getPlanedHour());
            task.setBillableHour(updateTask.getBillableHour());
            task.setAssignerId(updateTask.getAssignerId());
            task.setApproverId(updateTask.getApproverId());
            task.setCurrentApproverId(updateTask.getCurrentApproverId());
            task.setApproverStatus(updateTask.getApproverStatus());
            task.setApproverRemarks(updateTask.getApproverRemarks());
            task.setLineManRemarks(updateTask.getLineManRemarks());
            task.setLineManStatus(updateTask.getLineManStatus());
            task.setOverallStatus(updateTask.getOverallStatus());
            task.setEmpStatus(updateTask.getEmpStatus());
            task.setEmployeeId(updateTask.getEmployeeId());
            task.setEmployeeName(updateTask.getEmployeeName());
            taskRepo.save(task);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteTask(String employeeId) {
        return taskRepo.deleteByEmployeeId(employeeId);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    @Override
    public boolean updateTaskByEmpId(Task updateTask, String employeeId) {
        Task task = taskRepo.findByEmployeeId(employeeId);
        // System.out.println("Task is :- "+task);
        if (task != null) {
            // Task task = optionalTask.get();
            task.setTaskName(updateTask.getTaskName());
            task.setStartDate(updateTask.getStartDate());
            task.setEndDate(updateTask.getEndDate());
            task.setPlanedHour(updateTask.getPlanedHour());
            task.setBillableHour(updateTask.getBillableHour());
            task.setAssignerId(updateTask.getAssignerId());
            task.setApproverId(updateTask.getApproverId());
            task.setCurrentApproverId(updateTask.getCurrentApproverId());
            task.setApproverStatus(updateTask.getApproverStatus());
            task.setApproverRemarks(updateTask.getApproverRemarks());
            task.setLineManRemarks(updateTask.getLineManRemarks());
            task.setLineManStatus(updateTask.getLineManStatus());
            task.setOverallStatus(updateTask.getOverallStatus());
            // task.setEmployeeId(updateTask.getEmployeeId());
            taskRepo.save(task);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Task getTaskByTaskId(Long taskId) {
        return taskRepo.findById(taskId).orElse(null);
    }

    @Override
   public boolean updateTaskStatus( Map<String, Object> updates, Long taskId) {
        String approverId= (String)updates.get("approverId");
        Optional<Task> taskOptional = taskRepo.findById(taskId);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            String empId= task.getEmployeeId();
            String assignedApproverId= task.getApproverId();
            Employee employee = employeeImpl.getEmployeeById(empId);
            String lineManagerId= employee.getLineManager();

            if(approverId.equals(lineManagerId)){           
             task.setOverallStatus((String)updates.get("status"));
             task.setLineManRemarks((String)updates.get("remarks"));
             //task.setApproverRemarks((String)updates.get("remarks"));
             //task.setApproverStatus((String)updates.get("status"));
             task.setLineManStatus((String)updates.get("status"));
             if(updates.get("status").equals("approved")){
             task.setCurrentApproverId(null);
             }
            else if(updates.get("status").equals("rejected")){
                    task.setCurrentApproverId(assignedApproverId);
                }
            taskRepo.save(task);
            }
            else{
                task.setApproverRemarks((String)updates.get("remarks"));
                task.setApproverStatus((String)updates.get("status"));
                if(updates.get("status").equals("approved")){
                task.setCurrentApproverId(lineManagerId);
                task.setOverallStatus("submitted");
                }
                else{
                    task.setOverallStatus("rejected");
                }
                taskRepo.save(task);
            }
            return true;
            
        } else {
            return false;
        }
    }

}

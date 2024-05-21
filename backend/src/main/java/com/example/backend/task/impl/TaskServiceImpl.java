package com.example.backend.task.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.employee.Employee;
import com.example.backend.employee.EmployeeRepo;
import com.example.backend.employee.impl.EmployeeServiceImpl;
import com.example.backend.manager.Manager;
import com.example.backend.manager.ManagerRepo;
import com.example.backend.manager.impl.ManagerServiceImpl;
import com.example.backend.task.Task;
import com.example.backend.task.TaskRepo;
import com.example.backend.task.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepo taskRepo;

    // @Autowired
    // private EmployeeRepo employeeRepo;

    // @Autowired
    // private EmployeeServiceImpl employeeServiceImpl;

    @Autowired
    private ManagerRepo managerRepo;

    @Autowired
    private ManagerServiceImpl managerServiceImpl;

    @Override
    public boolean createTask(Task task) {
        Manager manager1 = managerRepo.findById("mm0834").orElse(null);
        if (manager1 != null) {
            task.setManager(manager1);
            taskRepo.save(task);
            return true;
        } else {
            return false; // Manager not found, task creation failed
        }
    }

    @Override
    public boolean updateTask(Task updateTask, String employeeId) {
        Task task = taskRepo.findByEmployeeId(employeeId);
        // System.out.println("Task is :- "+task);
        if (task != null) {
            // Task task = optionalTask.get();
            task.setTaskName(updateTask.getTaskName());
            task.setStartDate(updateTask.getStartDate());
            task.setEndDate(updateTask.getEndDate());
            task.setPlanedHour(updateTask.getPlanedHour());
            task.setBillableHour(updateTask.getBillableHour());
            task.setEmployeeName(updateTask.getEmployeeName());
            // task.setEmployeeId(updateTask.getEmployeeId());
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

}

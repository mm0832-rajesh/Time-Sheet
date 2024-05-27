package com.example.backend.timesheet.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.task.Task;
import com.example.backend.task.TaskRepo;
import com.example.backend.task.impl.TaskServiceImpl;
import com.example.backend.timesheet.Timesheet;
import com.example.backend.timesheet.TimesheetRepo;
import com.example.backend.timesheet.TimesheetService;

@Service
public class TimesheetServiceImpl implements TimesheetService {

    @Autowired
    private TimesheetRepo timesheetRepo;

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private TaskServiceImpl taskServiceImpl;

    // @Override
    // public boolean addTimesheet(Timesheet timesheet) {
    //     if (timesheet != null && timesheet.getTask() != null) {
    //         Long taskId = timesheet.getTask().getTaskId();
    //         Task task = taskRepo.findById(taskId).orElse(null);
    //         if (task != null) {
    //             timesheet.setTask(task);
    //             timesheetRepo.save(timesheet);
    //             return true;
    //         } else {
    //             System.out.println("Task not found for the provided taskId: " + taskId);
    //         }
    //     }
    //     return false;
    // }

    public boolean addTimesheets(List<Timesheet> timesheets) {
        boolean allSaved = true;
    
        for (Timesheet timesheet : timesheets) {
            if (timesheet != null && timesheet.getTask() != null) {
                Long taskId = timesheet.getTask().getTaskId();
                Task task = taskRepo.findById(taskId).orElse(null);
                if (task != null) {
                    timesheet.setTask(task);
                    timesheetRepo.save(timesheet);
                } else {
                    System.out.println("Task not found for the provided taskId: " + taskId);
                    allSaved = false;
                }
            } else {
                allSaved = false;
            }
        }
    
        return allSaved;
    }

    @Override
    public List<Timesheet> getAllTimesheets() {
        return timesheetRepo.findAll();
    }

    @Override
    public boolean updateTimesheet(Timesheet updateTimesheet, Long id) {
        Timesheet timesheet = timesheetRepo.findById(id).orElse(null);
        // System.out.println("Task is :- "+task);
        if (timesheet != null) {
            timesheet.setInputHour(updateTimesheet.getInputHour());
            timesheetRepo.save(timesheet);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<Timesheet> getTimeSheetByEmpId(String employeeId) {
        return timesheetRepo.findTimesheetByEmployeeId(employeeId);
    }

}

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

    @Override
    public boolean addTimesheet(Timesheet timesheet) {
        if (timesheet != null) {
            // Fetch the Task using the employeeId from the timesheet object
            Task task = taskRepo.findByEmployeeId(timesheet.getEmployeeId());
            if (task != null) {
                // Set the Task in the Timesheet object
                timesheet.setTask(task);
                // Save the Timesheet object
                timesheetRepo.save(timesheet);
                return true;
            } else {
                System.err.println("Task for employee ID " + timesheet.getEmployeeId() + " not found.");
            }
        }
        return false;
    }

    @Override
    public List<Timesheet> getAllTimesheets() {
        return timesheetRepo.findAll();
    }

    @Override
    public boolean updateTimesheetByEmpId(Timesheet updateTimesheet, String employeeId) {
        Timesheet timesheet = timesheetRepo.findByEmployeeId(employeeId);
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

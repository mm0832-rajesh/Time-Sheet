package com.example.backend.timesheet.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.timesheet.Timesheet;
import com.example.backend.timesheet.TimesheetRepo;
import com.example.backend.timesheet.TimesheetService;

@Service
public class TimesheetServiceImpl implements TimesheetService {

    @Autowired
    private TimesheetRepo timesheetRepo;

    @Override
    public boolean addTimesheet(Timesheet timesheet) {
        if (timesheet != null) {
            timesheetRepo.save(timesheet);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<Timesheet> getAllTimesheets() {
        return timesheetRepo.findAll();
    }

}

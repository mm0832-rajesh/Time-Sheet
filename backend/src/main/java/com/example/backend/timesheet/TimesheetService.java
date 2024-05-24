package com.example.backend.timesheet;

import java.util.List;

public interface TimesheetService {
    boolean addTimesheet(Timesheet timesheet);

    List<Timesheet> getAllTimesheets();

    boolean updateTimesheetByEmpId(Timesheet updateTimesheet, String employeeId);

    List<Timesheet> getTimeSheetByEmpId(String employeeId);
}

package com.example.backend.timesheet;

import java.util.List;

public interface TimesheetService {
    boolean addTimesheets(List<Timesheet> timesheets);

    List<Timesheet> getAllTimesheets();

    // boolean updateTimesheetByEmpId(Timesheet updateTimesheet, String employeeId);
    boolean updateTimesheet(Timesheet updateTimesheet, Long id);

    List<Timesheet> getTimeSheetByEmpId(String employeeId);
}

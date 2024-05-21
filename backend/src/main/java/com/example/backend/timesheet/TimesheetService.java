package com.example.backend.timesheet;

import java.util.List;

public interface TimesheetService {
    boolean addTimesheet(Timesheet timesheet);

    List<Timesheet> getAllTimesheets();
}

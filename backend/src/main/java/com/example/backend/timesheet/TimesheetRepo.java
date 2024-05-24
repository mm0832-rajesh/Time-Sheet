package com.example.backend.timesheet;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
// import java.util.List;


public interface TimesheetRepo extends JpaRepository<Timesheet, Long> {
    Timesheet  findByEmployeeId(String employeeId);
    
    List<Timesheet> findTimesheetByEmployeeId(String employeeId);
}

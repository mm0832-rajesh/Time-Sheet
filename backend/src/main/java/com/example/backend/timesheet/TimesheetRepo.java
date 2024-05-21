package com.example.backend.timesheet;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TimesheetRepo extends JpaRepository<Timesheet, Long> {

}

package com.example.backend.timesheet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.timesheet.impl.TimesheetServiceImpl;

@CrossOrigin
@Controller
@RequestMapping("/timesheet")
public class TimesheetController {

    @Autowired
    private TimesheetServiceImpl timesheetServiceImpl;

    @PostMapping
    public ResponseEntity<String> addTimesheet(@RequestBody Timesheet timesheet) {
        if (timesheetServiceImpl.addTimesheet(timesheet)) {
            return new ResponseEntity<>("Timesheet added", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Timesheet not added", HttpStatus.NOT_IMPLEMENTED);
        }
    }

    @GetMapping
    public ResponseEntity<List<Timesheet>> getAllTimesheets() {
        if (timesheetServiceImpl.getAllTimesheets().size() != 0) {
            return new ResponseEntity<>(timesheetServiceImpl.getAllTimesheets(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(timesheetServiceImpl.getAllTimesheets(), HttpStatus.NOT_FOUND);
        }
    }
}

package com.example.backend.employee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.employee.impl.EmployeeServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServiceImpl employeeServiceImpl;

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        if (employeeServiceImpl.getAllEmployees().size() != 0) {
            return new ResponseEntity<>(employeeServiceImpl.getAllEmployees(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(employeeServiceImpl.getAllEmployees(), HttpStatus.NOT_FOUND);
        }
    }

}

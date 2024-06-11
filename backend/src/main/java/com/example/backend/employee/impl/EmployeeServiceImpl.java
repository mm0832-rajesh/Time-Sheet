package com.example.backend.employee.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.employee.Employee;
import com.example.backend.employee.EmployeeRepo;
import com.example.backend.employee.EmployeeService;

import jakarta.annotation.PostConstruct;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @PostConstruct
    public void init() {

        // Hardcoded employee data
        Employee employee1 = new Employee();
        employee1.setEmpId("mm0832");
        employee1.setEmpName("Rajesh");
        employee1.setEmpPassword("123");
        employee1.setCasualLeave(2);
        employee1.setSickLeave(3);
        employee1.setRole("Developer");
        employee1.setLineManager("mm0123");

        Employee employee2 = new Employee();
        employee2.setEmpId("mm0833");
        employee2.setEmpName("Basu");
        employee2.setEmpPassword("123");
        employee2.setCasualLeave(2);
        employee2.setSickLeave(3);
        employee2.setRole("Developer");
        employee2.setLineManager("mm0125");

        Employee employee3 = new Employee();
        employee3.setEmpId("mm0834");
        employee3.setEmpName("Chiranjib");
        employee3.setEmpPassword("123");
        employee3.setCasualLeave(2);
        employee3.setSickLeave(3);
        employee3.setRole("Lead");
        employee3.setLineManager("mm0123");

        Employee employee4 = new Employee();
        employee4.setEmpId("mm0123");
        employee4.setEmpName("Manish");
        employee4.setEmpPassword("123");
        employee4.setCasualLeave(2);
        employee4.setSickLeave(3);
        employee4.setRole("Project Manager");
        employee4.setLineManager("mm0125");

        Employee employee5 = new Employee();
        employee5.setEmpId("mm0124");
        employee5.setEmpName("Biplab");
        employee5.setEmpPassword("123");
        employee5.setCasualLeave(2);
        employee5.setSickLeave(3);
        employee5.setRole("Project Manager");
        employee5.setLineManager("mm0125");

        Employee employee6 = new Employee();
        employee6.setEmpId("mm0125");
        employee6.setEmpName("Sandeep");
        employee6.setEmpPassword("123");
        employee6.setCasualLeave(2);
        employee6.setSickLeave(3);
        employee6.setRole("Team Manager");
        employee6.setLineManager("mm0125");

        Employee employee7 = new Employee();
        employee7.setEmpId("mm0126");
        employee7.setEmpName("Roshni");
        employee7.setEmpPassword("123");
        employee7.setCasualLeave(2);
        employee7.setSickLeave(3);
        employee7.setRole("HR");
        employee7.setLineManager("mm0125");

        // Save employees
        employeeRepo.save(employee1);
        employeeRepo.save(employee2);
        employeeRepo.save(employee3);
        employeeRepo.save(employee4);
        employeeRepo.save(employee5);
        employeeRepo.save(employee6);
        employeeRepo.save(employee7);

    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }
}

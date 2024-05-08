package com.example.backend.employee.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.employee.Employee;
import com.example.backend.employee.EmployeeRepo;
import com.example.backend.employee.EmployeeService;
import com.example.backend.manager.Manager;
import com.example.backend.manager.ManagerRepo;
import com.example.backend.manager.impl.ManagerServiceImpl;

import jakarta.annotation.PostConstruct;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private ManagerRepo managerRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ManagerServiceImpl managerServiceImpl;

    @PostConstruct
    public void init() {
        // Retrieve manager from database
        Manager manager1 = managerRepo.findById("mm0834").orElse(null);

        // Hardcoded employee data
        Employee employee1 = new Employee();
        employee1.setEmpId("mm0832");
        employee1.setEmpName("Rajesh");
        employee1.setEmpPassword("123");
        employee1.setEmpLeaves(3);
        employee1.setManager(manager1);

        Employee employee2 = new Employee();
        employee2.setEmpId("mm0833");
        employee2.setEmpName("Basu");
        employee2.setEmpPassword("123");
        employee2.setEmpLeaves(5);
        employee2.setManager(manager1);

        // Save employees
        employeeRepo.save(employee1);
        employeeRepo.save(employee2);

    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }
}

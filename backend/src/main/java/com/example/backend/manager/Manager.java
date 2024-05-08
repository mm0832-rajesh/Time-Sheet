package com.example.backend.manager;

import java.util.List;

import com.example.backend.employee.Employee;
import com.example.backend.task.Task;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Manager {

    @Id
    @Column(length = 10)
    private String mgrId;

    @Column(length = 20)
    private String mgrName;

    @Column(length = 10)
    private String mgrPassword;

    @OneToMany(mappedBy = "manager")
    private List<Employee> employees;

    @OneToMany(mappedBy = "manager")
    private List<Task> tasks;
}

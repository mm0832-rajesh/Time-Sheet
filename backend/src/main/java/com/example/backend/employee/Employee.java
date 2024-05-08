package com.example.backend.employee;

import java.util.List;

import com.example.backend.manager.Manager;
import com.example.backend.task.Task;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @Column(length = 10)
    private String empId;

    @Column(length = 20)
    private String empName;

    @Column(length = 20)
    private String empPassword;

    @Column(length = 5)
    private int empLeaves;

    @JsonIgnore
    @ManyToOne
    private Manager manager;

    @OneToMany(mappedBy = "employee")
    private List<Task> tasks;
}

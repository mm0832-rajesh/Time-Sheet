package com.example.backend.task;

import com.example.backend.employee.Employee;
import com.example.backend.manager.Manager;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    @Column(length = 20)
    private String taskName;

    private String startDate;

    private String endDate;

    @Column(length = 5)
    private Long planedHour;

    @Column(length = 5)
    private Long billableHour;

    @Column(length = 20)
    private String employeeName;

    @Column(length = 10)
    private String employeeId;

    @JsonIgnore
    @ManyToOne
    private Manager manager;

    // @JsonIgnore
    // @ManyToOne
    // private Employee employee;
}

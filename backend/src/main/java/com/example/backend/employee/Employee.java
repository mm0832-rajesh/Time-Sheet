package com.example.backend.employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    private int casualLeave;

    @Column(length = 5)
    private int sickLeave;

    @Column(length = 20)
    private String role;

    @Column(length = 10)
    private String lineManager;
}

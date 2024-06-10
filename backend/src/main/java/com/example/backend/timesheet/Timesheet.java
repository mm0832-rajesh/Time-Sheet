package com.example.backend.timesheet;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
// import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

import com.example.backend.task.Task;

import jakarta.persistence.Column;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Timesheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;

    @Column(length = 2)
    private int inputHour;

    private String comments;

    @Column(length = 10)
    private String employeeId;

    // @Column(length = 5)
    // private Long taskId;

    @ManyToOne
    private Task task;
}

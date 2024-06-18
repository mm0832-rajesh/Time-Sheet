package com.example.backend.task;

import java.util.List;

// import java.util.List;

import com.example.backend.timesheet.Timesheet;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    @Column(length = 20)
    private String employeeName;

    private String startDate;

    private String endDate;

    @Column(length = 5)
    private Long planedHour;

    @Column(length = 5)
    private Long billableHour;

    @Column(length = 10)
    private String employeeId;

    @Column(length = 10)
    private String empStatus;

    @Column(length = 10)
    private String assignerId;

    @Column(length = 10)
    private String approverId;

    @Column (length = 10)
    private String currentApproverId;

    @Column(length = 40)
    private String approverStatus;

    @Column(length = 40)
    private String approverRemarks;

    @Column(length = 40)
    private String lineManStatus;

    @Column(length = 40)
    private String lineManRemarks;

    @Column(length = 40)
    private String overallStatus;

    @JsonIgnore
    @OneToMany(mappedBy = "task")
    private List<Timesheet> Timesheet;

}

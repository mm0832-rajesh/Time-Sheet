package com.example.backend.task;

import java.util.List;

// import java.util.List;

// import com.example.backend.employee.Employee;
import com.example.backend.manager.Manager;
import com.example.backend.timesheet.Timesheet;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
// import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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

    @Column(length = 10)
    private String status;

    @Column(length = 40)
    private String remarks;

    @JsonIgnore
    @ManyToOne
    private Manager manager;

    @JsonIgnore
    @OneToMany(mappedBy = "task")
    private List<Timesheet> Timesheet;

    // @JsonIgnore
    // @ManyToOne
    // private Employee employee;
}

package com.example.backend.task;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TaskRepo extends JpaRepository<Task, Long> {
   Task findByEmployeeId(String employeeId);

   boolean deleteByEmployeeId(String employeeId);
}

package com.example.backend.task;

import java.util.List;

public interface TaskService {
    boolean createTask(Task task);

    boolean updateTask(Task updateTask, String employeeId);

    boolean deleteTask(String employeeId);

    List<Task> getAllTasks();
}

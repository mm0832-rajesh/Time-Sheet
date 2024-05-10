package com.example.backend.task;

public interface TaskService {
    boolean createTask(Task task);

    boolean updateTask(Task updateTask, String employeeId);

    boolean deleteTask(String employeeId);
}

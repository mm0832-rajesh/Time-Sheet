package com.example.backend.task;

import java.util.List;
import java.util.Map;

public interface TaskService {
    boolean createTask(Task task);

    boolean updateTaskByEmpId(Task updateTask, String employeeId);

    boolean updateTask(Task updateTask, Long taskId);

    boolean deleteTask(String employeeId);

    List<Task> getAllTasks();

    Task getTaskByTaskId(Long taskId);

    boolean updateTaskStatus(Map<String, Object> updates, Long taskId);
}

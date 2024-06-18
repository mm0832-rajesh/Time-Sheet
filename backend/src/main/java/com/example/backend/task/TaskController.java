package com.example.backend.task;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.task.impl.TaskServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskServiceImpl taskServiceImpl;

    @PostMapping
    public ResponseEntity<String> addTask(@RequestBody Task task) {
        if (taskServiceImpl.createTask(task)) {
            return new ResponseEntity<>("Task added", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Task not added", HttpStatus.NOT_IMPLEMENTED);
        }
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        if (taskServiceImpl.getAllTasks().size() != 0) {
            return new ResponseEntity<>(taskServiceImpl.getAllTasks(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(taskServiceImpl.getAllTasks(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskByTaskId(@PathVariable Long taskId) {
        if (taskServiceImpl.getTaskByTaskId(taskId) != null) {
            return new ResponseEntity<>(taskServiceImpl.getTaskByTaskId(taskId), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<String> updateTask(@RequestBody Task updateTask, @PathVariable Long taskId) {
        return taskServiceImpl.updateTask(updateTask, taskId) ? new ResponseEntity<>("Task updated", HttpStatus.OK)
                : new ResponseEntity<>("Task not updated", HttpStatus.NOT_IMPLEMENTED);
    }

    @PutMapping("/employee/{employeeId}")
    public ResponseEntity<String> updateTask(@RequestBody Task updateTask, @PathVariable String employeeId) {
        return taskServiceImpl.updateTaskByEmpId(updateTask, employeeId)
                ? new ResponseEntity<>("Task updated", HttpStatus.OK)
                : new ResponseEntity<>("Task not updated", HttpStatus.NOT_IMPLEMENTED);
    }

    @PatchMapping("/taskUpdate/{taskId}")
    public ResponseEntity<String> updateTaskStatus(@RequestBody Map<String, Object> updates, @PathVariable Long taskId) {
        return taskServiceImpl.updateTaskStatus(updates, taskId) ? new ResponseEntity<>("Task updated", HttpStatus.OK)
                : new ResponseEntity<>("Task updation failed", HttpStatus.NOT_IMPLEMENTED);
    }

}

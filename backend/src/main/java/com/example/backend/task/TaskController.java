package com.example.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

    @PutMapping("/{employeeId}")
    public ResponseEntity<String> updateTask(@RequestBody Task updateTask, @PathVariable String employeeId) {
        return taskServiceImpl.updateTask(updateTask, employeeId) ? new ResponseEntity<>("Task updated", HttpStatus.OK)
                : new ResponseEntity<>("Task updated", HttpStatus.NOT_IMPLEMENTED);
    }
}

package com.example.backend.task;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.task.impl.TaskServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/task")
public class TaskController {

    private TaskServiceImpl taskServiceImpl;
}

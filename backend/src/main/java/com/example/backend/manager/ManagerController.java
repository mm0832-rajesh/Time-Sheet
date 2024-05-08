package com.example.backend.manager;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.manager.impl.ManagerServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private ManagerServiceImpl managerServiceImpl;

    @GetMapping
    public ResponseEntity<List<Manager>> getAllManagers() {
        if (managerServiceImpl.getAllManagers().size() != 0) {
            return new ResponseEntity<>(managerServiceImpl.getAllManagers(), HttpStatus.FOUND);
        } else {
            return new ResponseEntity<>(managerServiceImpl.getAllManagers(), HttpStatus.NOT_FOUND);
        }
    }
}

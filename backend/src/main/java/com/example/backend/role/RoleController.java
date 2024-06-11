package com.example.backend.role;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.role.impl.RoleAssignerImpl;


@CrossOrigin
@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleAssignerImpl roleAssignerImpl;

    @GetMapping("/{assigner}")
     public ResponseEntity<List<Role>> getRolesByAssigner(@PathVariable String assigner) {
        if (!roleAssignerImpl.findByAssigner(assigner).isEmpty()) {
            return new ResponseEntity<>(roleAssignerImpl.findByAssigner(assigner), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}

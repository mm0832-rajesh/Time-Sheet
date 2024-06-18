package com.example.backend.role.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.role.Role;
import com.example.backend.role.RoleRepo;
import com.example.backend.role.RoleService;

import jakarta.annotation.PostConstruct;

@Service
public class RoleAssignerImpl implements RoleService {

    @Autowired
    private RoleRepo roleRepo;

    @PostConstruct
    private void init() {
        if (roleRepo.count() == 0) {
            Role role1 = new Role();
            Role role2 = new Role();
            Role role3 = new Role();
            Role role4 = new Role();
            Role role5 = new Role();
            Role role6 = new Role();
            Role role7 = new Role();

            role1.setRole("Developer");
            role1.setAssigner("Project Manager");
            role1.setRoleId("DEV_PM");

            role2.setRole("Developer");
            role2.setAssigner("Team Manager");
            role2.setRoleId("DEV_TM");

            role3.setRole("Developer");
            role3.setAssigner("HR");
            role3.setRoleId("DEV_HR");

            role4.setRole("Lead");
            role4.setAssigner("Project Manager");
            role4.setRoleId("LEAD_PM");

            role5.setRole("Lead");
            role5.setAssigner("Team Manager");
            role5.setRoleId("LEAD_TM");

            role6.setRole("Project Manager");
            role6.setAssigner("Team Manager");
            role6.setRoleId("PM_TM");

            role7.setRole("Team Manager");
            role7.setAssigner("Team Manager");
            role7.setRoleId("TM_TM");

            roleRepo.save(role1);
            roleRepo.save(role2);
            roleRepo.save(role3);
            roleRepo.save(role4);
            roleRepo.save(role5);
            roleRepo.save(role6);
            roleRepo.save(role7);
        }
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }

}

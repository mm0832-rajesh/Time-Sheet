package com.example.backend.manager.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.manager.Manager;
import com.example.backend.manager.ManagerRepo;
import com.example.backend.manager.ManagerService;

import jakarta.annotation.PostConstruct;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired
    private ManagerRepo managerRepo;

    @PostConstruct
    public void init() {
        // Hardcoded manager data
        Manager mgr = new Manager();
        mgr.setMgrId("mm0834");
        mgr.setMgrName("Manish");
        mgr.setMgrPassword("123");

        managerRepo.save(mgr);
    }

    @Override
    public List<Manager> getAllManagers() {
        return managerRepo.findAll();
    }

}

package com.example.backend.role;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.role.Role;
import com.example.backend.role.RoleRepo;

@Service
public class RoleService  {

    @Autowired
    private RoleRepo roleRepo;

    // @Override
    // public List<Role> getAllRoles() {
    //     return roleRepo.findAll();
    // }

    public List<Role> getRolesByAssigner(String assigner) {
        return roleRepo.findByAssigner(assigner);
    }
}

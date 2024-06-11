package com.example.backend.role;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, String> {
    List<Role> findByAssigner(String assigner);
}

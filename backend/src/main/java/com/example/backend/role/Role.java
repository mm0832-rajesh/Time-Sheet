package com.example.backend.role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Role {
    @Id
    @Column(length = 10)
    private String roleId;

    @Column(length = 20)
    private String role;

    @Column(length = 20)
    private String assigner;
    
}

package com.example.backend.holiday;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HolidayRepo extends JpaRepository<Holiday, Long> {
    
}

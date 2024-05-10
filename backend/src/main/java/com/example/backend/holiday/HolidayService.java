package com.example.backend.holiday;

import java.util.List;

import com.example.backend.holiday.Holiday.HolidayDate;

public interface HolidayService {
    List<HolidayDate> getAllHolidayDateByHolidayId(Long id);

    List<Holiday> getHolidayLocation();
}

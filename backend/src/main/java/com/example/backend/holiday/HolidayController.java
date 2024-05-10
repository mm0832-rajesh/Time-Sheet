package com.example.backend.holiday;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.holiday.Holiday.HolidayDate;
import com.example.backend.holiday.impl.HolidayServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/holiday")
public class HolidayController {

    @Autowired
    private HolidayServiceImpl holidayServiceImpl;

    @GetMapping
    public ResponseEntity<List<Holiday>> getHolidayLocation() {
        if (holidayServiceImpl.getHolidayLocation().size() != 0) {
            return new ResponseEntity<>(holidayServiceImpl.getHolidayLocation(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(holidayServiceImpl.getHolidayLocation(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<HolidayDate>> getAllHolidayDateByHolidayId(@PathVariable Long id) {
        if (holidayServiceImpl.getAllHolidayDateByHolidayId(id).size() != 0) {
            return new ResponseEntity<>(holidayServiceImpl.getAllHolidayDateByHolidayId(id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(holidayServiceImpl.getAllHolidayDateByHolidayId(id), HttpStatus.NOT_FOUND);
        }
    }

}

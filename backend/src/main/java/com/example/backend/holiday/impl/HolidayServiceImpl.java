package com.example.backend.holiday.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.holiday.Holiday;
import com.example.backend.holiday.HolidayRepo;
import com.example.backend.holiday.HolidayService;
import com.example.backend.holiday.Holiday.HolidayDate;

import jakarta.annotation.PostConstruct;

@Service
public class HolidayServiceImpl implements HolidayService {

    @Autowired
    private HolidayRepo holidayRepo;

    @PostConstruct
    public void init() {
        Holiday holiday1 = new Holiday();
        Holiday holiday2 = new Holiday();

        // Banglore
        HolidayDate newYear1 = new HolidayDate("Jan 1, 2024", "New Year");
        HolidayDate republicDay1 = new HolidayDate("Jan 26, 2024", "Republic Day");
        HolidayDate Ugadi1 = new HolidayDate("Apr 9, 2024", "Gudi padava/Ugadi");
        HolidayDate May1 = new HolidayDate("May 1, 2024", "May Day");
        HolidayDate bakrid1 = new HolidayDate("June 17, 2024", "Bakrid");
        HolidayDate independenceDay1 = new HolidayDate("Aug 15, 2024", "Independence Day");
        HolidayDate gandhi1 = new HolidayDate("Oct 2, 2024", "Gandhi Jayanti");
        HolidayDate diwali1 = new HolidayDate("Oct 31, 2024", "Diwali");
        HolidayDate kannada1 = new HolidayDate("Nov 1, 2024", "Kannada Rajyotshav");
        HolidayDate christmas1 = new HolidayDate("Dec 25, 2024", "Christmas Day");

        // Bhopal
        HolidayDate newYear2 = new HolidayDate("Jan 1, 2024", "New Year");
        HolidayDate republicDay2 = new HolidayDate("Jan 26, 2024", "Republic Day");
        HolidayDate holi2 = new HolidayDate("Mar 25, 2024", "Holi");
        HolidayDate edul2 = new HolidayDate("Apr 11, 2024", "Ei-ul Fitar");
        HolidayDate bakrid2 = new HolidayDate("June 17, 2024", "Bakrid");
        HolidayDate independenceDay2 = new HolidayDate("Aug 15, 2024", "Independence Day");
        HolidayDate gandhi2 = new HolidayDate("Oct 2, 2024", "Gandhi Jayanti");
        HolidayDate diwali2 = new HolidayDate("Oct 31, 2024", "Diwali");
        HolidayDate christ2 = new HolidayDate("Dec 24, 2024", "Christmas");
        HolidayDate christmas2 = new HolidayDate("Dec 25, 2024", "Christmas Day");

        holiday1.setHolidayLocation("Banglore");
        holiday1.getHolidayDates().add(newYear1);
        holiday1.getHolidayDates().add(republicDay1);
        holiday1.getHolidayDates().add(Ugadi1);
        holiday1.getHolidayDates().add(May1);
        holiday1.getHolidayDates().add(bakrid1);
        holiday1.getHolidayDates().add(independenceDay1);
        holiday1.getHolidayDates().add(gandhi1);
        holiday1.getHolidayDates().add(diwali1);
        holiday1.getHolidayDates().add(kannada1);
        holiday1.getHolidayDates().add(kannada1);
        holiday1.getHolidayDates().add(christmas1);

        holiday2.setHolidayLocation("Bhopal");
        holiday2.getHolidayDates().add(newYear2);
        holiday2.getHolidayDates().add(republicDay2);
        holiday2.getHolidayDates().add(holi2);
        holiday2.getHolidayDates().add(edul2);
        holiday2.getHolidayDates().add(bakrid2);
        holiday2.getHolidayDates().add(independenceDay2);
        holiday2.getHolidayDates().add(gandhi2);
        holiday2.getHolidayDates().add(diwali2);
        holiday2.getHolidayDates().add(christ2);
        holiday2.getHolidayDates().add(christmas2);

        holidayRepo.save(holiday1);
        holidayRepo.save(holiday2);

    }

    @Override
    public List<HolidayDate> getAllHolidayDateByHolidayId(Long id) {
        Optional<Holiday> holidayOptional = holidayRepo.findById(id);
        if (holidayOptional.isPresent()) {
            Holiday holiday = holidayOptional.get();
            return holiday.getHolidayDates();
        }
        return null;
    }

    @Override
    public List<Holiday> getHolidayLocation() {
        return holidayRepo.findAll();
    }
}

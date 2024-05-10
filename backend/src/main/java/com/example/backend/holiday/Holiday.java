package com.example.backend.holiday;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String holidayLocation;

    // private String holidayDate;

    // private String holidayName;

    @ElementCollection
    private List<HolidayDate> holidayDates = new ArrayList<>();

    @Embeddable
    public static class HolidayDate {
        private String date;
        private String name;

        public HolidayDate() {
            // Default constructor
        }

        public HolidayDate(String date, String name) {
            this.date = date;
            this.name = name;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

}

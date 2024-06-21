import React, { useEffect, useState } from "react";
import "./holidayMonth.css";

const HolidayMonth = () => {
  const [getHolidayData, setGetHolidayData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/holiday/1");
        const data = await response.json();

        const currentMonth = new Date().getMonth() + 1;
        const matchedHolidays = data.filter((holiday) => {
          const holidayDate = new Date(holiday.date);
          return holidayDate.getMonth() + 1 === currentMonth;
        });

        setGetHolidayData(matchedHolidays);
      } catch (error) {
        console.log("Error is :- ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-cont">
      <h3 className="holi-h3">Holi-Day</h3>
    <div className="holiday-currentMonth-container">
      {getHolidayData.map((item) => {
        return (
          <div className="part">
            <h6>{item.name}</h6>
            <h6>{item.date}</h6>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default HolidayMonth;

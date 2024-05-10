import React, { useState, useEffect } from "react";
import "./holidayScreen.css";

const HolidayScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState("Banglore");
  const [holidayData, setHolidayData] = useState([]);

  const [location, setLocation] = useState([]);

  const fetchData = async (location) => {
    try {
      const response = await fetch(
        `http://localhost:8000/holiday/${location === "Banglore" ? "1" : "2"}`
      );
      const data = await response.json();
      setHolidayData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/holiday");
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLocation(selectedValue);
  };

  return (
    <div className="holidayContainer">
      <div className="holidayHeader">
        <select
          name="location"
          id="location"
          onChange={handleChange}
          value={selectedLocation}
        >
          {location.map((item, index) => {
            return (
              <option value={item.holidayLocation} key={index}>
                {item.holidayLocation}
              </option>
            );
          })}
        </select>
      </div>

      <div className="holidayBody">
        {holidayData.map((item, index) => (
          <div className="holidayBodyContainer" key={index}>
            <div className="date">🗓️{item.date}</div>
            <div className="name">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayScreen;

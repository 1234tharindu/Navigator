import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Personal,
  Attendance,
  Leave,
  Income,
  Liabilities,
  Circulars,
  MobileNavBar,
} from "../components";
import api from "../api";
import dayjs from "dayjs";
import { useMediaQuery } from "@mui/material";

const sampleUserData = {
  username: "Dinuka",
  role: "admin", // user,admin
};

const Cards = [
  {
    name: "Personal",
    icon: "Personal",
    link: "person-outline",
  },
  {
    name: "Attendance",
    icon: "Attendance",
    link: "calendar-number-outline",
  },
  {
    name: "Leave",
    icon: "Leave",
    link: "log-out-outline",
  },
  {
    name: "Income",
    icon: "Income",
    link: "cash-outline",
  },
  {
    name: "Liabilities",
    icon: "Liabilities",
    link: "card-outline",
  },
  {
    name: "Circulars",
    icon: "Circulars",
    link: "git-network-outline",
  },
];

const Home = () => {
  const [showComponent, setShowComponent] = useState(null);
  const [sampleData, setSampleData] = useState([]);
  const ref = useRef();
  const [notificationConH, setNotificationConH] = useState(350);
  const isMobile = useMediaQuery("(max-width:600px)");
  const toggleVisibility = (componentName) => {
    setShowComponent(showComponent === componentName ? null : componentName);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCirculars();
      setSampleData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setNotificationConH(`${ref?.current?.offsetHeight}px`);
  }, [ref, setNotificationConH]);

  return (
    <div
      style={{ minHeight: `calc(100vh - ${isMobile ? "375px" : "315px"})` }}
      className="flex flex-col"
    >
      <div className="flex-grow">
        <div className={showComponent ? "hidden" : ""}>
          <div className="flex mt-5 mb-5 max-md:flex-col md:flex-row">
            {/* Card container */}
            <div className="md:w-[47vw] w-[96vw] max-md:ml-[2vw] md:ml-[2vw] md:mr-[1vw]">
              <div
                ref={ref}
                className="flex justify-center shadow-lg shadow-slate-400 md:justify-start bg-slate-100 max-md:rounded-3xl md:rounded-r-3xl "
              >
                <div className="md:max-w-[765px] max-w-[511px] max-md:m-5">
                  <div className="flex flex-row flex-wrap justify-center">
                    {Cards.map((card, i) => {
                      return (
                        <div
                          key={i}
                          className="m-2 "
                          onClick={() => toggleVisibility(card.name)}
                        >
                          <Card name={card.name} icon={card.link} Link="#" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {/* Notification Container */}
            <div
              style={{ height: notificationConH }}
              className="md:w-[47vw] md:ml-[1vw] w-[96vw] bg-slate-100 max-md:rounded-3xl md:rounded-l-3xl max-md:ml-[2vw] max-md:mt-3 overflow-y-scroll shadow-lg shadow-slate-400"
            >
              <div className="mr-[5%] ml-[5%] mt-6 mb-6">
                {sampleData.map((data, index) => (
                  <div
                    key={index}
                    className="w-[100%] bg-gray-200 rounded-2xl p-2 my-3 animate-fade-down animate-once shadow-sm shadow-slate-400"
                  >
                    <div>
                      <strong>
                        {data.id} - {data.title}
                      </strong>
                    </div>
                    <div>{data.description}</div>
                    <div className="text-[12px] text-gray-500">
                      {dayjs(data.date).format("DD/MM/YYYY - HH:mm")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {showComponent === "Personal" && (
          <Personal onClose={() => toggleVisibility("Personal")} />
        )}
        {showComponent === "Attendance" && (
          <Attendance onClose={() => toggleVisibility("Attendance")} />
        )}
        {showComponent === "Leave" && (
          <Leave onClose={() => toggleVisibility("Leave")} />
        )}
        {showComponent === "Income" && (
          <Income onClose={() => toggleVisibility("Income")} />
        )}
        {showComponent === "Liabilities" && (
          <Liabilities onClose={() => toggleVisibility("Liabilities")} />
        )}
        {showComponent === "Circulars" && (
          <Circulars onClose={() => toggleVisibility("Circulars")} />
        )}
      </div>
    </div>
  );
};

export default Home;
// 1

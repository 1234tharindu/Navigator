import { useEffect, useState } from "react";
import IncomeInfo from "./IncomeInfo";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import api from "../../api";

const Income = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [incomeData, setIncomeData] = useState({
    deductionData: null,
    earningData: null,
  });

  const handleYearMonthChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      const month = dayjs(selectedDate).format("MM");
      const year = dayjs(selectedDate).format("YYYY");
      const data = await api.getIncome({ year, month });
      setIncomeData(data);
    };
    fetchData();
  }, [selectedDate]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col w-full pb-5 m-5 text-lg bg-slate-100 max-md:text-sm">
          <div className="m-2 ml-auto text-3xl rounded-full bg-slate-100 hover:bg-slate-200">
            <button
              onClick={onClose}
              className="flex items-center justify-end m-2"
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center animate-fade-up animate-once">
            {/* Calendar view */}
            <div className="m-5">
              {/* <Calendar
                value={selectedDate}
                view="year"
                onClickMonth={handleYearMonthChange}
                onClickYear={handleYearMonthChange}
              /> */}
              <DateCalendar
                value={selectedDate}
                onChange={handleYearMonthChange}
                views={["month", "year"]}
                openTo="month"
              />
            </div>

            {/* Selected Year and Month */}
            <div className="m-5">
              <h2>
                Selected Year and Month :{" "}
                {selectedDate ? (
                  <span className="font-medium">
                    {dayjs(selectedDate).format("MMMM YYYY")}
                  </span>
                ) : (
                  "None"
                )}
              </h2>
            </div>
          </div>
          {selectedDate ? (
            <>
              <IncomeInfo data={incomeData} />
            </>
          ) : (
            <div className="flex items-center justify-center animate-fade-up animate-once">
              Select Month to view Information
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;

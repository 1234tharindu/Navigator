import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import api from "../../api";

const leaves = [
  { Type: "Medical Leave", Total: "21" },
  { Type: "Casual Leave", Total: "21" },
  { Type: "Annual Leave", Total: "7" },
];

const Attendance = ({ onClose }) => {
  const [leavesData, setLeavesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState("calendar");

  const handleClickDate = (date) => {
    setSelectedDate(date);
  };

  const getInTimeOutTime = (date) => {
    const matchingData = leavesData.find((data) =>
      dayjs(data.Date).isSame(date)
    );
    if (matchingData) {
      return (
        <div className="flex flex-row ">
          <strong>{dayjs(matchingData.Date).format("MM/DD/YYYY")} :</strong>
          <div className="ml-5">{matchingData.Type}</div>
        </div>
      );
    }
    return null;
  };

  const consumedLeaves = leavesData.reduce((acc, entry) => {
    if (!acc[entry.Type]) {
      acc[entry.Type] = 0;
    }
    acc[entry.Type]++;
    return acc;
  }, {});

  const availableLeaves = leaves.map((leave) => {
    const consumed = consumedLeaves[leave.Type] || 0;
    return {
      ...leave,
      Consumed: consumed,
      Available: leave.Total - consumed,
    };
  });

  const toggleView = (newView) => {
    setView(newView);
  };

  function ServerDay(props) {
    const { day, outsideCurrentMonth, ...other } = props;
    const isSelected =
      !props.outsideCurrentMonth &&
      leavesData.some((data) => dayjs(day).isSame(dayjs(data.Date)));

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        sx={{
          background: isSelected ? "cyan" : "transparent",
          borderRadius: "50%",
          width: isSelected ? "30px" : "36px",
          height: isSelected ? "30px" : "36px",
          m: isSelected ? "0 3px" : "0",
          button: { height: "30px" },
        }}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          className={isSelected ? "selected-day" : ""}
          day={day}
        />
      </Badge>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getLeaves();
      setLeavesData(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full pb-5 m-5 text-lg bg-slate-100 max-md:text-sm ">
        <div className="m-2 ml-auto text-3xl rounded-full bg-slate-100 hover:bg-slate-200">
          <button
            onClick={onClose}
            className="flex items-center justify-end m-2"
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <div className="flex flex-row items-center justify-center m-5">
          <button
            className={`md:w-[130px] max-md:w-[100px] py-1 ${
              view === "calendar"
                ? "bg-primary2 "
                : " bg-primary1 hover:bg-slate-300"
            } text-white rounded-l-full drop-shadow-lg `}
            onClick={() => toggleView("calendar")}
          >
            <span className="flex items-center justify-center ">
              Calendar View
            </span>
          </button>

          <button
            className={`md:w-[130px] max-md:w-[100px] py-1 ${
              view === "list"
                ? "bg-primary2 "
                : " bg-primary1 hover:bg-slate-300"
            } text-white rounded-r-full drop-shadow-lg `}
            onClick={() => toggleView("list")}
          >
            <span className="flex items-center justify-center ">List View</span>
          </button>
        </div>

        {view === "calendar" && (
          <div className="flex md:flex-row max-md:flex-col animate-fade-up animate-once">
            {/* Calendar view */}
            <div
              className="md:w-[45vw] md:mr-[1vw] md:ml-[2vw] max-md:m-5 max-md:mb-0"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DateCalendar
                value={selectedDate}
                onChange={handleClickDate}
                slots={{
                  day: ServerDay,
                }}
                sx={{
                  "& .selected-day.Mui-selected": {
                    m: "0 -1px !important",
                  },
                  "& .MuiPickersDay-today": {
                    border: "none !important",
                  },
                }}
              />
            </div>
            {/* Data */}
            <div className="md:w-[45vw] md:ml-[1vw] md:mr-[2vw] max-md:m-5 h-24">
              {selectedDate ? (
                <div>{getInTimeOutTime(selectedDate)}</div>
              ) : (
                "Select a date to view in-time and out-time"
              )}
            </div>
          </div>
        )}
        {/* Calendar view end*/}

        {/* List view */}
        {view === "list" && (
          <div className="ml-4 mr-4 max-md:text-sm animate-fade-up animate-once">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ccc" }}>
                  <th
                    style={{ textAlign: "left", padding: "8px", width: "25%" }}
                  >
                    Leave Type
                  </th>
                  <th
                    style={{ textAlign: "left", padding: "8px", width: "25%" }}
                  >
                    Total
                  </th>
                  <th
                    style={{ textAlign: "left", padding: "8px", width: "25%" }}
                  >
                    Consumed
                  </th>
                  <th
                    style={{ textAlign: "left", padding: "8px", width: "25%" }}
                  >
                    Available
                  </th>
                </tr>
              </thead>
              <tbody>
                {availableLeaves.map((leave, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                    <td style={{ padding: "8px", width: "25%" }}>
                      {leave.Type}
                    </td>
                    <td style={{ padding: "8px", width: "25%" }}>
                      {leave.Total}
                    </td>
                    <td style={{ padding: "8px", width: "25%" }}>
                      {leave.Consumed}
                    </td>
                    <td style={{ padding: "8px", width: "25%" }}>
                      {leave.Available}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* List view end*/}
      </div>
    </div>
  );
};

export default Attendance;

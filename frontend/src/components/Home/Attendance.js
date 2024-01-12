import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TablePagination from "@mui/material/TablePagination";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import api from "../../api";

const Attendance = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [view, setView] = useState("calendar");

  const handleClickDate = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getAttendance();
      setAttendance(data.data);
    };
    fetchData();
  }, []);

  const getInTimeOutTime = (date) => {
    const matchingData = attendance.find((attendance) =>
      dayjs(attendance.Date).isSame(date)
    );
    if (matchingData) {
      return (
        <div className="flex flex-row ">
          <strong>{dayjs(matchingData.Date).format("MM/DD/YYYY")} :</strong>
          <div className="ml-5">
            In Time: {dayjs(matchingData.InTime).format("hh:mm A")}
            <br />
            Out Time: {dayjs(matchingData.OutTime).format("hh:mm A")}
          </div>
        </div>
      );
    }
    return null;
  };

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = attendance.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = attendance.slice(startIndex, endIndex);

  const toggleView = (newView) => {
    setView(newView);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  function ServerDay(props) {
    const { day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlighteddays.some((highlightedDay) =>
        dayjs(day).isSame(dayjs(highlightedDay), "day")
      );

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

  const highlighteddays = attendance.map(
    (attendance) => new Date(attendance.Date)
  );

  return (
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
                slotProps={{
                  day: {
                    highlighteddays,
                  },
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
                  <th style={{ textAlign: "left", padding: "8px" }}>Date</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>In Time</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>
                    Out Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((attendance, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                    <td style={{ padding: "8px" }}>
                      {dayjs(attendance.Date).format("DD/MM/YYYY")}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {dayjs(attendance.InTime).format("hh:mm A")}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {dayjs(attendance.OutTime).format("hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center mt-2">
              <TablePagination
                component="div"
                count={totalItems}
                page={currentPage - 1}
                onPageChange={handleChangePage}
                rowsPerPage={itemsPerPage}
                rowsPerPageOptions={[itemsPerPage]}
              />
            </div>
          </div>
        )}

        {/* List view end*/}
      </div>
    </div>
  );
};

export default Attendance;

import React, { useEffect, useState } from "react";
import { CircularsFilter } from "..";
import TablePagination from "@mui/material/TablePagination";
import api from "../../api";
import dayjs from "dayjs";

// const sampleData = [
//   {
//     number: "1103",
//     Title: "Festival",
//     discription: "Festival Advance",
//     date: "10/30/2023",
//     Time: "8:15",
//   },
//   {
//     number: "1123",
//     Title: "Festival",
//     discription: "Festival Advance",
//     date: "11/1/2023",
//     Time: "8:15",
//   },
//   {
//     number: "1103",
//     Title: "Festival",
//     discription: "Festival Advance",
//     date: "11/3/2023",
//     Time: "16:15",
//   },
//   {
//     number: "11203",
//     Title: "Festival",
//     discription: "Festival Advance",
//     date: "11/9/2023",
//     Time: "8:15",
//   },
//   {
//     number: "11103",
//     Title: "Festival",
//     discription: "Festival Advance",
//     date: "11/11/2023",
//     Time: "8:15",
//   },
//   {
//     number: "111033",
//     Title: "Festival",
//     discription: "Festival Advance",
//     date: "11/15/2023",
//     Time: "8:15",
//   },
// ].sort((item2, item1) => new Date(item1.date) - new Date(item2.date));

const Circulars = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [sampleData, setSampleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCirculars();
      setFilteredData(data);
      setSampleData(data);
    };
    fetchData();
  }, []);

  function filterDataByDate() {
    if (!startDate || !endDate) {
      setFilteredData(sampleData);
    } else {
      const filtered = sampleData.filter((data) => {
        const dataDate = new Date(data.date);
        return dataDate >= new Date(startDate) && dataDate <= new Date(endDate);
      });
      setFilteredData(filtered);
    }
  }

  function resetFilter() {
    setFilteredData(sampleData);
  }

  // Pagination
  const itemsPerPage = 5;
  const totalItems = filteredData.length;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

          <button
            onClick={() => setShowFilter(true)}
            className="ml-[8%] hover:bg-slate-600 flex items-center justify-center w-10 h-8 text-white rounded-md bg-primary1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              style={{ alignSelf: "center" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 0.32 0 0112 3z"
              />
            </svg>
          </button>

          {/* Circulars container */}
          {paginatedData.map((data, index) => (
            <div key={index} className="my-4 ml-[5%] mr-[5%]">
              <div className="w-[100%] h-24 p-3 bg-gray-300 rounded-lg animate-fade-up animate-once">
                <div className="flex flex-row">
                  <div>
                    <strong>{(currentPage - 1) * 5 + index + 1}.</strong>
                  </div>
                  <div className="flex flex-col ml-2">
                    <div className="flex flex-row">
                      <strong className="mb-1 mr-1">{data.id} </strong>
                      <strong>{data.title}</strong>
                    </div>
                    {data.description}
                  </div>
                </div>
              </div>
              <div className="mr-3 text-[12px] text-gray-800 text-right">
                {dayjs(data.date).format("DD/MM/YYYY - HH:mm")}
              </div>
            </div>
          ))}

          {/* Circulars container end */}

          {/* Pagination */}
          <div className="flex justify-center mt-2">
            <TablePagination
              component="div"
              count={totalItems}
              page={currentPage - 1}
              onPageChange={(event, newPage) => setCurrentPage(newPage + 1)}
              rowsPerPage={itemsPerPage}
              rowsPerPageOptions={[itemsPerPage]}
            />
          </div>
        </div>
      </div>

      {showFilter && (
        <CircularsFilter
          onClose={() => {
            setShowFilter(false);
          }}
          filterData={filterDataByDate}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          resetFilter={resetFilter}
        />
      )}
    </div>
  );
};

export default Circulars;

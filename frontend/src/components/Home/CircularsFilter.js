const CircularsFilter = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onClose,
  filterData,
  resetFilter,
}) => {
  const handleFilter = () => {
    filterData(startDate, endDate);
    onClose();
  };
  const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    resetFilter();
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-400 bg-opacity-70 ">
      <div className="p-4 bg-white rounded-lg animate-jump-in animate-once">
        <div className="flex justify-end mb-2">
          <div className="flex flex-col">
            <div className="m-2 ml-auto text-2xl rounded-full hover:bg-slate-100">
              <button
                onClick={onClose}
                className="flex items-center justify-end m-2"
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center p-4 ">
          <div className="md:w-[450px] w-[80vw] text-sm md:text">
            <div className="flex justify-between mb-1 space-x-4">
              <div className="flex-grow">
                <label className="block mb-2 text-sm font-semibold text-gray-600">
                  From Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mb-[15px] w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex-grow">
                <label className="block mb-2 text-sm font-semibold text-gray-600">
                  To Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mb-[15px] w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="flex text-xs ml-auto flex-row w-[60%] space-x-2 justify-end">
              <button
                onClick={handleResetFilter}
                className={`mb-6 px-4 py-2 bg-red-400 hover:bg-red-300 text-white rounded-[15px] focus:outline-none focus:shadow-outline w-full`}
              >
                Reset
              </button>
              <button
                onClick={handleFilter}
                className={`mb-6 px-4 py-2 bg-primary2 hover:bg-primary1 text-white rounded-[15px] focus:outline-none focus:shadow-outline w-full`}
              >
                Filter Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularsFilter;

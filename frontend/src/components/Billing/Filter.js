import React, { useState } from "react";
import Select from "react-select";

const Filter = () => {
  const [selectedRSC, setSelectedRSC] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const rscOptions = [
    { value: "rsc1", label: "RSC 1" },
    { value: "rsc2", label: "RSC 2" },
  ];

  const regionOptions = [
    { value: "region1", label: "Region 1" },
    { value: "region2", label: "Region 2" },
  ];

  const areaOptions = [
    { value: "area1", label: "Area 1" },
    { value: "area2", label: "Area 2" },
  ];

  return (
    <div className="flex justify-center p-4 ">
      <div className="md:w-[450px] w-[80vw] text-sm md:text">
        <div className="mt-6 mb-1">
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Select RSC
          </label>
          <Select
            value={selectedRSC}
            onChange={(selectedOption) => setSelectedRSC(selectedOption)}
            options={rscOptions}
          />

          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Select Region
          </label>

          <Select
            value={selectedRegion}
            onChange={(selectedOption) => setSelectedRegion(selectedOption)}
            options={regionOptions}
          />
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Select Area
          </label>
          <Select
            value={selectedArea}
            onChange={(selectedOption) => setSelectedArea(selectedOption)}
            options={areaOptions}
          />
        </div>

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
        <div className="flex flex-row">
          <button
            className={`mb-6 px-4 py-2 bg-primary2 hover.bg-primary1 text-white rounded-[15px] focus:outline-none focus:shadow-outline w-full`}
          >
            Filter Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;

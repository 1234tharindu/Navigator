import React, { useState } from "react";
import { RSC, Source, Filter, NavBar, Footer } from "../components";

const Billing = () => {
  const [selectedTab, setSelectedTab] = useState("RSC");
  const [isFilterVisible, setFilterVisible] = useState(false);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setFilterVisible(false);
  };

  const handleFilterClick = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handleFilterClose = () => {
    setFilterVisible(false);
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex-grow ">
        <div className="w-full bg-primary1">
          <div className="md:h-[40px] h-[70px]"></div>
          <div className="h-[30px] flex justify-between">
            <div className="flex ml-[20px]">
              <div
                className={`text-center w-[100px] flex justify-center items-center cursor-pointer ${
                  selectedTab === "RSC"
                    ? "bg-primary4 text-black"
                    : "bg-primary5 text-white"
                }`}
                onClick={() => handleTabClick("RSC")}
              >
                RSC
              </div>
              <div
                className={`text-center w-[100px] flex justify-center items-center cursor-pointer ${
                  selectedTab === "Source"
                    ? "bg-primary4 text-black"
                    : "bg-primary5 text-white"
                }`}
                onClick={() => handleTabClick("Source")}
              >
                Source
              </div>
            </div>
            <div
              className={`mr-[20px] text-center w-[30px] flex justify-center items-center cursor-pointer ${
                isFilterVisible
                  ? "bg-primary4 text-black"
                  : "bg-primary5 text-white"
              }`}
              onClick={handleFilterClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 0.32 0 0112 3z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {isFilterVisible && (
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50">
              <div className="p-4 bg-white rounded shadow">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={handleFilterClose}
                    className="text-primary2 hover:text-primary5"
                  >
                    Close
                  </button>
                </div>
                <Filter />
              </div>
            </div>
          )}
          <div className="flex">
            {selectedTab === "Source" && <Source />}
            {selectedTab === "RSC" && <RSC />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;

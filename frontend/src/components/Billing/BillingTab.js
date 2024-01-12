import React, { useState } from "react";
import { RSC, Source, Filter } from "..";

const BillingTab = () => {
  const [selectedTab, setSelectedTab] = useState("RSC");
  const [isFilterVisible, setFilterVisible] = useState(false);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setFilterVisible(false);
  };

  const handleFilterClick = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div>
      <div className="bg-primary1 w-[100vw]">
        <div className="md:h-[40px] h-[70px]"></div>
        <div className="h-[30px] flex justify-between">
          <div className="flex ml-[20px]">
            <div
              className={`text-center h-[100%] w-[100px] text-white flex justify-center items-center ${
                selectedTab === "RSC"
                  ? "bg-primary4 text-black"
                  : "bg-primary5 text-white"
              }`}
              onClick={() => handleTabClick("RSC")}
              style={{ cursor: "pointer" }}
            >
              RSC
            </div>
            <div
              className={`text-center w-[100px] h-[100%] text-white flex justify-center items-center ${
                selectedTab === "Source"
                  ? "bg-primary4 text-black"
                  : "bg-primary5 text-white"
              }`}
              onClick={() => handleTabClick("Source")}
              style={{ cursor: "pointer" }}
            >
              Source
            </div>
          </div>
          <div
            className={`mr-[20px] text-center w-[30px] text-xl flex justify-center items-center ${
              isFilterVisible
                ? "bg-primary4 text-black"
                : "bg-primary5 text-white"
            }`}
            onClick={handleFilterClick}
            style={{ cursor: "pointer" }}
          >
            <ion-icon name="color-filter-outline"></ion-icon>
          </div>
        </div>
      </div>

      <div className="flex">
        {isFilterVisible && <Filter />}
        <div>
          {selectedTab === "Source" && <Source />}
          {selectedTab === "RSC" && <RSC />}
        </div>
      </div>
    </div>
  );
};

export default BillingTab;

import { useState } from "react";

const Feed = ({ userRole }) => {
  const [showHRM, setShowHRM] = useState(false);
  const [showBilling, setShowBilling] = useState(false);

  const isAdmin = userRole === "admin";

  const toggleHRM = () => {
    setShowHRM(!showHRM);
  };

  const toggleBilling = () => {
    setShowBilling(!showBilling);
  };

  return (
    <div className="flex justify-center w-full h-full mt-5 text-lg ">
      <div
        className="w-[90%]  border shadow-md flex flex-col relative overflow-y-scroll "
        style={{ height: "calc(100% - 60px)" }}
      >
        <div className="animate-fade-right animate-once">
          {/* HRM & Payroll */}
          <div className="flex flex-col">
            <div
              className="flex items-center justify-between mx-10 mt-9 hover:cursor-pointer "
              onClick={toggleHRM}
            >
              <div className="flex items-center ">
                <ion-icon name="person-outline"></ion-icon>
                <div className="mr-1"></div>HRM & Payroll
              </div>
              <div className="flex p-1 bg-gray-200 rounded-md">
                <ion-icon
                  name={showHRM ? "remove-outline" : "add-outline"}
                ></ion-icon>
              </div>
            </div>
            {showHRM && (
              <div className="ml-5 animate-fade-down animate-once">
                <div className="flex items-center justify-between mx-10 mt-4 hover:cursor-pointer ">
                  <div>page1</div>
                  <div className="flex p-1 bg-gray-200 rounded-md">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </div>
                <div className="flex items-center justify-between mx-10 mt-4 hover:cursor-pointer ">
                  <div>page2</div>
                  <div className="flex p-1 bg-gray-200 rounded-md">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Billing & Recovery */}
          <div className="flex flex-col">
            <div
              className="flex items-center justify-between mx-10 mt-9 hover:cursor-pointer "
              onClick={toggleBilling}
            >
              <div className="flex items-center">
                <ion-icon name="cash-outline"></ion-icon>
                <div className="mr-1"></div>Billing & Recovery
              </div>
              <div className="flex p-1 bg-gray-200 rounded-md">
                <ion-icon
                  name={showBilling ? "remove-outline" : "add-outline"}
                ></ion-icon>
              </div>
            </div>
            {showBilling && (
              <div className="ml-5 animate-fade-down animate-once">
                <div className="flex items-center justify-between mx-10 mt-4 hover:cursor-pointer ">
                  <div>page1</div>
                  <div className="flex p-1 bg-gray-200 rounded-md">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </div>
                <div className="flex items-center justify-between mx-10 mt-4 hover:cursor-pointer ">
                  <div>page2</div>
                  <div className="flex p-1 bg-gray-200 rounded-md">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* a */}
          <div className="flex items-center justify-between mx-10 mt-9 hover:cursor-pointer ">
            <div className="flex items-center">
              <ion-icon name="cart-outline"></ion-icon>
              <div className="mr-1"></div>Supply Chain
            </div>
            <div className="flex p-1 bg-gray-200 rounded-md">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>

          {/* a */}
          <div className="flex items-center justify-between mx-10 mt-9 hover:cursor-pointer ">
            <div className="flex items-center">
              <ion-icon name="water-outline"></ion-icon>
              <div className="mr-1"></div>Water Quality
            </div>
            <div className="flex p-1 bg-gray-200 rounded-md">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>

          {/* a */}
          <div className="flex items-center justify-between mx-10 mt-9 hover:cursor-pointer ">
            <div className="flex items-center">
              <ion-icon name="reorder-four-outline"></ion-icon>
              <div className="mr-1"></div>Circulars
            </div>
            <div className="flex p-1 bg-gray-200 rounded-md">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>

          {/* a */}
          {isAdmin && (
            <div className="flex items-center justify-between mx-10 mt-9 hover:cursor-pointer ">
              <div className="flex items-center">
                <ion-icon name="lock-open-outline"></ion-icon>
                <div className="mr-1"></div>Admin
              </div>
              <div className="flex p-1 bg-gray-200 rounded-md">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;

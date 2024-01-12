import { useState } from "react";
import { User } from "../../assets";

const Settings = ({ user, profilePicture, onLogout }) => {
  const [showUser, setShowUser] = useState(false);

  const toggleUser = () => {
    setShowUser(!showUser);
  };

  return (
    <div className="absolute bottom-0 flex justify-center w-full h-full mt-5 text-lg">
      <div
        className="w-[90%]  border shadow-md flex flex-col relative "
        style={{ height: "calc(100% - 60px)" }}
      >
        <div className="animate-fade-right animate-once">
          <img
            src={profilePicture}
            alt="user avatar"
            className="w-20 mx-10 border rounded-full mt-9 border-primary2"
          />
          {/* HRM & Payroll */}
          <div className="flex flex-col">
            <div
              className="flex items-center justify-between mx-10 hover:cursor-pointer "
              onClick={toggleUser}
            >
              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="mr-1 text-3xl font-bold">{user.name}</div>
                  <div className="text-sm text-primary2">{user.email}</div>
                </div>
              </div>
              <div className="flex p-1 bg-gray-200 rounded-md">
                <ion-icon
                  name={showUser ? "remove-outline" : "add-outline"}
                ></ion-icon>
              </div>
            </div>
            {showUser && (
              <div className="ml-5 text-base animate-fade-down animate-once">
                <div className="flex items-center justify-between mx-10 mt-4 hover:cursor-pointer ">
                  <div className="flex items-center">
                    <ion-icon name="settings-outline"></ion-icon>Manage Profile
                  </div>
                  <div className="flex p-1 bg-gray-200 rounded-md">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between mx-10 mt-4 hover:cursor-pointer "
                  onClick={onLogout}
                >
                  <div className="flex items-center">
                    <ion-icon name="log-out-outline"></ion-icon>Log out
                  </div>
                  <div className="flex p-1 bg-gray-200 rounded-md">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mx-10 mt-5 hover:cursor-pointer ">
            <div className="flex items-center">
              <ion-icon name="information-circle-outline"></ion-icon>
              <div className="mr-1"></div>About
            </div>
            <div className="flex p-1 bg-gray-200 rounded-md">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

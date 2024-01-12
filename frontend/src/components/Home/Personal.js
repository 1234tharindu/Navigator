import { useEffect, useState } from "react";
import api from "../../api";
import { User } from "../../assets";
import { useOutletContext } from "react-router-dom";
const initUser = {
  name: "",
  birthday: "",
  address: "",
  nic: "",
  email: "",
  empno: "",
  mobileno: "",
};

const Personal = ({ onClose }) => {
  const [user, setUser] = useState(initUser);
  const [setActive, setUserToken, userToken] = useOutletContext();
  const [profilePicture, setProfilePicture] = useState(User);

  const fieldDisplayLabels = {
    name: "Name",
    birthday: "Birthday",
    address: "Address",
    nicNumber: "NIC Number",
    email: "Email",
    employeeNumber: "Employee Number",
    mobile: "Mobile Number",
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getProfile();
      setUser(data?.data);
      if (userToken?.image) {
        const img = await api.getProfilePicture();
        setProfilePicture(img);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[100%] md:w-[700px] bg-slate-100 m-5 pb-5 max-md:text-sm text-lg ">
        <div className="m-2 ml-auto text-3xl rounded-full bg-slate-100 hover:bg-slate-200">
          <button
            onClick={onClose}
            className="flex items-center justify-end m-2"
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        <div className="flex flex-col items-center mt-16 animate-fade-up animate-once">
          <img
            src={profilePicture}
            alt="Profile Pic"
            className="object-cover items-center justify-center max-md:w-[100px] max-md:h-[100px] h-[180px] w-[180px] border-[3px] rounded-full border-primary1 cursor-pointer"
          />
        </div>

        {Object.entries(user).map(
          ([field, value]) =>
            field !== "imageUrl" && (
              <div
                className="flex flex-row mt-8 animate-fade-up animate-once"
                key={field}
              >
                <div className="flex flex-col w-[50%] text-right pr-3">
                  {fieldDisplayLabels[field]}
                </div>{" "}
                :
                <div
                  className="flex flex-col w-[50%] text-left pl-3"
                  style={{ overflowWrap: "break-word" }}
                >
                  {value}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Personal;

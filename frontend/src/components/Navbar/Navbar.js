import { useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import UserCard from "./UserCard";
import { MobileNavBar } from "..";

const Navbar = ({ user, active, setUser, profilePicture }) => {
  const { name, userRole } = user;
  const isAdmin = userRole === "Admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
    setUser(null);
  };

  return (
    <div>
      <div className="relative z-20 animate-fade-down animate-once">
        <div className="h-[60px] max-md:h-0 "></div>
        <div className="md:fixed md:top-0 w-full max-md:h-[80px] h-[60px] md:px-[40px] bg-primary3 max-md:justify-center items-center flex md:justify-between">
          {/* Logo */}
          <img alt="" src={logo} className="w-[250px]"></img>

          {/* Menu */}
          <div>
            <ul className="flex mx-3 space-x-6 max-[1000px]:space-x-1 max-md:hidden">
              <li
                className="p-2 border-2 border-transparent cursor-pointer hover:border-primary2 hover:shadow-md"
                onClick={() => navigate("/home")}
              >
                Home
              </li>
              <li className="relative group">
                <div className="flex items-center p-2 border-2 border-transparent cursor-pointer hover:border-primary2 hover:shadow-md">
                  Billing<ion-icon name="chevron-down-outline"></ion-icon>
                </div>
                {/* Drop-down menu for Billing */}
                <ul className="absolute left-0 hidden space-y-1 border bg-primary3 border-primary2 w-44 top-full group-hover:block animate-flip-down animate-once">
                  <li
                    className="p-2 pl-3 hover:bg-primary1 hover:text-white"
                    onClick={() => navigate("/Billing")}
                  >
                    Billing1
                  </li>
                  <li className="p-2 pl-3 hover:bg-primary1 hover:text-white">
                    Billing2
                  </li>
                  <li className="p-2 pl-3 hover:bg-primary1 hover:text-white">
                    Billing3
                  </li>
                </ul>
              </li>

              {isAdmin && (
                <li className="p-2 border-2 border-transparent cursor-pointer hover:border-primary2 hover:shadow-md">
                  Admin
                </li>
              )}
              <li className="p-2 border-2 border-transparent cursor-pointer hover:border-primary2 hover:shadow-md">
                About
              </li>
            </ul>
          </div>

          {/* Username */}
          <div className="relative group">
            <div className="flex items-center p-[6px] pr-2 cursor-pointer max-md:hidden">
              <div className="flex items-center">
                <img
                  alt=""
                  src={profilePicture}
                  className="w-[30px] mr-1 object-cover border-[1px] border-primary1 rounded-full"
                ></img>
              </div>
              <div className="flex items-center">{name}</div>
            </div>
            {/* Dropdown user */}
            <div className="absolute animate-fade-down animate-once right-[-40px] hidden w-48 space-y-1 border bg-primary3 border-primary2 top-full group-hover:block ">
              <UserCard
                name={name}
                profilePicture={profilePicture}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
      <MobileNavBar
        user={user}
        profilePicture={profilePicture}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Navbar;

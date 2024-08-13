import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import { IoIosHome, IoIosList, IoIosCard, IoIosStats, IoIosCash, IoIosLogOut } from "react-icons/io";
import { useAppContext } from "../../store/appContext/app-context";

interface SidebarProps {
  expanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded }) => {
  const width = expanded ? "w-56" : "w-16";
  const align = expanded ? "justify-start" : "justify-center";

  // Get the current location
  const location = useLocation();

  // Logic for sidebar active link
  const [activeButton, setActiveButton] = useState<string>(ROUTES.HOME);
  const navigate = useNavigate();
  const { logOut } = useAppContext();

  // Handle button click
  const handleButtonClick = (route: string) => {
    setActiveButton(route);
    localStorage.setItem("activeButton", route);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate(ROUTES.AUTH);
    } catch (e) {
      console.log("Logout error");
    }
  };

  useEffect(() => {
    const savedActiveButton = localStorage.getItem("activeButton");
    if (savedActiveButton) {
      setActiveButton(savedActiveButton);
    }
  }, []);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  return (
    <div className={`${width} flex flex-col mt-20 h-[calc(100vh-65px)] px-2 bg-gray-700 text-white fixed top-0 left-0`}>
      <div className="flex flex-col flex-auto justify-start mt-4">
        {[
          { route: ROUTES.HOME, label: "Financial Dashboard", icon: <IoIosHome /> },
          { route: ROUTES.TRANSACTIONS, label: "Transaction Management", icon: <IoIosList /> },
          { route: ROUTES.ACCOUNTS, label: "Account", icon: <IoIosCard /> },
          { route: ROUTES.REPORTING, label: "Reporting", icon: <IoIosStats /> },
          { route: ROUTES.LOANS_AND_DEBT, label: "Loans and Debt", icon: <IoIosCash /> },
        ].map(({ route, label, icon }) => (
          <Link
            key={route}
            to={route}
            className="w-full"
            onClick={() => handleButtonClick(route)}
          >
            <div className={`my-1 h-16 flex items-center ${align} ${activeButton === route ? "bg-teal-500" : "bg-transparent"} rounded p-2`}>
              <div className="text-xl">
                {icon}
              </div>
              {expanded && <span className="ml-2 text-white">{label}</span>}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center mt-4 mb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition duration-300"
        >
          <IoIosLogOut size={24} />
          {expanded && <span className="ml-2">Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

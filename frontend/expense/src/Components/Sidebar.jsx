import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useState } from "react";
import { FiSidebar } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post(`http://localhost:3000/api/v1/users/logout`, {
        withCredentials: true,
      });
      console.log("User logged out");

      // Remove token and id from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("id");

      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar
  };

  return (
    <>
      <FiSidebar
        onClick={toggleSidebar}
        className="sm:hidden p-1 h-10 w-16  text-black cursor-pointer fixed top-4 left-1 z-50 rounded-sm"
      >
        {isOpen ? "Close" : "Menu"}
      </FiSidebar>
      <div className="flex sm:block">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-indigo-950 text-white p-5 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out sm:translate-x-0`}
        >
          <h2 className="text-2xl font-bold mt-12 sm:mt-4">Sidebar</h2>
          <ul className="mt-5 space-y-2">
            <li>
              <button
                onClick={() => navigate("/")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/income")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Income
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/expense")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Expense
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/groups")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Groups
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/shared-expense")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Shared Expense
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/share")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Shares
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLogout()}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

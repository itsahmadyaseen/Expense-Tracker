/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post(`https://expense-tracker-frontend-ep66.onrender.com/api/users/logout`, {
        withCredentials: true,
      });
      console.log("User logged out");

      // Remove token and id from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");

      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div className="flex sm:block border-slate-900">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-950 text-white p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:translate-x-0 z-40`}
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
  );
};

export default Sidebar;

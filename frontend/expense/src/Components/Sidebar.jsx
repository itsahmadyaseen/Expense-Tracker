import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post(`http://localhost:3000/api/v1/users/logout`, {
        withCredentials: true,
      });
      console.log("User logged out");
      navigate("/login");
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  return (
    <div className="w-64 bg-indigo-950 text-white h-screen p-5">
      <h2 className="text-2xl font-bold">Sidebar</h2>
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
            onClick={() => handleLogout()}
            className="hover:bg-indigo-900 w-full text-left p-2 rounded"
          >
            Logout
          </button>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;

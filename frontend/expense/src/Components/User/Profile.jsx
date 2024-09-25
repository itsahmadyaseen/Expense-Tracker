import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import Sidebar from "../Sidebar";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://expense-tracker-frontend-ep66.onrender.com/api/users/profile"
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <Sidebar />;
  }

  return (
    <div className="flex sm:ml-64">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <p className="text-gray-800">{user.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import axiosInstance from "../axiosInstance.jsx";
import AddMember from "./AddMember.jsx";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // console.log('inside get groups');
        const response = await axiosInstance.get(
          "http://localhost:3000/api/v4/groups/get-groups"
        );
        // console.log('response', response.data);
        setGroups(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/v1/users/get-users"
        );
        // console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching users", error.message);
      }
    };

    fetchGroups();
    fetchUsers();
  }, []);

  const handleMemberAdded = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/v4/groups/get-groups"
      ); // Refresh the groups
      setGroups(response.data);
    } catch (err) {
      console.error("Error refreshing groups:", err.message);
    }
  };

  const handleRemoveMember = async (groupId, userId) => {
    // console.log(userId, "id");
    // console.log(groupId, "groupid");
    try {
      await axiosInstance.delete(
        `http://localhost:3000/api/v4/groups/remove-member/${groupId}`,
        { data: { userId } }
      );
      const response = await axiosInstance.get(
        "http://localhost:3000/api/v4/groups/get-groups"
      ); // refresh
      setGroups(response.data);
    } catch (error) {
      console.log("Error removing member from group", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className=" w-full p-4 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold mb-4">Groups</h1>
        <ul>
          {groups.map((group) => (
            <li key={group._id} className="mb-4 p-4 border rounded shadow">
              <h2 className="text-xl text-center font-semibold">
                {group.name}
              </h2>
              <h3 className="text-lg mt-2 font-semibold">Members:</h3>
              <ol>
                {group.members.map((member) => (
                  <div key={member._id} className="flex justify-between">
                    <li key={member._id} className="mt-1">
                      {member.username}
                    </li>
                    <button
                      onClick={() => {
                        // console.log('member',member._id);
                        handleRemoveMember(group._id, member._id);
                      }}
                      className="ml-4 p-2 bg-red-500 text-white rounded"
                    >
                      remove
                    </button>
                  </div>
                ))}
              </ol>
              <AddMember
                groupId={group._id}
                existingMembers={group.members}
                allUsers={users}
                onMemberAdded={handleMemberAdded}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Groups;

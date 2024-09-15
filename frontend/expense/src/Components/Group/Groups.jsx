import { useEffect } from "react";
import Sidebar from "../Sidebar.jsx";
import AddMember from "./AddMember.jsx";
import { useGlobalContext } from "../../Context/GlobalContext.jsx";

const Groups = () => {
  const {fetchGroups, fetchUsers, groups, users, removeMember} = useGlobalContext();

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, []);

  const handleMemberAdded = async () => {
    fetchGroups();
  };

  const handleRemoveMember = async (groupId, userId) => {
    // console.log(userId, "id");
    // console.log(groupId, "groupid");
    removeMember(groupId, userId);
  };

  return (
    <div className="flex sm:ml-64">
      <div>
        <Sidebar />
      </div>
      <div className="w-full p-4 overflow-y-auto h-screen mt-12 sm:m-0 ">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Groups</h1>
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

/* eslint-disable react/prop-types */
import {useState} from 'react'
import axiosInstance from '../axiosInstance';

const AddMember = ({groupId, existingMembers, allUsers, onMemberAdded}) => {

  const [selectedUser, setSelectedUser] = useState()

  const handleAddMember = async () => {
    try {
      await axiosInstance.post(`http://localhost:3000/api/v4/groups/add-member/${groupId}`, {userId:selectedUser})
      onMemberAdded();
      // console.log(response.data);
      setSelectedUser('');
    } catch (error) {
      console.log('Error selecting user, ',error.message);
    }
  }


  // console.log(allUsers);
  const availableUsers = allUsers.filter(
    user => !existingMembers.some(member => member._id === user._id)
  )

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Add Member</h2>
      <div className="mt-2">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a user</option>
          {availableUsers.map(user => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddMember}
          className="ml-4 p-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddMember
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/GlobalContext";

const AddSharedExpense = ({ groups, users }) => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const { createSharedExpense } = useGlobalContext();
  const navigate = useNavigate();

  const handleAddExpense = async () => {
    createSharedExpense();

    const data = {
      paidBy: selectedUser,
      description,
      amount,
      date,
      groupId: selectedGroup,
    };

    createSharedExpense(data);

    setSelectedUser("");
    setDescription("");
    setAmount("");
    setDate("");
    navigate("/shared-expense");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Add Shared Expenses</h2>
      <div className="mb-4">
        <label htmlFor="group-select" className="block mb-2">
          Select Group:
        </label>
        <select
          id="group-select"
          className="border p-2 rounded w-full"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="" disabled>
            Select a group
          </option>
          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="group-select" className="block mb-2">
          Select user who paid:
        </label>
        <select
          id="group-select"
          className="border p-2 rounded w-full"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          Description:
        </label>
        <input
          type="text"
          id="description"
          className="border p-2 rounded w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          className="border p-2 rounded w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block mb-2">
          Date:
        </label>
        <input
          type="date"
          id="date"
          className="border p-2 rounded w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button
        onClick={handleAddExpense}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Shared Expense
      </button>
    </div>
  );
};

export default AddSharedExpense;

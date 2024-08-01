/* eslint-disable react/prop-types */
import {  useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

const SharedExpenseDetailsCards = ({users, groups,  sharedExpenses }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("kjsbdfioh", sharedExpenses);
  // }, [sharedExpenses]);

  const openModal = (expense) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedExpense(null);
  };

  const handleRemoveExpense = async (expenseId) => {
    try {
      await axiosInstance.delete(
        `http://localhost:3000/api/v5/share/delete-shared-expense/${expenseId}`
      );

      const expenseResponse = await axiosInstance.get(
        "http://localhost:3000/api/v5/share/get-shared-expense"
      );
      console.log(expenseResponse.data.data);
      navigate("/new-shared-expense");
    } catch (error) {
      console.log("Error deleting shared expense", error.message);
      alert("Error deleting shared expense");
    }
  };

  return (
    <div>
      {sharedExpenses.map((expense) => (
        <li
          key={expense._id}
          className="p-6 m-3 border rounded-lg shadow-sm bg-white flex justify-between items-center"
          onClick={() => openModal(expense)}
        >
          <div>
         
            <h2 className="text-xl font-semibold">{expense.description}</h2>
            <p className="text-xl font-semibold text-gray-800">
              ₹{expense.amount}
            </p>
            <p className="text-md text-gray-500 mt-1">
              {new Date(expense.date).toLocaleDateString()}
            </p>

            {/* {expense.paidBy !== id && (
          <p>
            You have to pay{" "}
            {paidBy.map((user) => {
              if (user._id === expense.paidBy) {
                let indExpense = calculateIndividualExpense(expense);
                // calculateTotals(user.username,indExpense);
                return (
                  <span key={user._id}>
                    {indExpense} to {user.username}
                  </span>
                );
              }
              return null;
            })}
          </p>
        )}  */}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleRemoveExpense(expense._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Expense Details</h2>
            {selectedExpense && (
              <>
                <p>
                  <strong>Description:</strong> {selectedExpense.description}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{selectedExpense.amount}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedExpense.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Paid By:</strong>{" "}
                  {users.map((user) => {
                    if (user._id === selectedExpense.paidBy) {
                      return <span key={user._id}>{user.username}</span>;
                    }
                    return null;
                  })}
                </p>
                <p>
                  <strong>Group: </strong>
                </p>
                <p>
                  {groups.map((group) => {
                    if (group._id === selectedExpense.group) {
                      return (
                        <span key={group._id}>
                          {group.name}
                          <br />
                          <strong>Members:</strong>{" "}
                          {group.members.map((items) => (
                            <span key={items._id}>
                              <br />
                              {items.username}
                              {" - ₹"}
                              {Math.round(selectedExpense.amount/group.members.length)}
                            </span>
                          ))}
                        </span>
                      );
                    }
                    return null;
                  })}
                </p>
              </>
            )}
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedExpenseDetailsCards;

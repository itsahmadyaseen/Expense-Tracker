/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";

const SharedExpenseDetailsCards = ({ users, groups, sharedExpenses }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const { removeSharedExpense } = useGlobalContext();

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
    closeModal();
    removeSharedExpense(expenseId);
  };

  return (
    <div>
      {sharedExpenses.map((expense) => (
        <li
          key={expense._id}
          className="p-6 m-3 border rounded-lg shadow-sm bg-white flex justify-between items-center"
        >
          <div onClick={() => openModal(expense)}>
            <h2 className="text-xl font-semibold">{expense.description}</h2>
            <p className="text-xl font-semibold text-gray-800">
              ₹{expense.amount}
            </p>
            <p className="text-md text-gray-500 mt-1">
              {new Date(expense.date).toLocaleDateString()}
            </p>

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
                              {Math.round(
                                selectedExpense.amount / group.members.length
                              )}
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

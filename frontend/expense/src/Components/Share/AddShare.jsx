import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const AddShare = ({ onClose }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]); // List of users to select from

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/v1/users/get-users" // Adjust the endpoint as needed
        );
        setUsers(response.data); // Assuming response has a 'data' field containing users
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentObject = payments.reduce((acc, { username, amount }) => {
      const user = users.find((user) => user.username === username);
      if (user) acc[user._id] = amount; // Use user ID from the list
      return acc;
    }, {});
    console.log('payment ',paymentObject);
    

    const expenseObject = expenses.reduce((acc, { username, amount }) => {
      const user = users.find((user) => user.username === username);
      if (user) acc[user._id] = amount; // Use user ID from the list
      return acc;
    }, {});

    const newShare = {
      description,
      amount,
      paymentObject,
      expenseObject,
    };

    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/api/v7/pay-shares/create-pay-share",
        newShare
      );
      console.log("Share created successfully:", response.data);
      onClose(); // Close the modal after successful creation
      window.location.reload();
    } catch (error) {
      console.log("Error creating share:", error);
    }
  };

  const handlePaymentChange = (index, key, value) => {
    const newPayments = [...payments];
    newPayments[index] = { ...newPayments[index], [key]: value };
    setPayments(newPayments);
  };

  const addpayment = () => {
    setPayments([...payments, { username: "", amount: "" }]);
  };

  const removePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
  };

  const handleExpenseChange = (index, key, value) => {
    const newExpenses = [...expenses];
    newExpenses[index] = { ...newExpenses[index], [key]: value };
    setExpenses(newExpenses);
  };

  const addExpense = () => {
    setExpenses([...expenses, { username: "", amount: "" }]);
  };

  const removeExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Add New Share</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Payment Details</label>
            {payments.map((payment, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <select
                  className="w-1/2 p-2 border rounded"
                  value={payment.username}
                  onChange={(e) =>
                    handlePaymentChange(index, "username", e.target.value)
                  }
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="w-1/2 p-2 border rounded"
                  placeholder="Amount"
                  value={payment.amount}
                  onChange={(e) =>
                    handlePaymentChange(index, "amount", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removePayment(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={addpayment}
            >
              Add Payment
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Expense Details</label>
            {expenses.map((expense, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <select
                  className="w-1/2 p-2 border rounded"
                  value={expense.username}
                  onChange={(e) =>
                    handleExpenseChange(index, "username", e.target.value)
                  }
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="w-1/2 p-2 border rounded"
                  placeholder="Amount"
                  value={expense.amount}
                  onChange={(e) =>
                    handleExpenseChange(index, "amount", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeExpense(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={addExpense}
            >
              Add Expense
            </button>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShare;

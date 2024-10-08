// import { useState, useEffect } from "react";
// import axiosInstance from "../axiosInstance.jsx";
// import Sidebar from "./Sidebar.jsx";

const SharedExpense = () => {
  // const [groups, setGroups] = useState([]);
  // const [sharedExpenses, setSharedExpenses] = useState([]);
  // const [selectedUser, setSelectedUser] = useState("");
  // const [selectedGroup, setSelectedGroup] = useState("");
  // const [paidBy, setPaidBy] = useState([]);
  // const [description, setDescription] = useState("");
  // const [amount, setAmount] = useState("");
  // const [date, setDate] = useState("");
  // const [modalVisible, setModalVisible] = useState(false);
  // const [selectedExpense, setSelectedExpense] = useState(null);
  // const [finalTotal, setFinalTotal] = useState({});
  // const [individualExpense, setIndividualExpense] = useState(0);
  // const [totals, setTotals] = useState(new Map());
  // const id = localStorage.getItem("id");

  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         "http://localhost:3000/api/v4/groups/get-groups"
  //       );
  //       console.log("groups ", response.data);
  //       setGroups(response.data);
  //     } catch (error) {
  //       console.log("Error adding shared expense", error.message);
  //       alert("Error adding shared expense");
  //     }
  //   };

  //   const fetchSharedExpense = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         "http://localhost:3000/api/v5/share/get-shared-expense"
  //       );
  //       console.log("sharedExpenses", response.data.data);
  //       setSharedExpenses(response.data.data);
  //     } catch (error) {
  //       console.log("Error fetching shared expense", error.message);
  //     }
  //   };

  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         "http://localhost:3000/api/v1/users/get-users"
  //       );
  //       console.log("users ", response.data);
  //       setPaidBy(response.data);
  //     } catch (error) {
  //       console.log("Error fetching users", error.message);
  //     }
  //   };

  //   fetchGroups();
  //   fetchUsers();
  //   fetchSharedExpense();
  // }, []);

  // useEffect(() => {
  //   if (selectedExpense) {
  //     const group = groups.find((group) => group._id === selectedExpense.group);
  //     if (group) {
  //       setIndividualExpense(
  //         Math.round(selectedExpense.amount / group.members.length)
  //       );
  //     }
  //   }
  // }, [selectedExpense, groups]);

  // const calculateIndividualExpense = (expense) => {
  //   const group = groups.find((group) => group._id === expense.group);
  //   return group ? Math.round(expense.amount / group.members.length) : 0;
  // };

  // useEffect(() => {
  //   if (selectedExpense) {
  //     const group = groups.find((group) => group._id === selectedExpense.group);
  //     if (group) {
  //       group.members.forEach((member) => {
  //         if (member._id !== id) {
  //           const individualExpense =
  //             calculateIndividualExpense(selectedExpense);
  //           updateTotal(member.username, individualExpense);
  //         }
  //       });
  //     }
  //   }
  // }, [selectedExpense, groups, id]);

  // const updateTotal = (username, amount) => {
  //   setFinalTotal((prevTotal) => ({
  //     ...prevTotal,
  //     [username]: (prevTotal[username] || 0) + amount,
  //   }));
  // };

  // const handleAddExpense = async () => {
  //   try {
  //     const response = await axiosInstance.post(
  //       "http://localhost:3000/api/v5/share/create-shared-expense",
  //       {
  //         paidBy: selectedUser,
  //         description,
  //         amount,
  //         date,
  //         groupId: selectedGroup,
  //       }
  //     );

  //     const newExpense = response.data.data;

  //     setSharedExpenses((prevExpenses) => [...prevExpenses, newExpense]);

  //     setGroups([]);
  //     setSelectedUser("");
  //     setDescription("");
  //     setAmount("");
  //     setDate("");
  //   } catch (error) {
  //     console.log("Error adding shared expense", error);
  //     alert("Error adding shared expense");
  //   }
  // };

  // const handleRemoveExpense = async (expenseId) => {
  //   try {
  //     await axiosInstance.delete(
  //       `http://localhost:3000/api/v5/share/delete-shared-expense/${expenseId}`
  //     );

  //     const expenseResponse = await axiosInstance.get(
  //       "http://localhost:3000/api/v5/share/get-shared-expense"
  //     );
  //     console.log(expenseResponse.data.data);
  //     setSharedExpenses(expenseResponse.data.data);
  //   } catch (error) {
  //     console.log("Error deleting shared expense", error.message);
  //     alert("Error deleting shared expense");
  //   }
  // };


  // const calculateTotals = (user, indExpense)=>{
  //   const maptotals = new Map();
  //   if (maptotals.has(user.username)) {
  //     maptotals.set(
  //       user.username,
  //       maptotals.get(user.username) + indExpense
  //     );
  //   } else {
  //     maptotals.set(user.username, indExpense);
  //   }
  //   setTotals(maptotals);
  // }

  // const openModal = (expense) => {
  //   setSelectedExpense(expense);
  //   setModalVisible(true);
  // };

  // const closeModal = () => {
  //   setModalVisible(false);
  //   setSelectedExpense(null);
  // };

  // return (
  //   <div className=" flex shared-expense-container ">
  //     <div>
  //       <Sidebar />
  //     </div>
  //     <div className="w-full h-screen overflow-y-auto p-5 ">
  //       <h2 className="text-3xl font-bold mb-4">Add Shared Expenses</h2>
  //       <div className="mb-4">
  //         <label htmlFor="group-select" className="block mb-2">
  //           Select Group:
  //         </label>
  //         <select
  //           id="group-select"
  //           className="border p-2 rounded w-full"
  //           value={selectedGroup}
  //           onChange={(e) => setSelectedGroup(e.target.value)}
  //         >
  //           <option value="" disabled>
  //             Select a group
  //           </option>
  //           {groups.map((group) => (
  //             <option key={group._id} value={group._id}>
  //               {group.name}
  //             </option>
  //           ))}
  //         </select>
  //       </div>

  //       <div className="mb-4">
  //         <label htmlFor="group-select" className="block mb-2">
  //           Select user who paid:
  //         </label>
  //         <select
  //           id="group-select"
  //           className="border p-2 rounded w-full"
  //           value={selectedUser}
  //           onChange={(e) => setSelectedUser(e.target.value)}
  //         >
  //           <option value="" disabled>
  //             Select a user
  //           </option>
  //           {paidBy.map((user) => (
  //             <option key={user._id} value={user._id}>
  //               {user.username}
  //             </option>
  //           ))}
  //         </select>
  //       </div>

  //       <div className="mb-4">
  //         <label htmlFor="description" className="block mb-2">
  //           Description:
  //         </label>
  //         <input
  //           type="text"
  //           id="description"
  //           className="border p-2 rounded w-full"
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //         />
  //       </div>

  //       <div className="mb-4">
  //         <label htmlFor="amount" className="block mb-2">
  //           Amount:
  //         </label>
  //         <input
  //           type="number"
  //           id="amount"
  //           className="border p-2 rounded w-full"
  //           value={amount}
  //           onChange={(e) => setAmount(e.target.value)}
  //         />
  //       </div>

  //       <div className="mb-4">
  //         <label htmlFor="date" className="block mb-2">
  //           Date:
  //         </label>
  //         <input
  //           type="date"
  //           id="date"
  //           className="border p-2 rounded w-full"
  //           value={date}
  //           onChange={(e) => setDate(e.target.value)}
  //         />
  //       </div>

  //       <button
  //         onClick={handleAddExpense}
  //         className="bg-blue-500 text-white p-2 rounded"
  //       >
  //         Add Shared Expense
  //       </button>

  //       <div>
  //         <h1 className="text-3xl font-bold mb-8 mt-8">Shared Expenses</h1>
  //         <ul className="space-y-5">
  //           {sharedExpenses.map((expense) => (
  //             <li
  //               key={expense._id}
  //               className="p-6 border rounded-lg shadow-sm bg-white flex justify-between items-center"
  //               onClick={() => openModal(expense)}
  //             >
  //               <div>
  //                 <h2 className="text-xl font-semibold">
  //                   {expense.description}
  //                 </h2>
  //                 <p className="text-xl font-semibold text-gray-800">
  //                   ₹{expense.amount}
  //                 </p>
  //                 <p className="text-md text-gray-500 mt-1">
  //                   {new Date(expense.date).toLocaleDateString()}
  //                 </p>

  //                 {expense.paidBy !== id && (
  //                   <p>
  //                     You have to pay{" "}
  //                     {paidBy.map((user) => {
                        
  //                       if (user._id === expense.paidBy) {
  //                         let indExpense = calculateIndividualExpense(expense);
  //                         // calculateTotals(user.username,indExpense);
  //                         return (
  //                           <span key={user._id}>
  //                             {indExpense} to {user.username}
  //                           </span>
  //                         );
  //                       }
  //                       return null;
  //                     })}
  //                   </p>
  //                 )}
  //               </div>
  //               <div className="flex space-x-3">
  //                 <button
  //                   onClick={() => handleRemoveExpense(expense._id)}
  //                   className="bg-red-500 text-white px-4 py-2 rounded"
  //                 >
  //                   Delete
  //                 </button>
  //               </div>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>

  //       {modalVisible && (
  //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  //           <div className="bg-white p-8 rounded shadow-lg w-1/2">
  //             <h2 className="text-2xl font-bold mb-4">Expense Details</h2>
  //             {selectedExpense && (
  //               <>
  //                 <p>
  //                   <strong>Description:</strong> {selectedExpense.description}
  //                 </p>
  //                 <p>
  //                   <strong>Amount:</strong> ₹{selectedExpense.amount}
  //                 </p>
  //                 <p>
  //                   <strong>Date:</strong>{" "}
  //                   {new Date(selectedExpense.date).toLocaleDateString()}
  //                 </p>
  //                 <p>
  //                   <strong>Paid By:</strong>{" "}
  //                   {paidBy.map((user) => {
  //                     if (user._id === selectedExpense.paidBy) {
  //                       return <span key={user._id}>{user.username}</span>;
  //                     }
  //                     return null;
  //                   })}
  //                 </p>
  //                 <p>
  //                   <strong>Group: </strong>
  //                 </p>
  //                 <p>
  //                   {groups.map((group) => {
  //                     if (group._id === selectedExpense.group) {
  //                       return (
  //                         <span key={group._id}>
  //                           {group.name}
  //                           <br />
  //                           <strong>Members:</strong>{" "}
  //                           {group.members.map((items) => (
  //                             <span key={items._id}>
  //                               <br />
  //                               {items.username}
  //                               {" - ₹"}
  //                               {individualExpense}
  //                             </span>
  //                           ))}
  //                         </span>
  //                       );
  //                     }
  //                     return null;
  //                   })}
  //                 </p>
  //               </>
  //             )}
  //             <button
  //               onClick={closeModal}
  //               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
  //             >
  //               Close
  //             </button>
  //           </div>
  //         </div>
  //       )}

  //       <div>
  //         <h2 className="text-2xl font-bold mb-4 mt-4">Total Amounts</h2>
  //         {/* <ul>
  //           {Object.entries(finalTotal).map(([username, amount]) => (
  //             <li key={username}>
  //               {console.log("username", username)}
  //               {username}: {amount}
  //             </li>
  //           ))}
  //         </ul> */}
          
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SharedExpense;

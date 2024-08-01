import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import Sidebar from "../Sidebar";
import SettleShare from "../Shared Expense/SettleShare";

const Share = () => {
  const [shares, setShares] = useState([]);

  const [showSettleShare, setShowSettleShare]  = useState(false);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3000/api/v6/new-shares/get-shares`
        );
        // console.log(response.data.data);
        setShares(response.data.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchShares();
  }, []);



  return (
    <div className="flex w-full h-screen">
  <div className="flex-shrink-0">
    <Sidebar />
  </div>
  <div className="flex flex-col w-full h-full">
    <div className="flex-grow overflow-auto p-4">
      <ul className="space-y-4">
        {shares.map((share) => (
          <li
            key={share._id}
            className="p-6 border rounded-lg shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <p className="text-xl">Description: {share.description}</p>
              <p className="text-xl">User paid: {share.paidUserId.username}</p>
              <p className="text-xl">Amount: {share.amount}</p>
              {share.expenseObject && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Expense Details:</h3>
                  <ul>
                    {Object.entries(share.expenseObject).map(
                      ([userId, amount]) => (
                        <p key={userId} className="text-md">
                          {userId} - : ₹{amount}
                        </p>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className="flex-shrink-0 bg-red-900 p-4">
      <button
        className="bg-red-400 px-4 py-2 rounded text-white"
        onClick={() => {
          setShowSettleShare(true);
        }}
      >
        Settle
      </button>
    </div>
    <div>
      {showSettleShare && <SettleShare />}
    </div>
  </div>
</div>

  );
};

export default Share;

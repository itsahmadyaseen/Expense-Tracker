import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const SettleShare = () => {
  const [settledData, setSettledData] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchReult = async () => {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/v6/new-shares/settle-share"
      );

      console.log(response.data);
      setSettledData(response.data.data);
    };
    fetchReult();
  }, []);

  return (
    <div>
      {settledData.map((data) => {
        return (
          <div key={data.amount}>
            {data.debUser === username ? (
              <p>
                You have to pay {data.amount} to {data.credUser}
              </p>
            ) : (
              <p>
                {data.debUser} has to pay {data.amount} to you
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SettleShare;

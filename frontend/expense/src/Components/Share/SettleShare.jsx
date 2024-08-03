import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const SettleShare = () => {
  const [settledData, setSettledData] = useState([]);


  useEffect(() => {
    const fetchReult = async () => {
      const response = await axiosInstance.post(
        "http://localhost:3000/api/v7/pay-shares/settle-pay-share"
      );

      console.log(response.data.totalAmount);
      setSettledData(response.data);
    };
    fetchReult();
  }, []);

  return (
    <div>
      
          <div>
            {settledData.totalAmount >= 0 ? (
              <p className="text-2xl">
                You are at lead by {settledData.totalAmount}
              </p>
            ) : (
              <p className="text-2xl">
                Yor are trailing by {settledData.totalAmount}
              </p>
            )}
          </div>
        
    </div>
  );
};

export default SettleShare;

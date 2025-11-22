import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.status === 200) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      toast.error("Error fetching orders");
      console.error(err);
    }
  };

  const statushandler = async (e, orderId) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value,
      });
      if (res.data.success) {
        await fetchOrders();
      }
    } catch (err) {
      console.error("Status update error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex-1 ml-[max(5vw,25px)] mt-12 p-5 text-[#505050]">
      <h3 className="text-lg font-semibold mb-4">Order Page</h3>
      <div className="orderlist">
        {orders.map((order, index) => (
          <div
            key={index}
            className="
              grid grid-cols-1 
              sm:grid-cols-[0.7fr_2fr_1fr] 
              md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] 
              items-center gap-6 
              border border-[#eb434356] rounded-md shadow-sm
              p-5 my-6 text-[14px]
            "
          >
            <img src={assets.parcel_icon} alt="" className="w-10 h-10" />

            <div>
              <p className="font-semibold whitespace-normal break-keep">
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              {order.address && (
                <p className="font-semibold mt-3 mb-1.5 whitespace-normal break-keep">
                  {order.address.firstName} {order.address.lastName}
                </p>
              )}
              <div className="mb-2.5">
                <p className="whitespace-normal break-keep">
                  {order.address.street},
                </p>
                <p className="whitespace-normal break-keep">
                  {order.address.city}, {order.address.state},
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="whitespace-normal break-keep">
                {order.address.phone}
              </p>
            </div>
            <p className="whitespace-normal break-keep">
              Item: {order.items.length}
            </p>
            <p className="whitespace-normal break-keep">
              Order Amount: ₹{order.amount}
            </p>
            <select
              onChange={(e) => statushandler(e, order._id)}
              value={order.status}
              className="border bg-[#ffe8e4] border-[#eb434356] max-w-[140px] p-2.5 rounded whitespace-normal break-keep"
            >
              <option value="Processing">Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

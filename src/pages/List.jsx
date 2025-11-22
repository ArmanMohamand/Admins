import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.status === 200) {
        setList(res.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      toast.error("Network error while fetching list");
      console.error("Fetch error:", error.message);
    }
  };

  const removeItem = async (id) => {
    setDeletingId(id);
    try {
      setList((prev) => prev.filter((food) => food._id !== id));
      const res = await axios.post(`${url}/api/food/delete/${id}`);
      if (res.status === 200) {
        toast.success("Item deleted successfully");
        await new Promise((resolve) => setTimeout(resolve, 300));
        await fetchList();
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      toast.error("Error deleting item");
      console.error("Delete error:", error.message);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container flex flex-col gap-5 p-5">
      <p className="text-lg font-semibold">All Foods List</p>
      <div className="list tab">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-2.5 py-3 px-3.5 text-[13px] border border-[#cacaca] items-center bg-[#f9f9f9] font-medium">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        <div className="grid grid-cols-[2fr_1fr_0.5fr] sm:hidden gap-2.5 py-3 px-3.5 text-[13px] border border-[#cacaca] items-center bg-[#f9f9f9] font-medium">
          <b>Name</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div
            key={item._id}
            className="format grid grid-cols-[2fr_1fr_0.5fr] sm:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-3.5 sm:gap-2.5 py-3 px-3.5 text-[13px] border border-[#cacaca] items-center"
          >
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="hidden sm:block w-[50px] h-[50px] object-cover rounded"
            />

            <p>{item.name}</p>

            <p className="hidden sm:block">{item.category}</p>

            <p>₹{item.price}</p>

            <p
              className={`cursor-pointer text-red-500 font-bold ${
                deletingId === item._id ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={() => removeItem(item._id)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

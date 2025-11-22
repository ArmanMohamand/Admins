import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

const Promo = ({ url }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("flat");
  const [expiresAt, setExpiresAt] = useState("");
  const [promos, setPromos] = useState([]);

  // Fetch all promos
  const fetchPromos = async () => {
    try {
      const res = await axios.get(`${url}/api/promo/list`);
      if (res.data.success) {
        setPromos(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching promos:", err);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  // Create new promo
  const createPromo = async () => {
    try {
      const res = await axios.post(`${url}/api/promo/create`, {
        code,
        discount,
        type,
        expiresAt,
      });
      if (res.data.success) {
        toast.success("Promo created successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        setCode("");
        setDiscount("");
        setType("flat");
        setExpiresAt("");
        fetchPromos();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Error creating promo");
    }
  };

  // Toggle promo active/inactive
  const togglePromo = async (id, isActive) => {
    try {
      const res = await axios.patch(`${url}/api/promo/${id}/toggle`, {
        isActive: !isActive,
      });
      if (res.data.success) {
        fetchPromos();
      }
    } catch (err) {
      alert("Error toggling promo");
    }
  };

  // Delete promo
  const deletePromo = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/promo/delete/${id}`);
      if (res.data.success) {
        fetchPromos();
      }
    } catch (err) {
      alert("Error deleting promo");
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 overflow-x-auto">
      <h2 className="text-lg md:text-xl font-bold mb-4">Manage Promo Codes</h2>
      <div className="mb-6 bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Create New Promo</h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border px-2 py-1 rounded text-sm md:text-base"
          />
          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border px-2 py-1 rounded text-sm md:text-base"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-2 py-1 rounded text-sm md:text-base"
          >
            <option value="flat">Flat</option>
            <option value="percent">Percent</option>
          </select>
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="border px-2 py-1 rounded text-sm md:text-base"
          />
          <button
            onClick={createPromo}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2 text-sm md:text-base"
          >
            Create Promo
          </button>
        </div>
      </div>
      <h3 className="font-semibold mb-2">All Promos</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Code</th>
              <th className="border px-2 py-1">Discount</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Expires At</th>
              <th className="border px-2 py-1">Active</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((promo) => (
              <tr key={promo._id} className="text-center">
                <td className="border px-2 py-1">{promo.code}</td>
                <td className="border px-2 py-1">{promo.discount}</td>
                <td className="border px-2 py-1">{promo.type}</td>
                <td className="border px-2 py-1">
                  {promo.expiresAt ? promo.expiresAt.substring(0, 10) : "—"}
                </td>
                <td className="border px-2 py-1">
                  {promo.isActive ? "Yes" : "No"}
                </td>
                <td className="border px-2 py-1 flex flex-col md:flex-row gap-2 justify-center">
                  <button
                    onClick={() => togglePromo(promo._id, promo.isActive)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                  >
                    {promo.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => deletePromo(promo._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {promos.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-2">
                  No promos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Promo;

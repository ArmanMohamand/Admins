import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import "./All.css";
import { toast } from "react-toastify";
const Add = ({ url }) => {
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    discription: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("discription", data.discription);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.status === 200) {
      setdata({
        name: "",
        discription: "",
        price: "",
        category: "Salad",
      });
      setimage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-12 text-[#6d6d6d] text-base add">
      <form className=" gap-5 flex flex-col " onSubmit={onSubmitHandler}>
        <div className="w-[120px]">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            className="w-full border"
          />
        </div>
        <div className="w-[max(40%,280px)] ">
          <p>Product Name</p>
          <input
            onChange={(e) => onChangeHandler(e)}
            value={data.name}
            type="text"
            name="name"
            placeholder="type here "
            className="w-full p-2.5 border"
          />
        </div>
        <div className="w-[max(40%,280px)]">
          <p>Product discription</p>
          <textarea
            onChange={(e) => onChangeHandler(e)}
            value={data.discription}
            name="discription"
            rows="6"
            placeholder="write content here"
            required
            className="w-full border p-2"
          ></textarea>
        </div>
        <div className="flex gap-8 ">
          <div
            className="flex flex-col "
            onChange={(e) => onChangeHandler(e)}
            value={data.category}
            name="category"
          >
            <p> Product Category</p>
            <select
              name="category"
              className=" max-w-32 p-2.5 mr-4 border"
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Cake">Cake</option>
            </select>
          </div>
          <div className="addprice ">
            <p> Product Price</p>
            <input
              onChange={(e) => onChangeHandler(e)}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
              required
              className=" max-w-32 p-2.5  mr-4 border"
            />
          </div>
        </div>
        <button
          type="submit"
          className="max-w-[120px] p-2.5 bg-black text-white cursor-pointer"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function License() {
  const [formData, setFormData] = useState({
    name: "",
    aadhar_number: "",
    phone: "",
    address: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/license/license/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("License submitted successfully!");
      console.log(res.data);
      setFormData({
        name: "",
        aadhar_number: "",
        phone: "",
        address: "",
        photo: null,
      });
    } catch (error) {
      if (error.response?.data) {
        toast.error(JSON.stringify(error.response.data));
      } else {
        toast.error("Failed to submit license");
      }
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5 text-center">Apply for License</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-lg p-6 rounded-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="aadhar_number"
          placeholder="Aadhar Number"
          value={formData.aadhar_number}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

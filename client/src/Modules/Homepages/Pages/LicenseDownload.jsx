import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function LicenseDownload() {
  const [phone, setPhone] = useState("");

  const handleDownload = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/license/download/?phone=${phone}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "license.pdf");
      document.body.appendChild(link);
      link.click();
      toast.success("License downloaded successfully!");
    } catch (error) {
      toast.error("License not found or not approved yet");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Download Your License</h1>
      <input
        type="text"
        placeholder="Enter your Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleDownload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download
      </button>
    </div>
  );
}

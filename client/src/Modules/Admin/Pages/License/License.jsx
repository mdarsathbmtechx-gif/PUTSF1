import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LicenseAdmin() {
  const [licenses, setLicenses] = useState([]);

  const fetchLicenses = async () => {
    try {
      const res = await API.get("/license/license/");
      setLicenses(res.data);
    } catch {
      toast.error("Failed to fetch licenses");
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.post(`/license/license/${id}/approve/`);
      toast.success("License approved!");
      fetchLicenses();
    } catch {
      toast.error("Failed to approve license");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this license?")) return;
    try {
      await API.delete(`/license/license/${id}/`);
      toast.success("License deleted");
      fetchLicenses();
    } catch {
      toast.error("Failed to delete license");
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">License Requests</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {licenses.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow rounded border">
            <p><b>Name:</b> {item.name}</p>
            <p><b>Aadhar:</b> {item.aadhar_number}</p>
            <p><b>Phone:</b> {item.phone}</p>
            <p><b>Address:</b> {item.address}</p>
            {item.photo && (
              <img
                src={item.photo}
                alt="photo"
                className="w-24 h-24 object-cover mt-2 rounded"
              />
            )}
            <p className="mt-2">
              Status:{" "}
              <span
                className={`font-semibold ${
                  item.is_approved ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {item.is_approved ? "Approved" : "Pending"}
              </span>
            </p>

            {!item.is_approved && (
              <button
                onClick={() => handleApprove(item.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700"
              >
                Approve
              </button>
            )}
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-600 text-white px-4 py-2 rounded mt-3 ml-2 hover:bg-red-700"
            >
              Delete
            </button>

            {item.is_approved && item.license_pdf && (
              <a
                href={`http://127.0.0.1:8000${item.license_pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 mt-2 underline"
              >
                Download License
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

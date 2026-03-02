"use client";

import { useState, useEffect } from "react";

export default function ClientManagement() {
  const initialFormState = {
    name: "",
    id: "",
    status: "",
    companyname: "",
    gainShare: "",
    billingType: "",
    revenueType: "",
    properties: "",
    billingcycle: "",
    paymentterms: "",
    primarycontactname: "",
    contactemail: "",
    contactphone: "",
    secondarycontactname: "",
    secondarycontactemail: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    email: "",
    phone: "",
    notes: "",
  };

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [errors, setErrors] = useState({});

 const [visibleColumns, setVisibleColumns] = useState(
    Object.keys(initialFormState).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  );
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const stored = localStorage.getItem("clients");
    if (stored) {
      setClients(JSON.parse(stored));
    }
  }, []);

  const validateForm = () => {
    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `Please enter ${field}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("clients", JSON.stringify(data));
  };

  const handleAddClient = () => {
    if (!validateForm()) return;
    const updated = [...clients, formData];
    setClients(updated);
    saveToLocalStorage(updated);
    setShowModal(false);
    setFormData(initialFormState);
  };

  const handleSearchClick = () => {
    setSearchTerm(search);
  };

  const handleColumnToggle = (field) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const filteredClients = clients.filter((client) =>
    client.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-150 p-8">
      <div className="bg-white p-6 rounded-xl shadow-md">

        <div className="flex justify-between mb-6">
          <h1 className="text-xl font-semibold">Client Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add New Client
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full border border-gray-350 focus:ring-2 focus:ring-blue-200 px-4 py-2 rounded-lg"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchTerm(e.target.value);
            }}
          />

          <button
              onClick={handleSearchClick}
              className="flex items-center justify-center h-10 px-6 text-sm font-medium 
               bg-blue-600 text-white rounded-lg 
               hover:bg-blue-700 transition"
  >
    Search
  </button>

         <div>
  <input
    type="file"
    accept=".csv"
    id="csvUpload"
    className="hidden"
  />

  <label
    htmlFor="csvUpload"
    className="flex cursor-pointer items-center justify-center gap-2 h-10 px-6 text-sm font-medium
               bg-gray-100 text-gray-700 rounded-lg 
               border border-gray-300 
               hover:bg-gray-200 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-blue-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
      />
    </svg>
    Upload CSV
  </label>
</div>
        </div>

        <div className="flex justify-end mb-3">
          <button
            onClick={() => setShowColumnsPanel(!showColumnsPanel)}
            className="border bg-gray-100 px-4 py-2 rounded-lg"
          >
            Columns
          </button>
        </div>

        {showColumnsPanel && (
          <div className="bg-gray-100 p-4 rounded-lg mb-4 flex flex-wrap gap-4">
            {Object.keys(visibleColumns).map((col) => (
              <label key={col} className="flex items-center gap-2 capitalize">
                <input
                  type="checkbox"
                  checked={visibleColumns[col]}
                  onChange={() => handleColumnToggle(col)}
                />
                {col}
              </label>
            ))}
          </div>
        )}

       <div className="overflow-x-auto">
  <table className="min-w-full text-sm text-gray-700">

    <thead>
      <tr className="text-xs uppercase tracking-wider text-gray-400">
        {Object.keys(visibleColumns).map(
          (col) =>
            visibleColumns[col] && (
              <th
                key={col}
                className="px-6 py-4 text-left font-semibold whitespace-nowrap"
              >
                {col.replace(/([A-Z])/g, " $1")}
              </th>
            )
        )}
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-100">
  {filteredClients.length === 0 ? (
    <tr>
      <td
        colSpan={Object.values(visibleColumns).filter(Boolean).length}
        className="text-center py-10 text-gray-500 text-sm"
      >
        No results found
      </td>
    </tr>
  ) : (
    filteredClients.map((client, index) => (
      <tr
        key={index}
        className="hover:bg-gray-50 transition duration-150"
      >
        {Object.keys(visibleColumns).map(
          (col) =>
            visibleColumns[col] && (
              <td
                key={col}
                className="px-6 py-4 whitespace-nowrap"
              >
                {col === "billingType" ? (
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                    {client[col] || "-"}
                  </span>
                ) : (
                  <span className="text-gray-700">
                    {client[col] || "-"}
                  </span>
                )}
              </td>
            )
        )}
      </tr>
    ))
  )}
</tbody>

  </table>
</div>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto p-8 rounded-2xl shadow-2xl">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Add Client
              </h2>

              {Object.keys(formData).map((field) => (
                <div key={field} className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>

                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    placeholder={`Enter ${field}`}
                    className={`w-full px-4 py-2 rounded-lg border transition outline-none
                      ${
                        errors[field]
                          ? "border-red-500 focus:ring-2 focus:ring-red-300"
                          : "border-gray-300 focus:ring-2 focus:ring-green-300 focus:border-green-500"
                      }`}
                  />

                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddClient}
                  className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition shadow"
                >
                  Save Client
                </button>
              </div>

            </div>
          </div>
        )}


      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStoreGroupName,
  setDescription,
  setExistingStoreGroup,
  moveMultipleStoresToSelected,
  moveMultipleStoresToAvailable,
  moveAllAvailableStoresToSelected,
  moveAllSelectedStoresToAvailable,
  setId,
} from "../store/storeGroupSlice";
import { FaSearch } from "react-icons/fa";
import TableComponent from "./TableComponent"; 

export default function StoreComponent() {
  const dispatch = useDispatch();
  const { storeGroupName, description, existingStoreGroup, id, availableStores, selectedStores } = useSelector(
    (state) => state.storeGroup
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedSelected, setSelectedSelected] = useState([]);
  const [showTable, setShowTable] = useState(false); // Modal state for TableComponent

  const filteredAvailableStores = availableStores.filter((store) =>
    store.id.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg relative">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Some appropriate heading</h2>

      {/* First Row: Custom Store Group Name & Description */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">New Custom Store Group Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="STOREGROUPDENVER001"
            value={storeGroupName}
            onChange={(e) => dispatch(setStoreGroupName(e.target.value))}
            className="p-2 border rounded-md w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">New Store Group Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            className="p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Second Row: Search, Existing Store Group Type, and Name */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Search by Store ID with Search Icon */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Search by Store ID</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Store ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md w-full pr-10"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
          <button 
            onClick={() => setShowTable(true)} 
            className="text-blue-600 text-sm mt-1"
          >
            View Store
          </button>
        </div>

        {/* Existing Store Group Type Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Existing Store Group Type</label>
          <select
            value={existingStoreGroup}
            onChange={(e) => dispatch(setExistingStoreGroup(e.target.value))}
            className="p-2 border rounded-md w-full"
          >
            <option value="Division">Division</option>
          </select>
        </div>

        {/* Existing Store Group Name Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Existing Store Group Name</label>
          <select
            value={id}
            onChange={(e) => dispatch(setId(e.target.value))}
            className="p-2 border rounded-md w-full"
          >
            <option value="Region">Region</option>
            <option value="Denver">Denver</option>
            <option value="New York">New York</option>
          </select>
        </div>
      </div>

      {/* Store Lists & Transfer Buttons */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {/* Available Stores */}
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            Stores List Available ({availableStores.length}) <span className="text-blue-600">ℹ</span>
          </h3>
          <div className="h-40 overflow-y-auto border rounded-md bg-white">
            {filteredAvailableStores.map((store) => (
              <div
                key={store.id}
                className={`p-2 cursor-pointer ${selectedAvailable.includes(store.id) ? "bg-blue-200" : "hover:bg-gray-200"}`}
                onClick={() =>
                  setSelectedAvailable((prev) =>
                    prev.includes(store.id) ? prev.filter((id) => id !== store.id) : [...prev, store.id]
                  )
                }
              >
                {store.id} - {store.storeGroupName}
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Buttons */}
        <div className="flex flex-col justify-center items-center gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => dispatch(moveAllAvailableStoresToSelected())}>{`>>`}</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => {
            dispatch(moveMultipleStoresToSelected(selectedAvailable));
            setSelectedAvailable([]);
          }}>{`>`}</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => {
            dispatch(moveMultipleStoresToAvailable(selectedSelected));
            setSelectedSelected([]);
          }}>{`<`}</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => dispatch(moveAllSelectedStoresToAvailable())}>{`<<`}</button>
        </div>

        {/* Selected Stores */}
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            New Store List ({selectedStores.length}) <span className="text-blue-600">ℹ</span>
          </h3>
          <div className="h-40 overflow-y-auto border rounded-md bg-white">
            {selectedStores.map((store) => (
              <div
                key={store.id}
                className={`p-2 cursor-pointer ${selectedSelected.includes(store.id) ? "bg-blue-200" : "hover:bg-gray-200"}`}
                onClick={() =>
                  setSelectedSelected((prev) =>
                    prev.includes(store.id) ? prev.filter((id) => id !== store.id) : [...prev, store.id]
                  )
                }
              >
                {store.id} - {store.storeGroupName}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for TableComponent */}
      {showTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 relative">
            {/* Close Button */}
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowTable(false)}
            >
              ✖
            </button>

            {/* TableComponent inside Modal */}
            <TableComponent />
          </div>
        </div>
      )}
    </div>
  );
}

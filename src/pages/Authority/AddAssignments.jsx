import React from "react";

const AddAssignments = () => {
  return (
    <div className="max-w-2xl mx-auto mt-17 bg-white p-6 rounded-lg shadow md:mt-10">
      <h2 className="text-xl font-semibold mb-4">Add Assignment</h2>
      <form className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Assignment Title"
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
        ></textarea>

        {/* Due Date & Time */}
        <div className="flex flex-row gap-2">
          <label className="flex flex-col">
            Deadline Date:
            <input type="date" className="border p-2 rounded" />
          </label>
          <label className="flex flex-col">
          Deadline time:
          <input type="time" className="border p-2 rounded" />
          </label>
        </div>

        {/* File Upload */}
        <input type="file" className="w-full border p-2 rounded" />

        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default AddAssignments;

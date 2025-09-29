import React, { useState } from "react";
import { useCreateAssignmentMutation } from "../../redux/api/assignmentApiSlice";
import { toast } from "react-toastify";

const AddAssignments = () => {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();

  const submitHandler = async(e)=>{
     e.preventDefault();

    try {
      const dueDate = new Date(`${date}T${time}`);

      const assignmentData = {
        subject,
        description,
        dueDate,
      };
      const res = await createAssignment(assignmentData).unwrap();
      console.log("Assignment Created:", res);
      toast.success("Assignment Created Successfully....")

      setSubject("");
      setDescription("");
      setDate("");
      setTime("");
      } catch (error) {
      console.error("Failed to create assignment:", error);
      toast.error(error?.data?.message);
    }
  }
  return (
    <div className="max-w-2xl mx-auto mt-17 bg-white p-6 rounded-lg shadow md:mt-10">
      <h2 className="text-xl font-semibold mb-4">Add Assignment</h2>
      <form className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Subject"
          className="w-full border p-2 rounded"
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        ></textarea>

        {/* Due Date & Time */}
        <div className="flex flex-row gap-2">
          <label className="flex flex-col">
            Deadline Date:
            <input type="date" className="border p-2 rounded" onChange={(e)=>setDate(e.target.value)}/>
          </label>
          <label className="flex flex-col md:ml-[40%]">
          Deadline time:
          <input type="time" className="border p-2 rounded" onChange={(e)=>setTime(e.target.value)}/>
          </label>
        </div>

        {/* File Upload */}
        <input type="file" className="w-full border p-2 rounded" />

        <button onClick={submitHandler} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default AddAssignments;

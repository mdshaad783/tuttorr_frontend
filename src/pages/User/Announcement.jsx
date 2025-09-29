import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { useGetAssignmentQuery } from "../../redux/api/assignmentApiSlice";
import Loader from "../../components/Loader";

const Announcement=()=>{
  const {data:assignments, isLoading, error, refetch} = useGetAssignmentQuery()
  const { userInfo } = useSelector((state) => state.auth);
  

  return (
    <div className="max-w-5xl mx-auto mt-14 p-6 md:mt-4">
      <h2 className="text-2xl font-bold mb-6">Announcements</h2>
      {isLoading ? (<Loader/>): error? (<p className="text-red-500 text-center text-2xl">No Announcement available....</p>):(
      <div className="grid gap-6">
        {assignments &&
            assignments.map((assignment) => {
              let isOverdue = new Date(assignment.dueDate) < new Date();
                return(
          <div
            key={assignment._id}
            className={`border border-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition ${isOverdue ? "border-red-300":""}`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{assignment.subject}</h3>
              <span className={`text-sm text-gray-500 ${isOverdue ? "text-red-400":""}`}>
                {new Date(assignment.dueDate).toLocaleDateString("en-IN", {
                  dateStyle: "medium",
                })}
              </span>
            </div>
            <p className="text-gray-700">{assignment.description}</p>

            {/* Optional Actions */}
            <div className="mt-3 flex gap-2">
            {(userInfo.role === 'student')&&(
              <button
              // onClick={() => handleAdd(assignment._id)}
              className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-green-700">
                Submit
              </button>
            )}
              <button 
              onClick={()=>deleteHandler(assignment._id)}
              className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
           ) })}
           
        
      </div>
      )}
    </div>
  );
}

export default Announcement
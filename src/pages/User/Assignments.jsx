import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useGetAssignmentQuery } from '../../redux/api/assignmentApiSlice';


const Assignments = () => {
  const {data:assignments, isLoading, error, refetch} = useGetAssignmentQuery()
  const { userInfo } = useSelector((state) => state.auth);
  
  
  // useEffect(() => {
  //   console.log(assignments)
  // },)
   return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Assignments</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="border p-3 text-left">#</th> */}
              <th className="border p-3 text-left">Subject</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-left">Due Date</th>
              {/* <th className="border p-3 text-left">File</th> */}
            </tr>
          </thead>
          <tbody>
          {assignments &&
            assignments.map((assignment,index) => {
                let isOverdue = new Date(assignment.dueDate) < new Date();
                return(
                <tr key={assignment._id} className="hover:bg-gray-50">
                  {/* <td className="border p-3">{index + 1}</td> */}
                  <td className="border p-3 font-medium">{assignment.subject}</td>
                  <td className="border p-3 text-sm text-gray-600">
                    {assignment.description}
                  </td>
                  <td
                    className={`border border-black p-3
                    ${
                      isOverdue ? "text-red-400 border-red-600 font-semibold" : ""
                    }`}
                  >
                    {new Date(assignment.dueDate).toLocaleString()}
                  </td>
                  
                  {/* <td className="border p-3">
                    {a.file ? (
                      <a
                        href={a.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td> */}
                  {(userInfo.role === 'student')&&(
                    <td>
                      <button className="mx-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition cursor-pointer">Submit</button>
                    </td>
                  )}
                  {/* <td>{new Date(assignment.createdAt).toLocaleString()}</td> */}
                </tr>
                )
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assignments
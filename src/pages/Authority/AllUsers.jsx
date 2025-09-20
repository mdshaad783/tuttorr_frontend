import React from "react";
import { useEffect } from "react";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../redux/api/usersApiSlice";
import { useSelector } from "react-redux";
import {FaTrash, FaPencilAlt, FaPencilRuler} from "react-icons/fa"
import {toast} from 'react-toastify'
import { useState } from "react";

const AllUsers = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation()

  const [editableUsername, setEditableUsername] = useState('')
  const [editableEmail, setEditableEmail] = useState('')

  const deleteHandler = async (id)=>{
        if(window.confirm("Are you sure?")){
            try{
                await deleteUser(id)
                toast.success("User deleted successfully...")
                refetch()
            }catch(error){
                toast.error(error?.data?.message || error?.error)
            }
        }
    }

  return (
    <div className="p-6 mt-[4rem] md:mx-auto md:w-[60%] md:mt-[2rem]">
      <h2 className="text-2xl font-semibold underline mb-4">All Users</h2>
      <table className="min-w-full border-none rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="p-3">S.NO</th>
            <th className="p-3">USERNAME</th>
            <th className="p-3">ROLE</th>
            <th className="p-3">EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user,index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-3 w-[3rem]">{index+1}.</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.email}</td>
                {(userInfo.role==="admin")&&(
                  
                <td className="p-3">
                  {(user.role!=="admin")&&(
                      <button onClick={()=>deleteHandler(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        <FaTrash/>
                      </button>
                  )}
                </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

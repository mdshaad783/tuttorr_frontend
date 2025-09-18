import React from "react";
import { useEffect } from "react";
import { useGetAllUsersQuery } from "../../redux/api/usersApiSlice";

const AllUsers = () => {
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();

  return (
    <div className="p-6 mt-[4rem] md:mx-auto md:w-[60%] md:mt-[2rem]">
      <h2 className="text-2xl font-semibold underline mb-4">All Users</h2>
      <table className="min-w-full border border-gray-300 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">S.No</th>
            <th className="p-3 border">Username</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user,index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-3 w-[3rem] border">{index+1}</td>
                <td className="p-3 border">{user.username}</td>
                <td className="p-3 border">{user.role}</td>
                <td className="p-3 border">{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

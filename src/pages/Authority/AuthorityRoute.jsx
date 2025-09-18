import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"


const AdminRoute = () => {
    const {userInfo} =useSelector((state)=>state.auth);
  return userInfo?.role === "admin" || userInfo?.role === "teacher" ? (<Outlet/>):(<Navigate to = '/login' replace/>)
}

export default AdminRoute
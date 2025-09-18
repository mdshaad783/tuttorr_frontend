import { useState } from "react";
import {
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineBook,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineMessage,
  AiOutlineUnorderedList,
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineArrowRight,
  AiOutlinePlus, AiOutlineTeam
} from "react-icons/ai";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";


const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  
  const navItems = [
    { name: "Dashboard", icon: AiOutlineHome, path: "/" },
    { name: "Assignments", icon: AiOutlineUnorderedList, path: "/assignments" },
    { name: "Announcement", icon: AiOutlineMessage, path: "/announcement" },
  ];
const logoutHandler = async() =>{
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login")
    }catch(error){
        console.error(error);
      }
  }

  return (
    <div className="flex h-screen bg-gray-100 fixed">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col">
        <div className="p-6 font-bold text-xl border-b border-gray-500">
          Tuttorr
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            {navItems.map(({ name, icon: Icon, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  className={`flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    location.pathname === path ? "bg-blue-50 text-blue-600" : ""
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {name}
                </Link>
              </li>
            ))}
          


          {(userInfo?.role === "admin" || userInfo?.role === "teacher") && (
           
            <li className="list-none">
              <Link to="/authority/add-assignments"
                  className={`flex items-center w-full p-3 mt-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    location.pathname === "/add-assignments"
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}>
                  <AiOutlinePlus className="w-5 h-5 mr-3" />
                  Add Assignments
              </Link>
            </li>
          )}
          {(userInfo?.role === "admin") && (
           
            <li className="list-none">
              <Link to="/admin/all-users"
                  className={`flex items-center w-full p-3 mt-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    location.pathname === "/admin/all-users"
                      ? "bg-blue-50 text-blue-600" : ""
                  }`}>
                  <AiOutlineTeam className="w-5 h-5 mr-3" />
                  All Users
              </Link>
            </li>
          )}

          
          {!userInfo && (
            <ul className="space-y-3">
              <li>
                <Link
                  to="/login"
                  className={`flex items-center w-full p-3 mt-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    location.pathname === "/login"
                      ? "bg-blue-50 text-blue-600" : ""
                  }`}
                >
                  <AiOutlineLogin className="w-5 h-5 mr-3" />
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className={`flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    location.pathname === "/register"
                      ? "bg-blue-50 text-blue-600" : ""
                  }`}
                >
                  <AiOutlineUserAdd className="w-5 h-5 mr-3" />
                  Register
                </Link>
              </li>
            </ul>
          )}
          
          {userInfo &&( 
            <button
                  onClick={logoutHandler}
                  className="flex items-center w-full mt-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                >
                  <AiOutlineUser className="w-5 h-5 mr-3" />
                  {userInfo.username}<AiOutlineArrowRight className="ml-2" />
                </button>)}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative w-64 h-screen bg-white shadow-lg flex flex-col">
            <div className="p-6 flex items-center justify-between border-b">
              <span className="font-bold text-xl">Tuttorr</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <nav className="flex-1 p-4">
              <ul className="space-y-3">
                {navItems.map(({ name, icon: Icon, path }) => (
                  <li key={name}>
                    <Link to={path}>
                      <button
                        onClick={() => {
                          setActive(name);
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                          active === name ? "bg-blue-50 text-blue-600" : ""
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {name}
                      </button>
                    </Link>
                  </li>
                ))}
                {(userInfo?.role === "admin" || userInfo?.role === "teacher") && (
           
            <li className="list-none">
              <Link to="/add-assignments"
                  className={`flex items-center w-full p-3 mt-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    location.pathname === "/login"
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}>
                  <AiOutlinePlus className="w-5 h-5 mr-3" />
                  Add Assignments
              </Link>
            </li>
          )}
          {(userInfo?.role === "admin") && (
           
            <li className="list-none">
              <Link to="/admin/all-users"
                  className={`flex items-center w-full p-3 mt-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    location.pathname === "admin/all-users"
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}>
                  <AiOutlineTeam className="w-5 h-5 mr-3" />
                  All Users
              </Link>
            </li>
          )}
              {!userInfo && (
            <ul className="space-y-3">
              <li>
                <Link
                  to="/register"
                  className={`flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    location.pathname === "/register"
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                >
                  <AiOutlineUserAdd className="w-5 h-5 mr-3" />
                  Register
                </Link>
              </li>
            </ul>
          )}
          
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* TopBar */}
      <div className="md:hidden bg-white fixed flex items-center justify-between px-6 shadow-sm h-[4.8rem] top-0 w-full border-b border-gray-300 z-10">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        {userInfo?(<button
                  onClick={logoutHandler}
                  className="md:hidden flex p-2 rounded-lg bg-blue-50 hover:text-blue-500"
                >
                  <AiOutlineUser className="w-5 h-5 mr-1" />
                  {userInfo.username}<AiOutlineArrowRight className="ml-1 mt-1" />
                </button>):(
                  <Link
          to="login"
          className="px-8 py-2 rounded-lg shadow-2xl bg-blue-50 hover:text-blue-500 fixed right-7"
        >
          Login
        </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;

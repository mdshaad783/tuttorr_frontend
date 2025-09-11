import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { Lock, User } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <>
      <div className="mx-auto items-center w-screen md: bg-gray-100 h-screen">
        <div className="flex flex-col mt-20 mx-auto w-full sm:w-[80%] md:w-[60%] lg:w-[50%] gap-4 md:bg-white p-6 rounded-lg md:shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 underline">Sign-In</h1>

          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="flex items-center border rounded border-gray-300">
              <User className="text-gray-400 ml-2" size={20} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e=>setUsername(e.target.value)}
                className="w-full px-2 py-2 outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="flex items-center border rounded border-gray-300">
              <Lock className="text-gray-400 ml-2" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                className="w-full px-2 py-2 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={submitHandler}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer my-2 w-30"
          >
            Sign In
          </button>

          <p className="-mt-4">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?register=${redirect}` : "/register"}
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

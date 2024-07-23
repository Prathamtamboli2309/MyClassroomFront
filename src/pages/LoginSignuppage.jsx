import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginimage from "../assets/login.png";
import { useAppContext } from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = ({ setIsLoggedIn, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [role, setRole] = useState("student");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const Loader = () => (
    <div className="flex justify-center items-center ">
      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-yellow-600"></div>
    </div>
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setIsLoggedIn(true);
      setUser(user);
      navigate("/");
    }
  }, [setIsLoggedIn, navigate, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await axios.post(
          "https://myclassroomback.onrender.com/api/user/login",
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          setIsLoggedIn(true);
          setUser(response.data.user);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("Login successful!");
          navigate("/");
        }
      } else {
        response = await axios.post(
          "https://myclassroomback.onrender.com/api/user/register",
          {
            username,
            email,
            password,
            admissionYear: role === "student" ? admissionYear : null,
            role,
          }
        );

        if (response.status === 201) {
          toast.success("Registration successful! Please log in.");

          setIsLogin(true);
          navigate("/login");
        }
      }

      if (response.status !== 200) {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Authentication failed:", error.message);
      setError("Authentication failed. Please try again later.");
      toast.error("Authentication failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full lg:gap-10">
      <div className="md:block hidden">
        <img src={loginimage} alt="Login" className="w-80" />
      </div>
      <form onSubmit={handleSubmit} className="w-80">
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!isLogin && (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full border rounded py-2 px-3 mb-4"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded py-2 px-3 mb-4"
              required
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
            {role === "student" && (
              <select
                value={admissionYear}
                onChange={(e) => setAdmissionYear(e.target.value)}
                className="w-full border rounded py-2 px-3 mb-4"
                required
              >
                <option value="">Select Admission Year</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            )}
          </>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border rounded py-2 px-3 mb-4"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border rounded py-2 px-3 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;

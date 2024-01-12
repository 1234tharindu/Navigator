import { useState } from "react";
import { logo } from "../../assets";
import { jwtDecode } from "jwt-decode";
import api from "../../api";
import { useNavigate, useOutletContext } from "react-router-dom";
import Error from "./ErrorComp";

const initState = {
  username: "",
  password: "",
  remeberMe: false,
};

const LoginForm = ({ onRegisterClick, onResetClick }) => {
  const [setActive, setUser] = useOutletContext();
  const [error, setError] = useState();
  const [loginData, setLoginData] = useState(initState);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await api.signin(loginData);
      localStorage.setItem("token", data.accessToken);
      setUser(jwtDecode(data.accessToken));
      navigate("/home");
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="rounded-lg pl-[10px] pr-[10px]" onSubmit={handleLogin}>
      <img
        src={logo}
        alt="Logo"
        className="w-[350px] md:mb-[60px] mb-10 mt-[8vh] md:mt"
      />
      <h2 className="md:mb-[40px] mb-[30px] text-2xl font-bold">Login</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-gray-600 ">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          className="mb-[15px] w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="relative mb-4">
        <label className="block mb-2 text-sm font-semibold text-gray-600 ">
          Password
        </label>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          value={loginData.password}
          className="w-full px-3 py-2 pr-8 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
          required
        />
        <div
          className="absolute bottom-[5px] right-[10px]"
          onClick={() => setShowPassword((s) => !s)}
        >
          <ion-icon
            name={showPassword ? "eye-off-outline" : "eye-outline"}
          ></ion-icon>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remberMe"
            value={loginData.remeberMe}
            onChange={handleChange}
            className="w-5 h-5 form-checkbox text-primary2"
          />
          <label className="ml-2 text-sm font-semibold text-gray-600">
            Remember Me
          </label>
        </div>
        <span
          className="text-sm font-semibold text-primary2 hover:underline"
          onClick={onResetClick}
        >
          Forgot Password?
        </span>
      </div>
      <Error error={error} />
      <div className="mt-[30px]" />
      <button
        type="submit"
        className={`px-4 py-2 bg-primary2 hover:bg-primary1 text-white rounded-[15px] focus:outline-none focus:shadow-outline w-full`}
      >
        Log in
      </button>
      <div className="flex justify-center mt-[15px] mb-10 md:mb">
        <div className="pl-[10px]">
          Don't have an account?{" "}
          <span className="text-ColorRed" onClick={onRegisterClick}>
            Register
          </span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

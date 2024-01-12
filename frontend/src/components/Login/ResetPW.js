import { useEffect, useState } from "react";
import VerificationCodeInput from "./VerificationCodeInput";
import api from "../../api";

const initState = {
  employeeNumber: "",
  verificationCode: "",
  password: "",
  confirmPassword: "",
};

const initComponents = {
  getVerificationCode: true,
  submitVerificationCode: false,
  changePassword: false,
};

const time = 120;

const ResetPW = ({ onBackClick }) => {
  const [forgotPasswordData, setForgotPasswordData] = useState(initState);
  const [showComponent, setShowComponent] = useState(initComponents);
  const [userEmail, setUserEmail] = useState();
  const [timeRemaining, setTimeRemaining] = useState(time);
  const PasswordMatch =
    forgotPasswordData.password === forgotPasswordData.confirmPassword;
  const validPassword =
    forgotPasswordData.password.length === 0 ||
    forgotPasswordData.password.length >= 8;

  useEffect(() => {
    if (showComponent.submitVerificationCode) {
      const timer = setInterval(() => {
        setTimeRemaining((t) => {
          if (t > 0) {
            return t - 1;
          } else {
            clearTimeout(timer);
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showComponent]);

  const handleBackClick = () => {
    setTimeRemaining(time);
    setShowComponent(initComponents);
    setForgotPasswordData(initState);
    onBackClick();
  };

  const handleChange = (e) => {
    setForgotPasswordData({
      ...forgotPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetCode = async (e) => {
    e.preventDefault();
    try {
      const data = await api.sendVerificationCode({
        employeeNumber: forgotPasswordData.employeeNumber,
      });
      if (timeRemaining === 0) setTimeRemaining(time);
      setUserEmail(data?.data?.email);
      setShowComponent({
        getVerificationCode: false,
        submitVerificationCode: true,
        changePassword: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitVerificationCode = async (e) => {
    e.preventDefault();
    try {
      await api.submitVerficationCode({
        employeeNumber: forgotPasswordData.employeeNumber,
        verificationCode: forgotPasswordData.verificationCode,
      });

      setShowComponent({
        getVerificationCode: false,
        submitVerificationCode: false,
        changePassword: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await api.changePassword({
        employeeNumber: forgotPasswordData.employeeNumber,
        password: forgotPasswordData.password,
      });
      handleBackClick();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-[350px] max-[350px]:w-[90vw]"></div>
      <div className="flex justify-start mt-8 mb-4 md:mt-0">
        <button
          className="py-1 text-xl rounded-full spx-2 text-primary2 focus:outline-none"
          onClick={handleBackClick}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>
      {showComponent.getVerificationCode && (
        <form onSubmit={handleGetCode}>
          <div className="mb-4 ">
            <input
              type="number"
              name="employeeNumber"
              value={forgotPasswordData.employeeNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="Employee Number"
              required
            />
          </div>
          <button
            type="submit"
            className="w-1/3 px-4 py-2 text-sm text-white rounded bg-primary2 hover:bg-primary1 focus:outline-none focus:shadow-outline"
          >
            Get Code
          </button>
        </form>
      )}
      {showComponent.submitVerificationCode && (
        <form onSubmit={handleSubmitVerificationCode}>
          <div>{userEmail}</div>
          <div className="flex items-center mb-4">
            <VerificationCodeInput
              disabled={timeRemaining === 0}
              name="verificationCode"
              className="justify-center w-full"
              value={forgotPasswordData.verificationCode}
              onChange={handleChange}
              length={6}
              required
            />
            <div className="w-1/6"></div>
          </div>
          <button
            type="submit"
            disabled={timeRemaining === 0}
            className={`w-1/3 px-4 py-2 text-sm text-white rounded ${
              timeRemaining > 0
                ? "bg-primary2 hover:bg-primary1"
                : "bg-gray-400"
            } focus:outline-none focus:shadow-outline`}
          >
            Submit Code
          </button>
          <div className="my-4">
            <p className="text-sm text-gray-600">
              {timeRemaining > 0 ? (
                "Time Remaining: " +
                Math.floor(timeRemaining / 60).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                }) +
                ":" +
                (timeRemaining % 60).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                }) +
                "s"
              ) : (
                <>
                  Your time is over.&nbsp;
                  <span
                    className="text-sm font-semibold cursor-pointer text-primary2 hover:underline"
                    onClick={handleGetCode}
                  >
                    Resend Code ?
                  </span>
                </>
              )}
            </p>
          </div>
        </form>
      )}
      {showComponent.changePassword && (
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={forgotPasswordData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="New Password"
              required
            />
          </div>
          {!PasswordMatch && (
            <p className="text-ColorRed">Passwords don't match!</p>
          )}
          {!validPassword && (
            <p className="text-ColorRed">
              Password must be at least 8 characters long
            </p>
          )}
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={forgotPasswordData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="Confirm New Password"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={!PasswordMatch || !validPassword}
              className="w-full px-4 py-2 text-white rounded bg-primary2 hover:bg-primary1 focus:outline-none focus:shadow-outline"
            >
              Change Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPW;

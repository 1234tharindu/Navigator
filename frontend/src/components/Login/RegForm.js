import { useState, useRef } from "react";
import { User } from "../../assets";
import { ImageEditor } from "../";
import API from "../../api";

const initState = {
  name: "",
  employeeNumber: "",
  email: "",
  nic: "",
  mobileNo: "",
  password: "",
  confirmPassword: "",
};

const RegForm = ({ onBackClick }) => {
  const [profilePictureBin, setProfilePictureBin] = useState();
  const [formData, setFormData] = useState(initState);
  const [originalImage, setOriginalImage] = useState(User);
  const [profilePicture, setProfilePicture] = useState(originalImage);
  const [editingImage, setEditingImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePictureClick = () => {
    if (profilePicture === User && editingImage === null) {
      return;
    }
    setEditingImage(originalImage);
  };

  const handleAddPictureClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setOriginalImage(URL.createObjectURL(file));
      setProfilePicture(URL.createObjectURL(file));
      setProfilePictureBin(file);
      setEditingImage(URL.createObjectURL(file));
    }
  };
  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleImageEditSave = (editedImage) => {
    setProfilePicture(editedImage);
    setEditingImage(null);
  };

  const handleImageEditCancel = () => {
    setEditingImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobileNo)) {
      alert(
        "Mobile number must be 10 digits long and contain only numbers (0771234567)"
      );
      return;
    }

    if (
      !formData.name ||
      !formData.employeeNumber ||
      !formData.email ||
      !formData.mobileNo ||
      !formData.nic
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const register = new FormData();
    register.append("name", formData.name);
    register.append("email", formData.email);
    register.append("employeeNumber", formData.employeeNumber);
    register.append("mobile", formData.mobileNo);
    register.append("nicNumber", formData.nic);
    register.append("password", formData.password);

    if (profilePictureBin) {
      const userImage = dataURLtoFile(profilePicture, profilePictureBin?.name);
      register.append("userImage", userImage);
    }

    try {
      await API.signup(register);
      onBackClick();
    } catch (error) {
      console.log(error);
    }
  };

  const PasswordMatch = formData.password === formData.confirmPassword;

  return (
    <div>
      {editingImage ? (
        <ImageEditor
          image={editingImage}
          onSave={handleImageEditSave}
          onCancel={handleImageEditCancel}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="w-[350px] max-[350px]:w-[90vw]"></div>
          <div className="flex justify-start mt-8 mb-4 md:mt-0">
            <button
              className="py-1 text-xl rounded-full spx-2 text-primary2 focus:outline-none"
              onClick={onBackClick}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-24 h-24 mb-5 rounded-full ">
              <img
                src={profilePicture}
                alt="Profile Pic"
                className="object-cover w-full h-full border-[3px] rounded-full border-primary1 cursor-pointer"
                onClick={handleAddPictureClick}
              />
              <span
                className="absolute w-5 h-5 border-2 rounded-full cursor-pointer bg-primary1 border-primary1 bottom-1 right-1"
                onClick={handleProfilePictureClick}
              >
                <div className="flex items-center justify-center text-center text-white">
                  <ion-icon
                    name="create-outline"
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  ></ion-icon>
                </div>
              </span>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>

          <div className="mb-4 ">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="Employee Number"
              name="employeeNumber"
              value={formData.employeeNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="NIC Number"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="Mobile Number"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!PasswordMatch && (
            <p className="text-ColorRed">Passwords don't match!</p>
          )}
          {formData.password.length > 0 && formData.password.length < 8 && (
            <p className="text-ColorRed">
              Password must be at least 8 characters long
            </p>
          )}
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div classpassword="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 mb-10 text-white rounded bg-primary2 hover:bg-primary1 focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegForm;

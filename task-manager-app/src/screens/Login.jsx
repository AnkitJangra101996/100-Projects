/* 
TODO: Implement Profile Pic Image Functionality
*/

import Logo from "@/assets/logo.gif";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "lucide-react";
import { object, string } from "yup";
import ErrorMessage from "@/components/ErrorMessage";
import { toast } from "sonner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase";
import { Link, useNavigate } from "react-router-dom";
import Lightning from "@/components/Lightning";

const schema = object().shape({
  email: string().email().required(),
  password: string().required().min(6),
  //   profile: string().required(),
});

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    // profile: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   const [preview, setPreview] = useState("");
  //   const imageRef = useRef();

  //   const handleImageChange = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       formData.profile = file;
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setPreview(reader.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormErrors([]);
    setLoading(true);

    try {
      await schema.validate(formData, { abortEarly: false });

      const promise = signInWithEmailAndPassword(
        firebaseAuth,
        formData.email,
        formData.password
      );

      // Toast wrapper
      toast.promise(promise, {
        loading: "Login Started...",
        success: "Successfully Logged In. Redirecting to dashboard...",
        error: "Invalid credentials...",
      });
      await promise;
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = {};
        err.inner.forEach((error) => {
          if (error.path && !errors[error.path]) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8 relative">
        <div className=" py-3 sm:max-w-xs sm:mx-auto">
          <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900  rounded-xl shadow-lg">
            <div className="flex flex-col justify-center items-center h-full select-none gap-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <Link to="/">
                  <img src={Logo} className="w-10" />
                </Link>
                <p className="m-0 text-[16px] font-semibold dark:text-white">
                  Welcome Back
                </p>
                <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                  Get started with our app, just start section and enjoy
                  experience.
                </span>
              </div>
              {/* //! Profile Pic */}
              {/* <Avatar
                onClick={() => imageRef.current.click()}
                className={
                  "w-20 h-20 mb-2 flex justify-center items-center border"
                }
              >
                {preview ? <AvatarImage src={preview} /> : <PlusIcon />}
                <input
                  onChange={handleImageChange}
                  hidden
                  type="file"
                  ref={imageRef}
                  accept="image/*"
                  name="profile"
                />
              </Avatar> */}

              <div className="w-full flex flex-col">
                <label
                  className="font-semibold text-xs text-gray-400 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                  placeholder="Enter Your Email Address"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  disabled={loading}
                />
                {formErrors?.email && (
                  <ErrorMessage message={formErrors.email} />
                )}
              </div>
              <div className="w-full flex flex-col">
                <label
                  className="font-semibold text-xs text-gray-400 mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                  placeholder="Enter Your Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  disabled={loading}
                />
                {formErrors?.password && (
                  <ErrorMessage message={formErrors.password} />
                )}
              </div>
              <div classname="mt-5">
                <Button
                  onClick={handleFormSubmit}
                  className={"w-full"}
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Login"}
                </Button>
              </div>
              <div className="">
                <p className="m-0 text-sm">
                  New User?&nbsp;
                  <Link className="underline" to={"/register"}>
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Input = ({ id, placeholder, type, changeInput }) => {
  return (
    <input
      id={id}
      name={id}
      placeholder={placeholder}
      className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
      type={type}
      onChange={changeInput}
    />
  );
};

export default Login;

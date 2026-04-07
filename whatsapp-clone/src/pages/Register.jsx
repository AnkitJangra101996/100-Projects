// src/pages/Register.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema/authSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase";
import { uploadImage } from "@/services/uploadImage";
import toast from "react-hot-toast";

function Register() {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Handle Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setValue("image", file);
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      let imageUrl = null;

      // Upload image if exists
      if (formData.image) {
        imageUrl = await uploadImage(formData.image, data.user?.id);
        toast.success("Image uploaded successfully!");
      }

      await supabase.from("users").insert([
        {
          id: data.user?.id,
          name: formData.name,
          email: formData.email,
          avatar_url: imageUrl,
        },
      ]);

      toast.success("Registration successful! Navigating to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {/* //TODO Avatar Upload */}
        <div className="flex flex-col items-center mb-4">
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-dashed">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm text-gray-500">Upload</span>
              )}
            </div>

            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Input
              placeholder="Full Name"
              {...register("name")}
              disabled={loading}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>

          {/* Email */}
          <div>
            <Input
              placeholder="Email"
              {...register("email")}
              disabled={loading}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              disabled={loading}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className={`text-blue-500 hover:underline ${loading ? "pointer-events-none text-gray-500" : "pointer-events-auto"}`}
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;

function ErrorMessage({ message }) {
  return <p className="text-red-500 text-sm pl-3 mt-1">{message}</p>;
}

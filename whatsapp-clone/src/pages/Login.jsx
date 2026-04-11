import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login successful! Navigating to home...");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log("Error during login:", error);
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
        <h2 className="text-2xl font-bold text-center mb-6">Login </h2>
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {loading ? "Login..." : "Login"}
          </Button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className={`text-blue-500 hover:underline ${loading ? "pointer-events-none text-gray-500" : "pointer-events-auto"}`}
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;

function ErrorMessage({ message }) {
  return <p className="text-red-500 text-sm pl-3 mt-1">{message}</p>;
}

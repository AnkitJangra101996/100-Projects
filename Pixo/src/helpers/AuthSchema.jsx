import { object, string } from "yup";

export const register = object({
  name: string().required("Please Enter Your Full Name"),
  email: string()
    .required("Please Enter Your Email")
    .email("Please Provide Valid Email"),
  password: string()
    .required("Please Enter Your Password")
    .min(6, "Password Must Be Of 6 Characteres"),
  profile: string().required("Please Choose Your Profile Pic."),
});

export const loginSchema = object({
  email: string()
    .required("Please Enter Your Email")
    .email("Please Provide Valid Email"),
  password: string().required("Please Enter Your Password"),
});

import { toast } from "sonner";
import { loginSchema, register } from "./AuthSchema";
import { supabase } from "@/supabase";

export const createUser = async (formdata) => {
  const { name, email, password, profileFile } = formdata;
  try {
    await register.validate(formdata);

    const uniqueImageName = `${name.replaceAll(" ", "-")}-${Date.now()}.${
      profileFile.name.split(".")[1]
    }`;

    //! Upload image on server
    const { data } = await supabase.storage
      .from("user-avatar")
      .upload(uniqueImageName, profileFile, { upsert: false });

    if (!data?.path) throw new Error("Error in uploading profile pic");

    const {
      data: { publicUrl },
    } = supabase.storage.from("user-avatar").getPublicUrl(data.path);

    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name, profile_pic: publicUrl } },
    });

    if (error) throw new Error("Error in creating profile...");

    return signUpData;
  } catch (error) {
    toast.error(error?.message);
  }
};

export const loginUser = async (formdata) => {
  const { email, password } = formdata;
  try {
    await loginSchema.validate(formdata);

    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return loginData;
  } catch (error) {
    throw new Error(error.message);
  }
};

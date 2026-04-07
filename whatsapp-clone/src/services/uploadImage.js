import { supabase } from "./supabase";

export const uploadImage = async (file, userId) => {
  const fileName = `${userId}-${Date.now()}`;

  const { error } = await supabase.storage
    .from("profile-image")
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("profile-image")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

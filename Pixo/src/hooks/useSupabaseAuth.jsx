import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/AuthSlicer";
import { supabase } from "@/supabase";

export const useSupabaseAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setAuthUser(session?.user || null));
    });

    // 2. Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      dispatch(setAuthUser(session?.user || null));
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [dispatch]);
};

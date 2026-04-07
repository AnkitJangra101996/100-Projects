import { loginSuccess } from "@/features/auth";
import { supabase } from "@/services/supabase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useAuthInit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          dispatch(loginSuccess(session.user));
        }
      } catch (error) {
        console.log("Error fetching session:", error);
      }
    };

    getSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          dispatch(loginSuccess(session.user));
        } else if (event === "SIGNED_OUT") {
          dispatch(loginSuccess(null));
        }
      },
    );

    // Cleanup listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);
};

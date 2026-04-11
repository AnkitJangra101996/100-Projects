import { messageReceived } from "@/features/messages";
import { supabase } from "@/services/supabase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useRealtimeMessages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          dispatch(messageReceived(payload.new));
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  });
};

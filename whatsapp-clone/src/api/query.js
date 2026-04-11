import { supabase } from "@/services/supabase";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    getPrevChats: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("conversations")
          .select(
            `id,last_message_at,last_message:messages!conversations_last_message_id_fkey(content,sender_id), participants:conversation_participants(users(id, name, avatar_url))`,
          )
          .order("last_message_at", { ascending: false });

        if (error) return { error };
        return { data };
      },
    }),
    // getSearchUsers: builder.mutation({
    //   queryFn: async ({ value, userId }) => {
    //     console.log(value, userId);
    //     const { data, error } = await supabase
    //       .from("users")
    //       .select("*")
    //       .ilike("name", `%${value}%`)
    //       .neq("id", userId)
    //       .limit(5)
    //       .order("created_at", { ascending: false });
    //     if (error) return { error };
    //     return { data };
    //   },
    // }),
  }),
});

export const { useGetPrevChatsQuery } = chatApi;

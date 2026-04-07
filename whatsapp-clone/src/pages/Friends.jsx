import { friends } from "@/data/friends";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import FriendsCard from "@/components/FriendsCard";
import { useDispatch, useSelector } from "react-redux";
import { loadRequests } from "@/store/friendThunks";
import { Spinner } from "@/components/ui/spinner";

const Friends = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { loading, requests = [] } = useSelector((state) => state.friends);

  useEffect(() => {
    if (user) dispatch(loadRequests(user.id));
  }, [user]);

  return (
    <>
      <div className="flex flex-col gap-4 p-4 w-full chat-window">
        <div className="flex items-center gap-4 flex-col">
          <h1 className="text-xl sm:text-2xl font-bold">Friends Request</h1>
          {loading ? (
            <Spinner className="size-8" />
          ) : requests.length === 0 ? (
            <h1 className="text-xl">No Pending Friends Requests</h1>
          ) : (
            <>
              {requests?.map((request) => (
                <FriendsCard data={request} key={request.id} />
              ))}
            </>
          )}
        </div>
        <hr />
        <div className="flex items-center gap-4 flex-col">
          <h1 className="text-xl sm:text-2xl font-bold">Suggested Friends</h1>
          <FriendsCard data={friends[0]} />
          <Button variant="secondary">Suggest New Friend</Button>
        </div>
        <hr />
        <div className="flex items-center gap-4 flex-col">
          <h1 className="text-xl sm:text-2xl font-bold">All Friends List</h1>
          {friends.slice(0, 4).map((frined, index) => (
            <FriendsCard data={frined} key={index} />
          ))}
        </div>
        <div className="min-h-[50px]"></div>
      </div>
    </>
  );
};

export default Friends;

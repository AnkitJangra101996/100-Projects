import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";

const getUsernameFallback = (firstname, lastname) => {
  if (firstname && lastname) {
    return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
  } else if (firstname[0] && firstname[1]) {
    return `${firstname[0].toUpperCase()}${firstname[1].toUpperCase()}`;
  }
  return "";
};

const FriendsCard = ({ data, actionsRequired = false }) => {
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader
        className={
          "gap-4 grid-flow-row grid-rows-2 flex items-center justify-between"
        }
      >
        <div className="flex flex-row gap-4 items-center">
          <Avatar size="lg">
            <AvatarImage
              src={data.image}
              alt="user profile"
              className="grayscale"
            />
            <AvatarFallback>
              {getUsernameFallback(data.firstName, data.lastName)}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{`${data.firstName} ${data.lastName}`}</CardTitle>
        </div>
        <Button variant="secondary">Visit Profile</Button>
      </CardHeader>
      <CardFooter>
        {actionsRequired ? (
          <>
            <div className="flex flex-row items-center w-full justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full max-w-[45%] "
              >
                Accept
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full max-w-[45%]"
              >
                Reject
              </Button>
            </div>
          </>
        ) : (
          <Button variant="outline" size="sm" className="w-full">
            Send Friend Request
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FriendsCard;

import FormInputField from "@/components/FormInputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/helpers/Auth";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useSelector } from "react-redux";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileFile, setProfileFile] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: () => {
      setData({
        name: "",
        email: "",
        password: "",
      });
      setProfileFile(null);
      setProfileUrl(null);
      toast.success("Profile Created. Please Login...");
      setTimeout(() => navigate("/login"), 1000);
    },
  });

  //! Handle Profile Change Func
  const handleProfileChange = ({ target }) => {
    setProfileFile(target.files[0]);
    const reader = new FileReader();
    reader.onload = function () {
      setProfileUrl(reader.result);
    };
    reader.readAsDataURL(target.files[0]);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Card className="w-full max-w-sm bg-transparent shadow-lg backdrop-blur-md">
      <CardHeader>
        <CardTitle>Create An Account</CardTitle>
        <CardDescription>Create Your Profile With Us</CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </CardAction>
      </CardHeader>
      {/* //! Form */}
      <CardContent>
        <div className="flex flex-col gap-3">
          {profileUrl && (
            <div className="flex justify-center">
              <img src={profileUrl} className="w-18 h-17 rounded-full" />
            </div>
          )}
          <FormInputField
            label={"Full Name"}
            name={"name"}
            placeholder={"Enter Your Full Name"}
            setData={setData}
            data={data}
            disabled={isPending}
          />
          <FormInputField
            label={"Email Address"}
            name={"email"}
            placeholder={"Enter Your Email"}
            setData={setData}
            data={data}
            disabled={isPending}
          />
          <FormInputField
            label={"Password"}
            name={"password"}
            placeholder={"Enter Your password"}
            setData={setData}
            data={data}
            type="password"
            disabled={isPending}
          />{" "}
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="profile" className="text-sm">
              Profile Pic
            </Label>
            <Input
              id="profile"
              type="file"
              name={"profile"}
              accept="image/*"
              onChange={handleProfileChange}
              disabled={isPending}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {isPending ? (
          <>
            <Button className="w-full" disabled>
              <Loader2Icon className="animate-spin" />
              Creating Your Accunt....
            </Button>
          </>
        ) : (
          <>
            <Button
              className="w-full"
              onClick={() =>
                mutate({ ...data, profile: profileUrl, profileFile })
              }
            >
              Create My Account
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default Register;

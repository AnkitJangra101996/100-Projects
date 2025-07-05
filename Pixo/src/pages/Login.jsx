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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/helpers/Auth";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: () => {
      setData({
        email: "",
        password: "",
      });
      toast.success("Login Successful...");
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Card className="w-full max-w-sm bg-transparent shadow-lg backdrop-blur-md">
      <CardHeader>
        <CardTitle>Login Your Account</CardTitle>
        <CardDescription>Enter Your Email And Password</CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/register")}>
            Sign In
          </Button>
        </CardAction>
      </CardHeader>
      {/* //! Form */}
      <CardContent>
        <div className="flex flex-col gap-3">
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
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {isPending ? (
          <>
            <Button className="w-full" disabled>
              <Loader2Icon className="animate-spin" />
              Logging in....
            </Button>
          </>
        ) : (
          <>
            <Button className="w-full" onClick={() => mutate(data)}>
              Login
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default Login;

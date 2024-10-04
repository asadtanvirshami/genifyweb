"use client";
import React, { memo } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { userSigninRequest } from "@/api/user/user-api";
import { userSigninGoogleRequest } from "@/api/user/user-api";
import { useToast } from "@/hooks/use-toast";
import { tokenCookie } from "@/utils/user-cache";
import { useRouter } from "next/navigation";

// Define the shape of the post data
interface Credentials {
  email: string;
  password: string;
}

interface Error {
  email: boolean;
  password: boolean;
}

const Auth = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = React.useState<Error>({
    email: false,
    password: false,
  });
  const [credentials, setCredentials] = React.useState<Credentials>({
    email: "",
    password: "",
  });

  const handleSuccess = async (credentialResponse: any) => {
    console.log(credentialResponse?.credential);
    const request = await userSigninGoogleRequest(credentialResponse);
    if (!request?.error && request?.data?.success) {
      await tokenCookie(request?.data?.token);
      toast({
        variant: "success",
        title: "Sign in with google is successful",
        description: "Redirecting to the dashboard.",
        duration: 800,
      });
      router.push("/dashboard");
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  React.useMemo(() => {
    if (credentials.email.length > 3) {
      setError({ ...error, email: false });
    }
    if (credentials.password.length > 3) {
      setError({ ...error, password: false });
    }
  }, [credentials]);

  const handleSignin = async (e: HTMLFormElement) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError({ email: true, password: true });
      return;
    }

    const request = await userSigninRequest(
      credentials.email,
      credentials.password
    );

    if (request?.error) {
      toast({
        variant: "destructive",
        title: "Sign In failed",
        description: "Incorrect email or password.",
        duration: 800,
      });
    }

    if (!request?.error && request?.data?.success) {
      await tokenCookie(request?.data?.token);
      toast({
        variant: "success",
        title: "Sign In successful",
        description: "Redirecting to the dashboard.",
        duration: 800,
      });
      router.push("/dashboard");
    }
  };

  return (
    <div
      data-cy="main-grid"
      className="grid items-center justify-center h-screen w-screen"
    >
      <div className="lg:grid bg-gradient-to-r from-sky-400 to-blue-500 lg:grid-cols-2 xl:grid xl:grid-cols-3 md:grid grid-cols-2 w-screen">
        <div className="hidden sm:flex h-screen align-middle justify-center items-center xl:col-span-2">
          <div className="justify-center align-middle items-center">
            {/* <h1 className="mx-auto text-8xl font-bold text-rose-500"> */}
            <h1 className="mx-auto text-[20rem] font-semibold text-white">
              Genify.
            </h1>
          </div>
        </div>
        <div className="flex h-screen align-middle justify-center items-center bg-white">
          <div className=" justify-center align-middle">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle className="text-3xl text-gray-800">Signin</CardTitle>
                <CardDescription>
                  Enter your account credentials to signin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e: any) => {
                    handleSignin(e);
                  }}
                >
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            email: e.target.value,
                          })
                        }
                        className={
                          error.email
                            ? "border border-w-[0.5px] border-red-500"
                            : "border"
                        }
                        id="email"
                        placeholder="example@gmail.com"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                        id="password"
                        placeholder="*********"
                        className={
                          error.password
                            ? "border border-w-[0.5px] border-red-500"
                            : "border"
                        }
                      />
                    </div>
                    <hr></hr>
                    <div className="mx-auto">
                      <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        useOneTap
                      />
                    </div>
                  </div>
                  <div className="text-sm mt-4">
                    Click here to{" "}
                    <Link href={"/auth/signup"} className="text-blue-500">
                      create account.
                    </Link>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      type="submit"
                      className=" bg-gradient-to-r from-sky-400 to-blue-500"
                    >
                      Continue
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Auth);

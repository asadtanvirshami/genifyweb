import React, { memo } from "react";
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

import { ArrowRightIcon } from "@radix-ui/react-icons";

const Auth = () => {
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
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="example@gmail.com" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Password</Label>
                      <Input id="email" placeholder="*********" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className=" bg-gradient-to-r from-sky-400 to-blue-500">
                  Continue
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Auth);

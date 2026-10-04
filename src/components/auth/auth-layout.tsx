"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

type Props = {};

const AuthLayout = (props: Props) => {
  const [activeTab, setactiveTab] = useState("login");

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
        <h1 className="text-2xl font-mono text-center mb-5">Welcome !</h1>

        <Tabs
          defaultValue={activeTab}
          onValueChange={setactiveTab}
          className="w-full"
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onSuccess={() => setactiveTab("login")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthLayout;

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import z from "zod";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address !"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (values: LoginFormValues) => {
    setisLoading(true);
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      {...form}
      onSubmit={form.handleSubmit(onLoginSubmit)}
      className="space-y-4"
    >
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> */}
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <Label>Email</Label>
            <Input
              className="w-full py-1.5 px-2 border border-gray-500 rounded"
              placeholder="Enter your email"
              {...field}
            />

            {fieldState.error && (
              <p className="text-red-500 text-[12px]">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <Label>Password</Label>
            <Input
              className="w-full py-1.5 px-2 border border-gray-500 rounded"
              placeholder="Enter your password"
              {...field}
            />

            {fieldState.error && (
              <p className="text-red-500 text-[12px]">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />

      <Button
        type="submit"
        className="w-full font-semibold text-lg"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log In"}
      </Button>
      {/* </form> */}
    </Form>
  );
};

export default LoginForm;

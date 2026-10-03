import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import z from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be atleast 3 characters long"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be atleast 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = (props: Props) => {
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterSubmit = async (values: RegisterFormValues) => {
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
      className="space-y-4"
      onSubmit={form.handleSubmit(onRegisterSubmit)}
    >
      {/* <form action="" className="space-y-4"> */}
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <Label>Name</Label>
            <Input
              className="w-full py-1.5 px-2 border border-gray-500 rounded"
              placeholder="Enter your full name"
              {...field}
            />
            {fieldState.error && (
              <p className="text-red-500 text-[12px]">
                {fieldState.error.message}
              </p>
            )}

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Label>Email</Label>
                  <Input
                    className="w-full py-1.5 px-2 border border-gray-500 rounded"
                    placeholder="Enter your valid email"
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

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Label>Confirm Password</Label>
                  <Input
                    className="w-full py-1.5 px-2 border border-gray-500 rounded"
                    placeholder="Re-Enter your password"
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
          </>
        )}
      />

      <Button
        type="submit"
        className="w-full font-semibold text-lg"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
      {/* </form> */}
    </Form>
  );
};

export default RegisterForm;

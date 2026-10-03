// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { useState } from "react";
// import { Controller, Form, useForm } from "react-hook-form";
// import z from "zod";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// const registerSchema = z
//   .object({
//     name: z.string().min(3, "Name must be atleast 3 characters long"),
//     email: z.string().email("Please enter a valid email address"),
//     password: z.string().min(6, "Password must be atleast 6 characters long"),
//     confirmPassword: z
//       .string()
//       .min(6, "Password must be atleast 6 characters long"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Password does not match",
//     path: ["confirmPassword"],
//   });

// type RegisterFormValues = z.infer<typeof registerSchema>;

// const RegisterForm = (props: Props) => {
//   const [isLoading, setisLoading] = useState(false);

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onRegisterSubmit = async (values: RegisterFormValues) => {
//     setisLoading(true);
//     try {
//       console.log(values);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Form
//       {...form}
//       className="space-y-4"
//       onSubmit={form.handleSubmit(onRegisterSubmit)}
//     >
//       {/* <form action="" className="space-y-4"> */}
//       <Controller
//         name="name"
//         control={form.control}
//         render={({ field, fieldState }) => (
//           <>
//             <Label>Name</Label>
//             <Input
//               className="w-full py-1.5 px-2 border border-gray-500 rounded"
//               placeholder="Enter your full name"
//               {...field}
//             />
//             {fieldState.error && (
//               <p className="text-red-500 text-[12px]">
//                 {fieldState.error.message}
//               </p>
//             )}

//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <>
//                   <Label>Email</Label>
//                   <Input
//                     className="w-full py-1.5 px-2 border border-gray-500 rounded"
//                     placeholder="Enter your valid email"
//                     {...field}
//                   />
//                   {fieldState.error && (
//                     <p className="text-red-500 text-[12px]">
//                       {fieldState.error.message}
//                     </p>
//                   )}
//                 </>
//               )}
//             />

//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <>
//                   <Label>Password</Label>
//                   <Input
//                     className="w-full py-1.5 px-2 border border-gray-500 rounded"
//                     placeholder="Enter your password"
//                     {...field}
//                   />
//                   {fieldState.error && (
//                     <p className="text-red-500 text-[12px]">
//                       {fieldState.error.message}
//                     </p>
//                   )}
//                 </>
//               )}
//             />

//             <Controller
//               name="confirmPassword"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <>
//                   <Label>Confirm Password</Label>
//                   <Input
//                     className="w-full py-1.5 px-2 border border-gray-500 rounded"
//                     placeholder="Re-Enter your password"
//                     {...field}
//                   />
//                   {fieldState.error && (
//                     <p className="text-red-500 text-[12px]">
//                       {fieldState.error.message}
//                     </p>
//                   )}
//                 </>
//               )}
//             />
//           </>
//         )}
//       />

//       <Button
//         type="submit"
//         className="w-full font-semibold text-lg"
//         disabled={isLoading}
//       >
//         {isLoading ? "Creating Account..." : "Create Account"}
//       </Button>
//       {/* </form> */}
//     </Form>
//   );
// };

// export default RegisterForm;

"use client";

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

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setIsLoading(true);

    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Form
      {...form}
      onSubmit={form.handleSubmit(onRegisterSubmit)}
      className="w-full space-y-5"
    >
      {/* Full Name */}
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <Label
              className="
                mb-2
                block
                text-[13px]
                font-medium
                text-[#dedee1]
              "
            >
              Full Name
            </Label>

            <div className="relative">
              {/* User Icon */}
              <svg
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  z-10
                  h-[17px]
                  w-[17px]
                  -translate-y-1/2
                  text-[#6f6f76]
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="8" r="3" />
                <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
              </svg>

              <Input
                type="text"
                placeholder="Enter your full name"
                {...field}
                className={`
                  h-11
                  w-full
                  rounded-full
                  border
                  bg-[#222225]
                  pl-11
                  pr-4
                  text-[13px]
                  text-[#e7e7e9]
                  placeholder:text-[#717177]
                  outline-none
                  transition-colors
                  focus:ring-0
                  ${
                    fieldState.error
                      ? "border-red-500 focus:border-red-500"
                      : "border-transparent focus:border-[#3a3a3f]"
                  }
                `}
              />
            </div>

            {fieldState.error && (
              <p className="mt-1.5 px-1 text-[11px] text-red-400">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <Label
              className="
                mb-2
                block
                text-[13px]
                font-medium
                text-[#dedee1]
              "
            >
              Email Address
            </Label>

            <div className="relative">
              {/* Email Icon */}
              <svg
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  z-10
                  h-[17px]
                  w-[17px]
                  -translate-y-1/2
                  text-[#6f6f76]
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>

              <Input
                type="email"
                placeholder="Enter your email address"
                {...field}
                className={`
                  h-11
                  w-full
                  rounded-full
                  border
                  bg-[#222225]
                  pl-11
                  pr-4
                  text-[13px]
                  text-[#e7e7e9]
                  placeholder:text-[#717177]
                  outline-none
                  transition-colors
                  focus:ring-0
                  ${
                    fieldState.error
                      ? "border-red-500 focus:border-red-500"
                      : "border-transparent focus:border-[#3a3a3f]"
                  }
                `}
              />
            </div>

            {fieldState.error && (
              <p className="mt-1.5 px-1 text-[11px] text-red-400">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <div className="mb-2 flex items-center justify-between">
              <Label
                className="
                  text-[13px]
                  font-medium
                  text-[#dedee1]
                "
              >
                Password
              </Label>

              <span className="text-[10px] text-[#77777e]">
                Min. 6 characters
              </span>
            </div>

            <div className="relative">
              {/* Lock Icon */}
              <svg
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  z-10
                  h-[17px]
                  w-[17px]
                  -translate-y-1/2
                  text-[#6f6f76]
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                <circle cx="12" cy="15.5" r="1" />
              </svg>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                {...field}
                className={`
                  h-11
                  w-full
                  rounded-full
                  border
                  bg-[#222225]
                  pl-11
                  pr-12
                  text-[13px]
                  text-[#e7e7e9]
                  placeholder:text-[#717177]
                  outline-none
                  transition-colors
                  focus:ring-0
                  ${
                    fieldState.error
                      ? "border-red-500 focus:border-red-500"
                      : "border-transparent focus:border-[#3a3a3f]"
                  }
                `}
              />

              {/* Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-[#707076]
                  transition-colors
                  hover:text-[#a0a0a5]
                "
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.5 4 9.5 6-0.4.8-1.3 2.1-2.7 3.4" />
                    <path d="M6.6 6.6C4.7 7.8 3.4 9.4 2.5 11c1 2 4.5 6 9.5 6 1 0 1.9-.2 2.8-.5" />
                  </svg>
                ) : (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            <div className="mt-2 flex gap-1.5">
              <div className="h-[3px] flex-1 rounded-full bg-[#363639]" />
              <div className="h-[3px] flex-1 rounded-full bg-[#363639]" />
              <div className="h-[3px] flex-1 rounded-full bg-[#363639]" />
              <div className="h-[3px] flex-1 rounded-full bg-[#363639]" />
            </div>

            <p className="mt-1 text-right text-[10px] text-[#77777e]">
              Use 8+ characters with mixed symbols
            </p>

            {fieldState.error && (
              <p className="mt-1 px-1 text-[11px] text-red-400">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <Label
              className="
                mb-2
                block
                text-[13px]
                font-medium
                text-[#dedee1]
              "
            >
              Confirm Password
            </Label>

            <div className="relative">
              {/* Shield Icon */}
              <svg
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  z-10
                  h-[17px]
                  w-[17px]
                  -translate-y-1/2
                  text-[#6f6f76]
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>

              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                {...field}
                className={`
                  h-11
                  w-full
                  rounded-full
                  border
                  bg-[#222225]
                  pl-11
                  pr-12
                  text-[13px]
                  text-[#e7e7e9]
                  placeholder:text-[#717177]
                  outline-none
                  transition-colors
                  focus:ring-0
                  ${
                    fieldState.error
                      ? "border-red-500 focus:border-red-500"
                      : "border-transparent focus:border-[#3a3a3f]"
                  }
                `}
              />

              {/* Confirm Password Visibility */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-[#707076]
                  transition-colors
                  hover:text-[#a0a0a5]
                "
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.5 4 9.5 6-0.4.8-1.3 2.1-2.7 3.4" />
                    <path d="M6.6 6.6C4.7 7.8 3.4 9.4 2.5 11c1 2 4.5 6 9.5 6 1 0 1.9-.2 2.8-.5" />
                  </svg>
                ) : (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                )}
              </button>
            </div>

            {fieldState.error && (
              <p className="mt-1.5 px-1 text-[11px] text-red-400">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Terms */}
      <p className="text-[11px] leading-5 text-[#77777e]">
        By creating an account, you agree to Chronicle&apos;s{" "}
        <button type="button" className="text-[#e6e6e8] hover:underline">
          Terms of Service
        </button>{" "}
        and{" "}
        <button type="button" className="text-[#e6e6e8] hover:underline">
          Privacy Policy
        </button>
        .
      </p>

      {/* Create Account Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="
          mt-1
          h-11
          w-full
          rounded-full
          border-0
          bg-[#f4f4f5]
          text-[13px]
          font-medium
          text-[#111113]
          shadow-[0_0_20px_rgba(255,255,255,0.08)]
          transition-all
          hover:bg-white
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isLoading ? (
          "Creating Account..."
        ) : (
          <span className="flex items-center justify-center gap-2">
            Create Account
            <span className="text-[17px] leading-none">→</span>
          </span>
        )}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-[#303034]" />

        <span className="whitespace-nowrap text-[10px] font-medium tracking-wide text-[#6d6d73]">
          OR CONTINUE WITH
        </span>

        <div className="h-px flex-1 bg-[#303034]" />
      </div>

      {/* Social Registration */}
      <div className="grid grid-cols-2 gap-3">
        {/* Google */}
        <button
          type="button"
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[#222225]
            text-[#aaaab0]
            transition-colors
            hover:bg-[#29292c]
          "
        >
          <span className="text-[16px] font-semibold">G</span>

          <span className="text-[11px]">Google</span>
        </button>

        {/* GitHub */}
        <button
          type="button"
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[#222225]
            text-[#aaaab0]
            transition-colors
            hover:bg-[#29292c]
          "
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.91c.58.1.79-.25.79-.56v-2.17c-3.22.7-3.9-1.55-3.9-1.55-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.57-.29-5.28-1.29-5.28-5.74 0-1.27.45-2.31 1.2-3.13-.12-.3-.52-1.49.11-3.1 0 0 .98-.31 3.17 1.19a10.95 10.95 0 0 1 5.77 0c2.19-1.5 3.17-1.19 3.17-1.19.63 1.61.23 2.8.11 3.1.75.82 1.2 1.86 1.2 3.13 0 4.46-2.72 5.45-5.3 5.73.42.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
          </svg>

          <span className="text-[11px]">GitHub</span>
        </button>
      </div>

      {/* Sign In */}
      <p className="pt-5 text-center text-[12px] text-[#77777e]">
        Already have an account?{" "}
        <button
          type="button"
          className="
            font-medium
            text-[#e6e6e8]
            transition-colors
            hover:text-white
          "
        >
          Sign in →
        </button>
      </p>
    </Form>
  );
};

export default RegisterForm;

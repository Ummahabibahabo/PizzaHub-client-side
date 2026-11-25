"use client";

import { authClient } from "@/lib/auth-client";
import { Pizza, X, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SigninPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  // Redirect according to user role
 const handleRoleRedirect = (role?: string) => {
   if (role === "admin") {
     router.push("/dashboard/admin");
   } else if (role === "vendor") {
     router.push("/dashboard/vendor");
   } else if (role === "customer") {
     router.push("/dashboard/customer");
   } else {
     router.push("/signIn");
   }
 };

  // Credential Login
  const handleSignInBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const currentUser = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { error } = await authClient.signIn.email({
      email: currentUser.email,
      password: currentUser.password,
    });

    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }

    // Get logged-in user information
    const { data: session, error: sessionError } =
      await authClient.getSession();

    if (sessionError || !session?.user) {
      toast.error("Unable to get user information");
      return;
    }

    const role = (session.user as typeof session.user & { role?: string }).role;

    toast.success("Successfully logged in!");

    handleRoleRedirect(role);
  };

  // Close Button
  const handleClose = () => {
    router.push("/");
  };

  // Show / Hide Password
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  // Google Login
  const handleGoogleBtn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/auth/redirect",
    });

    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      {/* Signin Card */}
      <form
        onSubmit={handleSignInBtn}
        className="relative w-full max-w-md bg-[#FBFAF3] rounded-2xl p-6 sm:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-7 right-7 text-[#554D46] hover:text-[#A53A37] transition"
        >
          <X size={21} />
        </button>

        {/* Logo */}
        <div className="mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#A53A37] flex items-center justify-center shadow-sm">
            <Pizza size={26} className="text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-[34px] font-serif text-[#302923]">
            Login
          </h2>

          <p className="text-sm text-[#82766C] mt-2">
            Welcome back to PizzaHub.
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#554D46] mb-2">
            Email address
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="w-full h-11 px-3 rounded-lg border border-[#E8E2D8] bg-white text-[#302923] placeholder:text-[#A69D95] outline-none focus:border-[#A53A37] transition"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#554D46] mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full h-11 px-3 pr-11 rounded-lg border border-[#E8E2D8] bg-white text-[#302923] placeholder:text-[#A69D95] outline-none focus:border-[#A53A37] transition"
            />

            {/* Show / Hide Button */}
            <button
              type="button"
              onClick={handlePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#82766C] hover:text-[#A53A37] transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
            </button>
          </div>
        </div>

        {/* Signin Button */}
        <button
          type="submit"
          className="w-full h-11 rounded-lg bg-[#C83D3D] hover:bg-[#A53A37] text-white font-semibold text-sm transition-all duration-300 shadow-sm"
        >
          Sign In <span className="ml-2">→</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-px bg-[#E8E2D8]"></div>
          <span className="text-xs font-medium text-[#A69D95]">OR</span>
          <div className="flex-1 h-px bg-[#E8E2D8]"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleBtn}
          type="button"
          className="w-full h-11 rounded-lg border border-[#E8E2D8] bg-white hover:bg-[#F8F5EF] text-[#554D46] font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-300"
        >
          <FcGoogle size={21} />
          Continue with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-xs text-[#82766C] mt-5">
          Don't have an account?{" "}
          <Link
            href="/signUp"
            className="font-semibold text-[#A53A37] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SigninPage;

"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import axios from "axios";


export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await axios.post("/api/auth", data);
      console.log("Login response:", res);
      if (res.status === 200) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-[#2a2a2a] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <Input
              type="username"
              id="username"
              placeholder="Enter your email"
              {...register("username")}
              className="mt-1 w-full bg-[#1e1e1e] border-gray-600 text-white"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              className="mt-1 w-full bg-[#1e1e1e] border-gray-600 text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" variant="ghost" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// type LoginFormValues = {
//   email: string;
//   password: string;
// };
interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      setError("");

      console.log("Attempting login with:", values.email); // Debug log

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // Important: handle redirect manually
        callbackUrl: callbackUrl,
      });

      console.log("SignIn result:", result); // Debug log

      if (result?.error) {
        setError("Invalid email or password");
        console.error("SignIn error:", result.error);
      } else if (result?.ok) {
        // Verify session was created
        const session = await getSession();
        console.log("Session after login:", session); // Debug log
        
        if (session) {
          console.log("Login successful, redirecting to:", callbackUrl);
          router.push(callbackUrl);
          router.refresh(); // Refresh to update auth state
        } else {
          setError("Login failed - no session created");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-center">Login</h2>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-2">
              Login
            </Button>

            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-16 bg-gray-300" />
              <span className="text-sm text-gray-500">Portfolio</span>
              <div className="h-px w-16 bg-gray-300" />
            </div>
          </form>
        </Form>
        
      </div>
    </div>
  );
}
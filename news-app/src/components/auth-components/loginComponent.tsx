"use client";

import * as Yup from "yup";
import Link from "next/link";
import { useEffect } from "react";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "@/redux/store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    const isLoggedIn = document.cookie.includes("isLoggedIn=true");
    if (isLoggedIn) {
      router.replace("/dashboard/news-page");
    }
  }, [router]);

    const handleSubmit = (values: any) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    const user = users.find((u: any) => u.email === values.email && u.password === values.password);

    if (!user) {
      toast.error("Invalid email or password", { style: { background: "#000", color: "#fff" } });
      return;
    }

    document.cookie = "isLoggedIn=true; path=/";

    localStorage.setItem("userData", JSON.stringify(user));

    dispatch(login(user));

    toast.success("Logged in successfully!", { style: { background: "#000", color: "#fff" } });

    router.push("/dashboard/news-page");
  };


  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[url('/newsimgs.jpg')] bg-cover bg-center">
      <Toaster position="top-center" />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative w-full max-w-md p-4">
        <div className="text-center mb-8">
          <span className="text-2xl font-semibold text-white">Login</span>
        </div>

        <Card className="border-border bg-black shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white font-bold">Welcome back</CardTitle>
            <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
          </CardHeader>

          <CardContent>
            <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground ${
                        errors.password && touched.password ? "border-red-500" : ""
                      }`}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>

                  <Button type="submit" className="w-full" size="lg">Sign In</Button>
                </Form>
              )}
            </Formik>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-white font-medium">Sign up</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

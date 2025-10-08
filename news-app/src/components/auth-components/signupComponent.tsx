"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as Yup from "yup";
import Link from "next/link";
import Cookies from "js-cookie";    
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { login } from "@/redux/store/userSlice";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignUpComponent() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";
    if (isLoggedIn) router.replace("/dashboard/news-page");
  }, [router]);

 const handleSubmit = (values: any) => {
  const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

  if (users.find((u: any) => u.email === values.email)) {
    toast.error("Email already exists!", { style: { background: "#000", color: "#fff" } });
    return;
  }

  const userData = {
    name: values.name,
    email: values.email,
    password: values.password,
  };

  users.push(userData);   
  localStorage.setItem("registeredUsers", JSON.stringify(users));
  localStorage.setItem("userData", JSON.stringify(userData));

  Cookies.set("isLoggedIn", "true", { path: "/", sameSite: "Lax", secure: false });

  dispatch(login(userData));
  toast.success("Account created successfully!", { style: { background: "#000", color: "#fff" } });

  window.location.href = "/dashboard/news-page";
};


  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Toaster position="top-center" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/newsimgs.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-full max-w-md p-4">
        <div className="text-center mb-6">
          <span className="text-2xl font-semibold text-white">SignUp</span>
        </div>

        <Card className="border-border bg-black shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">Create an account</CardTitle>
            <CardDescription className="text-gray-500">Enter your information to get started</CardDescription>
          </CardHeader>

          <CardContent>
            <Formik
              initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
              validationSchema={SignUpSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground ${errors.name && touched.name ? "border-red-500" : ""}`}
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground ${errors.email && touched.email ? "border-red-500" : ""}`}
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
                      placeholder="Create a password"
                      className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground ${errors.password && touched.password ? "border-red-500" : ""}`}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                    <Field
                      as={Input}
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""}`}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                  </div>

                  <Button type="submit" className="w-full" size="lg">Create Account</Button>
                </Form>
              )}
            </Formik>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/" className="text-accent hover:text-accent/80 font-medium transition-colors">Sign in</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

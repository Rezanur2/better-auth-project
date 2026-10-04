"use client";
import { signIn } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import React from "react";

const SignInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data, "Data From Sign In Form");

    const { data: signInData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });
    console.log(signInData, error, "Sign In Data");
    };
    
    const handleGoogleSignIn = async () => {
        const googleData = await signIn.social({
            provider: "google",
        });
    };

  return (
    <div className="flex justify-center p-15 bg-violet-500 ">
      <Form
        className="flex w-96 flex-col gap-4  border-2 p-10 bg-blue-300 rounded-2xl"
        onSubmit={onSubmit}
      >
        <legend className="bg-blue-700 text-center py-2 rounded-2xl mb-2 text-white">
          Please Sign In
        </legend>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
        <Button onClick={handleGoogleSignIn} className="justify-center">Sign Up with Google</Button>
          </Form>
    </div>
  );
};

export default SignInPage;

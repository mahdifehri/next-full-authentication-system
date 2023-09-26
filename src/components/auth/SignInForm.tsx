"use client"

import { signIn } from "next-auth/react";
import * as React from "react";
import { FC, useState } from "react"; 
import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const SignInForm: FC = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); 
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (callback?.ok && !callback?.error) {
        setIsSubmitting(false);
        router.refresh();
        
      } else if (callback?.error) {
        const errorMessage =
          typeof callback.error === "string"
            ? callback.error
            : "There was a problem with your request.";
            if (errorMessage.includes("password") || errorMessage.includes("email")) {
              toast({
                variant: "destructive",
                title: "Login Error",
                description: errorMessage,
              });
            } else {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              });
            }

        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={loginUser} className="space-y-6">
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          autoComplete="true"
        />
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"} 
            id="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            autoComplete="true"
          />
          <button
            type="button"
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff color="grey" size={16}/> :  <Eye color="grey" size={16}/>}
          </button>
        </div>
        <Button className="w-full"  disabled={isSubmitting}
          isLoading={isSubmitting}>Login</Button>
        <div className="flex justify-center">
          <Button
            type="button"
            variant={"secondary"}
            size="sm"
            className="w-full"
            onClick={loginWithGoogle}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? null : (
              <div className="relative inline-block">
                <span className="absolute -left-2 -top-1 bg-white rounded-full h-6 w-6 flex items-center justify-center">
                  <Icons.google className="h-4 w-4 text-blue-600" />
                </span>
                <Icons.google className="h-4 w-4 mr-2" />
              </div>
            )}
            Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

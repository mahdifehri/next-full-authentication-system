"use client"
import { FC } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const LogoutButton: FC = () => {
  return (
    <Button
      variant={"destructive"}
      className="w-full"
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;

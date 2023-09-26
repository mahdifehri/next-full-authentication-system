import * as React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeSwitch } from "../theme-switch";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authOptions, getAuthSession } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutButton from "../LogoutButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 inset-x-0 h-fit  z-[10] py-3 ">
      <div className="hidden md:flex container h-full mx-auto  items-center justify-between gap-2">
        <h1>LOGO</h1>
        <ThemeSwitch />
        <div>
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  {session.user.image ? (
                    <AvatarImage src={session.user.image} />
                  ) : (
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div>
              <Button variant={"ghost"}>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      {/*Small screen*/}
      <div className="flex md:hidden h-full mx-auto container items-center justify-between gap-2">
        <h1>LOGO</h1>

        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>LOGO</SheetTitle>
              {session?.user ? (
                <div className="flex flex-col h-[80vh]">
                  <div className="flex items-center  flex-col flex-grow justify-between">
                    <div>You are logged In as {session.user.name}</div>
                    <Avatar>
                      {session.user.image ? (
                        <AvatarImage src={session.user.image} />
                      ) : (
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Button variant={"outline"} className="w-full">
                      Profile
                    </Button>
                    <Button variant={"outline"} className="w-full">
                      Profile
                    </Button>
                    <Button variant={"outline"} className="w-full">
                      Profile
                    </Button>
                    <Button variant={"outline"} className="w-full">
                      Profile
                    </Button>
                    <Button variant={"outline"} className="w-full">
                      Profile
                    </Button>
                    <Button variant={"outline"} className="w-full">
                      Settings
                    </Button>

                    <LogoutButton />
                    <ThemeSwitch />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-[80vh]">
                  <div className="flex items-center  flex-col flex-grow justify-end">
                    <SheetClose asChild>
                      <Button variant={"outline"} className="w-full mb-4">
                        <Link href="/sign-in">Sign In</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button className="w-full mb-4">
                        <Link href="/sign-up">Sign Up</Link>
                      </Button>
                    </SheetClose>
                    <ThemeSwitch />
                  </div>
                </div>
              )}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
export default Navbar;

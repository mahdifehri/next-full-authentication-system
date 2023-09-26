import { ChevronLeftCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import SignUp from "@/components/auth/SignUp";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getAuthSession()
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
      <Button className="flex items-center">
          <Link href="/" className="flex items-center">
            <ChevronLeftCircle className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>

        <SignUp />
      </div>
    </div>
  );
};


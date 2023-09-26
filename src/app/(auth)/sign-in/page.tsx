import { Button } from "@/components/ui/button";
import SignIn from "@/components/auth/SignIn";
import Link from "next/link";
import { ChevronLeftCircle } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getAuthSession();
  if (session?.user) {
    redirect("/");
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
        <SignIn />
      </div>
    </div>
  );
}

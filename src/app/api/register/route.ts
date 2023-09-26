import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password,country,state,phoneNumber } = body;

  if (!name || !email || !password || !country|| !phoneNumber ) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return new NextResponse("Email already exists", { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      country,
      phoneNumber,
      state,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}

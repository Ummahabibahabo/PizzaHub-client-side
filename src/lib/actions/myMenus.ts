"use server";
import { headers } from "next/headers";
import { auth } from "../auth";

export const myMenu = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const email = user?.email;
  const res = await fetch(`${process.env.BASE_URL}/my-menu-by-email/${email}`);
  const myMenu = await res.json();
  return myMenu;
};

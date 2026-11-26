"use server";
import { MenuItem } from "@/app/type.ts";

export const editMenuPage = async (data: MenuItem) => {
  const res = await fetch(
    `${process.env.BASE_URL}/update-my-menu/${data._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  return await res.json();
};

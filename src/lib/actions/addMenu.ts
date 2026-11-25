"use server";
import { MenuItem } from "@/app/type.ts";

export const addMenu = async (data: MenuItem) => {
  const res = await fetch(`${process.env.BASE_URL}/add-menu`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

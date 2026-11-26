"use server";

export const deleteMenuPage = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/delete-my-menu/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

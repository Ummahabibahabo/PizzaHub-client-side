"use client";
import { MenuItem } from "@/app/type.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteMenuPage } from "@/lib/actions/delete";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
const DeleteMyMenuPage = ({ item }: { item: MenuItem }) => {
  const handleDeleteButton = async () => {
    const result = await deleteMenuPage(item._id);
    console.log("Delete my menu Page", result);
    if (result) {
      toast.success(`${item.itemName} successfully delete`);
      redirect("/dashboard/vendor/my-menu-items");
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center justify-center gap-2 px-2 py-1 rounded-xl border-1">
          <Trash2 size={16} />
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>{item.itemName}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteButton}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteMyMenuPage;

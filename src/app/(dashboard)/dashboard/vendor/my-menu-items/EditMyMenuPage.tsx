"use client";

import { MenuItem } from "@/app/type.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { editMenuPage } from "@/lib/actions/edit";
import { uploadImage } from "@/lib/actions/uploadImage";

import {
  Pizza,
  ImagePlus,
  MapPin,
  Tag,
  FileText,
  UtensilsCrossed,
  Pencil,
  Sparkles,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const EditMyMenuPage = ({ item }: { item: MenuItem }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Image select handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File;

    const imageUrl = await uploadImage(imageFile);
    const updatedData: MenuItem = {
      ...item,
      itemName: formData.get("itemName") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      location: formData.get("location") as string,
      image: imageUrl,
    };

    const result = await editMenuPage(updatedData);

    console.log("Edit Menu page", result);
    if (result) {
      toast.success(`${item.itemName} successfully edit`);
      redirect("/dashboard/vendor/my-menu-items");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="flex items-center gap-2 rounded-lg border border-[#e8e5e1] dark:border-[#49413b] px-3 py-2.5 text-xs font-semibold text-[#77716b] dark:text-[#c9bdb4] transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-[#1e3550] dark:hover:text-blue-300 md:px-4 md:text-sm"
      >
        <Pencil size={16} />
        Edit
      </DialogTrigger>

      <DialogContent className="w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-4xl max-h-[90vh] overflow-y-auto border-[#E8DED4] dark:border-[#38302B] bg-[#FCFAF5] dark:bg-[#171412] p-5 md:p-7">
        {/* Header */}
        <DialogHeader className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A83B3B]">
            Your Pizzeria
          </p>

          <DialogTitle className="text-2xl font-semibold text-[#29211E] dark:text-white">
            Edit Menu Item
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-500 dark:text-[#b8ada5]">
            Update your delicious menu item information.
          </DialogDescription>
        </DialogHeader>

        {/* Intro */}
        <div className="mb-5 rounded-2xl bg-[#A83B3B] p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[#FFD7C8]">
              <Pizza size={26} />
            </div>

            <div>
              <div className="mb-1 flex items-center gap-2">
                <Sparkles size={14} className="text-[#FFD7C8]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#F2C4B5]">
                  Manage Your Menu
                </span>
              </div>

              <h2 className="text-lg font-semibold">
                Update your food details!
              </h2>

              <p className="mt-1 text-sm text-[#F3D7CE]">
                Keep your restaurant menu fresh and up to date.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-[#E8DED4] dark:border-[#38302B] bg-white dark:bg-[#25201D] p-5 md:p-6">
          <div className="mb-6 border-b border-[#F0E8E2] dark:border-[#38302B] pb-5">
            <h2 className="text-lg font-semibold text-[#29211E] dark:text-white">
              Menu Item Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-[#b8ada5]">
              Edit the information of your menu item.
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Name and Category */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  Item Name
                </label>

                <div className="relative">
                  <Pizza
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A83B3B]"
                  />

                  <input
                    type="text"
                    name="itemName"
                    defaultValue={item.itemName}
                    placeholder="Enter item name"
                    className="w-full rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] py-3 pl-10 pr-4 text-sm text-[#29211E] dark:text-white outline-none focus:border-[#A83B3B]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  Category
                </label>

                <div className="relative">
                  <UtensilsCrossed
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A83B3B]"
                  />

                  <select
                    name="category"
                    defaultValue={item.category}
                    className="w-full appearance-none rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] py-3 pl-10 pr-4 text-sm text-[#665B55] dark:text-[#e8ded5] outline-none focus:border-[#A83B3B]"
                  >
                    <option value="Classic Pizzas">Classic Pizzas</option>
                    <option value="Vegetarian Pizzas">Vegetarian Pizzas</option>
                    <option value="Meat Lovers">Meat Lovers</option>
                    <option value="Specialty / Gourmet Pizzas">
                      Specialty / Gourmet Pizzas
                    </option>
                    <option value="Sides & Appetizers">
                      Sides & Appetizers
                    </option>
                    <option value="Beverages & Desserts">
                      Beverages & Desserts
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                Description
              </label>

              <div className="relative">
                <FileText
                  size={17}
                  className="absolute left-3.5 top-3.5 text-[#A83B3B]"
                />

                <textarea
                  name="description"
                  rows={5}
                  defaultValue={item.description}
                  placeholder="Describe your delicious menu item..."
                  className="w-full resize-none rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] py-3 pl-10 pr-4 text-sm text-[#29211E] dark:text-white outline-none focus:border-[#A83B3B]"
                />
              </div>
            </div>

            {/* Price and Location */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  defaultValue={item.price}
                  placeholder="Enter price"
                  className="w-full rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] px-4 py-3 text-sm text-[#29211E] dark:text-white outline-none focus:border-[#A83B3B]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A83B3B]"
                  />

                  <input
                    type="text"
                    name="location"
                    defaultValue={item.location}
                    placeholder="Enter location"
                    className="w-full rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] py-3 pl-10 pr-4 text-sm text-[#29211E] dark:text-white outline-none focus:border-[#A83B3B]"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                Item Image <span className="text-[#A83B3B]">*</span>
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E8CFC4] dark:border-[#60433b] bg-[#FCFAF5] dark:bg-[#302923] px-5 py-9 text-center transition hover:border-[#A83B3B] hover:bg-[#F9EDE7] dark:hover:bg-[#392b26]">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Selected food preview"
                    className="mb-4 h-48 w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5E5DE] dark:bg-[#492c29] text-[#A83B3B]">
                    <ImagePlus size={25} />
                  </div>
                )}

                <p className="text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  {imagePreview
                    ? "Image selected successfully!"
                    : "Click to upload your food image"}
                </p>

                <p className="mt-1 text-xs text-gray-400 dark:text-[#91877f]">
                  PNG, JPG or JPEG (Max recommended size: 5MB)
                </p>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Info */}
            <div className="flex items-start gap-3 rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] p-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5E5DE] dark:bg-[#492c29] text-[#A83B3B]">
                <Tag size={17} />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  Menu Item Update
                </h4>

                <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-[#b8ada5]">
                  Review your menu information before saving your changes.
                </p>
              </div>
            </div>

            {/* Button - UI only */}
            <div className="flex justify-end border-t border-[#F0E8E2] dark:border-[#38302B] pt-5">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#A83B3B] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#8E3434]"
              >
                <Pencil size={17} />
                Update Menu Item
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMyMenuPage;

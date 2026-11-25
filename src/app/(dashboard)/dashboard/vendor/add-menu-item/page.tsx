"use client";

import { MenuItem } from "@/app/type.ts";
import { addMenu } from "@/lib/actions/addMenu";
import { uploadImage } from "@/lib/actions/uploadImage";
import {
  Pizza,
  ImagePlus,
  MapPin,
  Tag,
  FileText,
  ArrowLeft,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { authClient } from "../../../../../lib/auth-client";
import { redirect } from "next/navigation";

const AddMenuItemPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Image select handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const imageFile = formData.get("image") as File;

    const imageUrl = await uploadImage(imageFile);

    const addMenuData: MenuItem = {
      itemName: formData.get("itemName") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      location: formData.get("location") as string,
      image: imageUrl,
      vendorId: user?.id,
      vendorName: user?.name,
      vendorEmail: user?.email,
      vendorImage: user?.image,
      vendorTime: user?.createdAt,
    };

    const result = await addMenu(addMenuData);

    if (result) {
      redirect("/dashboard/vendor/my-menu-items");
    }

    console.log(result);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF5] dark:bg-[#171412] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#A83B3B]">
              Your Pizzeria
            </p>

            <h1 className="text-2xl font-semibold text-[#29211E] dark:text-white md:text-3xl">
              Add Menu Item
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-[#b8ada5]">
              Create a delicious new item for your restaurant menu.
            </p>
          </div>

          <Link
            href="/dashboard/vendor/my-menu"
            className="flex items-center gap-2 rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-white dark:bg-[#25201D] px-4 py-2.5 text-sm font-semibold text-[#51443E] dark:text-[#e8ded5] transition hover:bg-[#F9EDE7] dark:hover:bg-[#302923]"
          >
            <ArrowLeft size={16} />
            Back to Menu
          </Link>
        </div>

        {/* Intro */}
        <div className="mb-6 rounded-2xl bg-[#A83B3B] p-5 text-white md:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[#FFD7C8]">
              <Pizza size={26} />
            </div>

            <div>
              <div className="mb-1 flex items-center gap-2">
                <Sparkles size={14} className="text-[#FFD7C8]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#F2C4B5]">
                  Grow Your Menu
                </span>
              </div>

              <h2 className="text-lg font-semibold md:text-xl">
                Share something delicious!
              </h2>

              <p className="mt-1 text-sm text-[#F3D7CE]">
                Add your food details and let customers discover your creations.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#E8DED4] dark:border-[#38302B] bg-white dark:bg-[#25201D] p-5 shadow-sm md:p-8">
          <div className="mb-6 border-b border-[#F0E8E2] dark:border-[#38302B] pb-5">
            <h2 className="text-lg font-semibold text-[#29211E] dark:text-white">
              Menu Item Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-[#b8ada5]">
              Fill in the details below to create your menu item.
            </p>
          </div>

          <form onSubmit={handleAddButton} className="space-y-5">
            {/* Item Name & Category */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  Item Name <span className="text-[#A83B3B]">*</span>
                </label>

                <div className="relative">
                  <Pizza
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A83B3B]"
                  />

                  <input
                    type="text"
                    name="itemName"
                    placeholder="Please enter your item's name"
                    required
                    className="w-full rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] py-3 pl-10 pr-4 text-sm text-[#29211E] dark:text-white outline-none transition placeholder:text-gray-400 dark:placeholder:text-[#91877f] focus:border-[#A83B3B] focus:ring-2 focus:ring-[#A83B3B]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  Category <span className="text-[#A83B3B]">*</span>
                </label>

                <div className="relative">
                  <UtensilsCrossed
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A83B3B]"
                  />

                  <select
                    defaultValue=""
                    name="category"
                    required
                    className="w-full appearance-none rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] py-3 pl-10 pr-4 text-sm text-[#665B55] dark:text-[#e8ded5] outline-none focus:border-[#A83B3B] focus:ring-2 focus:ring-[#A83B3B]/10"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
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
                Description <span className="text-[#A83B3B]">*</span>
              </label>

              <div className="relative">
                <FileText
                  size={17}
                  className="absolute left-3.5 top-3.5 text-[#A83B3B]"
                />

                <textarea
                  name="description"
                  rows={5}
                  required
                  placeholder="Describe your delicious menu item, ingredients, taste, and special features..."
                  className="w-full resize-none rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] py-3 pl-10 pr-4 text-sm text-[#29211E] dark:text-white outline-none transition placeholder:text-gray-400 dark:placeholder:text-[#91877f] focus:border-[#A83B3B] focus:ring-2 focus:ring-[#A83B3B]/10"
                />
              </div>
            </div>

            {/* Price & Location */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  Price <span className="text-[#A83B3B]">*</span>
                </label>

                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    placeholder="Please enter your item's price"
                    min="0"
                    required
                    className="w-full rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] py-3 pl-10 pr-4 text-sm text-[#29211E] dark:text-white outline-none transition placeholder:text-gray-400 dark:placeholder:text-[#91877f] focus:border-[#A83B3B] focus:ring-2 focus:ring-[#A83B3B]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                  Location <span className="text-[#A83B3B]">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A83B3B]"
                  />

                  <input
                    type="text"
                    name="location"
                    placeholder="Please enter your location"
                    required
                    className="w-full rounded-xl border border-[#E8DED4] dark:border-[#49413b] bg-[#FCFAF5] dark:bg-[#302923] py-3 pl-10 pr-4 text-sm text-[#29211E] dark:text-white outline-none transition placeholder:text-gray-400 dark:placeholder:text-[#91877f] focus:border-[#A83B3B] focus:ring-2 focus:ring-[#A83B3B]/10"
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
                  Admin Approval Required
                </h4>

                <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-[#b8ada5]">
                  Your menu item will be submitted for admin review. It will
                  become visible to customers after approval.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-[#F0E8E2] dark:border-[#38302B] pt-5 sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#A83B3B] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#8E3434]"
              >
                <Pizza size={17} />
                Add Menu Item
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400 dark:text-[#91877f]">
          © 2026 PizzaHub. Fresh pizza, bigger opportunities.
        </p>
      </div>
    </div>
  );
};

export default AddMenuItemPage;

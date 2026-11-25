"use client";

import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  Pizza,
  ImagePlus,
  Camera,
  Pencil,
  X,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/actions/uploadImage";
import { TDashboardbarItem } from "@/app/type.ts";

// Main Profile Page
const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-[#E65C32]">Loading Profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">Please Login First</h2>
      </div>
    );
  }

  return <ProfileContent user={session.user} />;
};

// Profile Content
const ProfileContent = ({ user }: { user: TDashboardbarItem }) => {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(user.image || "");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Image Select Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));

      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  // Update Profile Handler
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = user.image || "";

      // Upload New Image
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Update User Data
      const updateData = {
        name: name.trim(),
        ...(imageFile ? { image: imageUrl } : {}),
      };

      const result = await authClient.updateUser(updateData);

      if (result.error) {
        setErrorMessage(result.error.message);
      } else {
        setSuccessMessage("Profile updated successfully!");

        setImageFile(null);
        setIsEditing(false);

        // Refresh Server Components
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel Edit Handler
  const handleCancel = () => {
    setName(user.name || "");
    setImagePreview(user.image || "");
    setImageFile(null);

    setIsEditing(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#FCFAF5] px-4 py-10 dark:bg-[#171412] md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#E65C32]">
            PizzaHub Account
          </p>

          <h1 className="text-3xl font-bold text-[#292524] dark:text-white">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#99918b]">
            Your personal information and account details.
          </p>
        </div>

        {/* Profile and Edit Form */}
        <div
          className={`grid items-start gap-6 ${
            isEditing ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {/* Profile Card */}
          <div className="overflow-hidden rounded-2xl border border-[#eee5da] bg-white shadow-sm dark:border-[#39312b] dark:bg-[#211c18]">
            {/* Cover */}
            <div className="relative h-36 bg-gradient-to-r from-[#E65C32] to-[#F59E65]">
              <div className="absolute -bottom-12 left-6">
                {/* Avatar */}
                <div className="relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt={name || "Profile"}
                      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md dark:border-[#211c18]"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#f5eee5] shadow-md dark:border-[#211c18] dark:bg-[#39312b]">
                      <User size={45} className="text-[#E65C32]" />
                    </div>
                  )}

                  {/* Camera Button */}
                  {isEditing && (
                    <>
                      <label
                        htmlFor="profileImage"
                        className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#E65C32] text-white shadow-md transition hover:bg-[#cf4c27]"
                      >
                        <Camera size={18} />
                      </label>

                      <input
                        id="profileImage"
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="px-6 pb-7 pt-16">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#292524] dark:text-white">
                    {user.name || "User"}
                  </h2>

                  <p className="mt-1 text-sm text-[#99918b]">
                    Welcome to your PizzaHub profile
                  </p>
                </div>

                {/* Edit Profile Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (isEditing) {
                      handleCancel();
                    } else {
                      setIsEditing(true);
                      setSuccessMessage("");
                      setErrorMessage("");
                    }
                  }}
                  className="flex items-center gap-2 rounded-lg bg-[#C83D3D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A53A37]"
                >
                  {isEditing ? <X size={16} /> : <Pencil size={16} />}

                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {/* Account Details */}
              <div className="mt-8">
                <h3 className="mb-5 text-lg font-bold text-[#292524] dark:text-white">
                  Account Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div className="rounded-xl border border-[#eee5da] bg-[#FCFAF5] p-5 dark:border-[#39312b] dark:bg-[#171412]">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-lg bg-orange-100 p-2 text-[#E65C32] dark:bg-orange-950">
                        <User size={19} />
                      </div>

                      <span className="text-sm text-[#99918b]">Full Name</span>
                    </div>

                    <p className="break-words font-semibold text-[#292524] dark:text-white">
                      {user.name || "Not available"}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="rounded-xl border border-[#eee5da] bg-[#FCFAF5] p-5 dark:border-[#39312b] dark:bg-[#171412]">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950">
                        <Mail size={19} />
                      </div>

                      <span className="text-sm text-[#99918b]">
                        Email Address
                      </span>
                    </div>

                    <p className="break-all font-semibold text-[#292524] dark:text-white">
                      {user.email || "Not available"}
                    </p>
                  </div>

                  {/* Role */}
                  <div className="rounded-xl border border-[#eee5da] bg-[#FCFAF5] p-5 dark:border-[#39312b] dark:bg-[#171412]">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-950">
                        <ShieldCheck size={19} />
                      </div>

                      <span className="text-sm text-[#99918b]">
                        Account Role
                      </span>
                    </div>

                    <p className="font-semibold capitalize text-[#292524] dark:text-white">
                      {user.role || "Customer"}
                    </p>
                  </div>

                  {/* Member Since */}
                  <div className="rounded-xl border border-[#eee5da] bg-[#FCFAF5] p-5 dark:border-[#39312b] dark:bg-[#171412]">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-950">
                        <CalendarDays size={19} />
                      </div>

                      <span className="text-sm text-[#99918b]">
                        Member Since
                      </span>
                    </div>

                    <p className="font-semibold text-[#292524] dark:text-white">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="mt-7 flex items-center gap-4 rounded-xl bg-[#FFF1E9] p-5 dark:bg-[#39251d]">
                <div className="rounded-full bg-white p-3 text-[#E65C32] dark:bg-[#211c18]">
                  <Pizza size={25} />
                </div>

                <div>
                  <h3 className="font-bold text-[#292524] dark:text-white">
                    Welcome to PizzaHub!
                  </h3>

                  <p className="mt-1 text-sm text-[#8c7468] dark:text-gray-400">
                    Enjoy delicious food and explore your favorite pizzas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Update Profile Form */}
          {isEditing && (
            <form
              onSubmit={handleProfileUpdate}
              className="w-full rounded-2xl border border-[#eee5da] bg-white p-6 shadow-sm dark:border-[#39312b] dark:bg-[#211c18] sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A53A37] text-white">
                  <Pizza size={25} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#302923] dark:text-white">
                    Update Your Profile
                  </h2>

                  <p className="mt-1 text-sm text-[#99918b]">
                    Change your personal information.
                  </p>
                </div>
              </div>

              {/* Name */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#554D46] dark:text-gray-200">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="h-11 w-full rounded-lg border border-[#E8E2D8] bg-white px-3 text-[#302923] outline-none transition focus:border-[#A53A37] dark:border-[#60433b] dark:bg-[#171412] dark:text-white"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#51443E] dark:text-gray-200">
                  Profile Image (Optional)
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E8CFC4] bg-[#FCFAF5] px-5 py-7 text-center transition hover:border-[#A83B3B] hover:bg-[#F9EDE7] dark:border-[#60433b] dark:bg-[#302923] dark:hover:bg-[#392b26]">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Selected profile preview"
                      className="mb-4 h-36 w-36 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5E5DE] text-[#A83B3B] dark:bg-[#492c29]">
                      <ImagePlus size={25} />
                    </div>
                  )}

                  <p className="text-sm font-semibold text-[#51443E] dark:text-[#e8ded5]">
                    {imageFile
                      ? "New image selected!"
                      : "Click to change your profile image"}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">PNG, JPG or JPEG</p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-300">
                  {errorMessage}
                </p>
              )}

              {/* Update Button */}
              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-lg bg-[#C83D3D] text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#A53A37] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Updating Profile..." : "Save Changes"}
              </button>
            </form>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <p className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

import type { Component } from "solid-js";
import { For, createSignal, onMount } from "solid-js";

/**
 * Profile data model --------------------------------------------------
 */
interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  position: string;
  avatar: string;
  membershipType: string;
  joinDate: string;
}

const profileData: ProfileData = {
  firstName: "Alfazri",
  lastName: "M.H.",
  email: "ayomina67@gmail.com",
  contactNumber: "+62 812 3456 7890",
  position: "Product Designer",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  membershipType: "Pro Member",
  joinDate: "2024-01-15",
};

/**
 * Helper components --------------------------------------------------------
 */
const NavItem: Component<{
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}> = (props) => (
  <button
    onClick={props.onClick}
    class={`group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 w-full text-left ${
      props.active
        ? "bg-white text-gray-900 shadow-lg transform scale-105"
        : "text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1"
    }`}
  >
    <span class="text-lg">{props.icon}</span>
    <span class="font-medium">{props.label}</span>
    {props.active && (
      <div class="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
    )}
  </button>
);

const InputField: Component<{
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange?: (value: string) => void;
}> = (props) => (
  <div class="space-y-2">
    <label class="block text-sm font-semibold text-gray-700">
      {props.label}
    </label>
    <input
      type={props.type || "text"}
      value={props.value}
      placeholder={props.placeholder || ""}
      onInput={(e) => props.onChange?.(e.currentTarget.value)}
      class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
    />
  </div>
);

/**
 * Main Profile Page -----------------------------------------------------------
 */
const ProfilePage: Component = () => {
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [activeNavItem, setActiveNavItem] = createSignal("Settings");
  const [formData, setFormData] = createSignal(profileData);

  // Navigation items configuration
  const navItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Vital Task", icon: "🎯" },
    { label: "My Task", icon: "📝" },
    { label: "Task Categories", icon: "📂" },
    { label: "Analytics", icon: "📈" },
    { label: "Settings", icon: "⚙️" },
  ];

  // Handle navigation item clicks
  const handleNavClick = (label: string) => {
    setActiveNavItem(label);
    // Navigation logic
    if (label === "Dashboard") {
      window.location.href = "/dashboard";
      return;
    }
    if (label === "Vital Task") {
      window.location.href = "/vitaltask";
      return;
    }
    if (label === "My Task") {
      window.location.href = "/mytask";
      return;
    }
    console.log(`Navigating to: ${label}`);
  };

  // Handle form field changes
  const updateField = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSave = () => {
    console.log("Saving profile data:", formData());
    // Here you would typically send the data to your API
  };

  const handleCancel = () => {
    setFormData(profileData); // Reset to original data
    console.log("Changes cancelled");
  };

  onMount(() => {
    setTimeout(() => setIsLoaded(true), 300);
  });

  return (
    <div class="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* ░░ Enhanced Sidebar ░░ */}
      <aside class="w-72 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white flex flex-col justify-between p-6 shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"></div>
          <div class="absolute bottom-20 right-10 w-16 h-16 bg-white rounded-full blur-xl"></div>
        </div>

        <div class="space-y-8 relative z-10">
          {/* Enhanced Profile */}
          <div class="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="relative">
              <img
                src={formData().avatar}
                alt="avatar"
                class="w-14 h-14 rounded-full object-cover ring-4 ring-white/30"
              />
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white"></div>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-lg leading-tight">
                {formData().firstName} {formData().lastName}
              </h3>
              <p class="text-sm text-white/80">{formData().email}</p>
              <div class="flex items-center gap-1 mt-1">
                <span class="text-xs text-white/60">
                  ✨ {formData().membershipType}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav class="space-y-2">
            <For each={navItems}>
              {(item) => (
                <NavItem
                  label={item.label}
                  icon={item.icon}
                  active={activeNavItem() === item.label}
                  onClick={() => handleNavClick(item.label)}
                />
              )}
            </For>
          </nav>

          {/* Stats Card */}
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <h4 class="font-semibold mb-3 text-sm">Profile Stats</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="text-center">
                <div class="text-2xl font-bold">Pro</div>
                <div class="text-xs text-white/80">Membership</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold">1Y</div>
                <div class="text-xs text-white/80">Member Since</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Logout */}
        <button
          onClick={() => console.log("Logging out...")}
          class="relative z-10 flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
        >
          <span class="text-lg">🚪</span>
          <span class="font-medium">Logout</span>
        </button>
      </aside>

      {/* ░░ Enhanced Main content ░░ */}
      <main class="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Enhanced Header */}
        <header
          class={`flex justify-between items-start flex-wrap gap-6 transform transition-all duration-1000 ${
            isLoaded()
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Account Settings ⚙️
            </h1>
            <p class="text-gray-600">
              Tuesday, 20/06/2025 - Manage your profile information
            </p>
            <p class="text-sm text-orange-600 font-medium">
              Current Page: {activeNavItem()}
            </p>
          </div>
          <div class="flex gap-4 items-center">
            <button
              onClick={() => console.log("Notification clicked")}
              class="group p-4 bg-white hover:bg-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span class="text-xl group-hover:animate-pulse">🔔</span>
            </button>
            <button
              onClick={() => console.log("Calendar clicked")}
              class="group p-4 bg-white hover:bg-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span class="text-xl group-hover:animate-pulse">📅</span>
            </button>
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <p class="text-sm font-medium">Tuesday 20/06/2025</p>
            </div>
          </div>
        </header>

        {/* Enhanced Profile Form */}
        <div
          class={`transform transition-all duration-1000 delay-300 ${
            isLoaded()
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Profile Header */}
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <h2 class="text-2xl font-bold flex items-center gap-2">
                    👤 Account Information
                  </h2>
                </div>
                <button
                  onClick={() => window.history.back()}
                  class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
                >
                  <span>←</span>
                  Go Back
                </button>
              </div>
            </div>

            {/* Profile Avatar Section */}
            <div class="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <div class="flex items-center gap-6">
                <div class="relative">
                  <img
                    src={formData().avatar}
                    alt="Profile Avatar"
                    class="w-24 h-24 rounded-full object-cover ring-4 ring-orange-200 shadow-lg"
                  />
                  <button
                    onClick={() => console.log("Change avatar clicked")}
                    class="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <span class="text-sm">📷</span>
                  </button>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-800">
                    {formData().firstName} {formData().lastName}
                  </h3>
                  <p class="text-gray-600 text-lg">{formData().email}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✨ {formData().membershipType}
                    </span>
                    <span class="text-sm text-gray-500">
                      Member since{" "}
                      {new Date(formData().joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div class="p-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  value={formData().firstName}
                  placeholder="Enter your first name"
                  onChange={(value) => updateField("firstName", value)}
                />

                <InputField
                  label="Last Name"
                  value={formData().lastName}
                  placeholder="Enter your last name"
                  onChange={(value) => updateField("lastName", value)}
                />

                <InputField
                  label="Email Address"
                  type="email"
                  value={formData().email}
                  placeholder="Enter your email address"
                  onChange={(value) => updateField("email", value)}
                />

                <InputField
                  label="Contact Number"
                  type="tel"
                  value={formData().contactNumber}
                  placeholder="Enter your contact number"
                  onChange={(value) => updateField("contactNumber", value)}
                />

                <div class="md:col-span-2">
                  <InputField
                    label="Position"
                    value={formData().position}
                    placeholder="Enter your position/title"
                    onChange={(value) => updateField("position", value)}
                  />
                </div>
              </div>

              {/* Additional Settings */}
              <div class="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span class="text-xl">🔐</span>
                  Privacy & Security
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => console.log("Change password clicked")}
                    class="flex items-center gap-3 p-4 bg-white hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-102"
                  >
                    <span class="text-2xl">🔑</span>
                    <div class="text-left">
                      <p class="font-medium text-gray-800">Change Password</p>
                      <p class="text-sm text-gray-600">Update your password</p>
                    </div>
                  </button>

                  <button
                    onClick={() => console.log("Two-factor auth clicked")}
                    class="flex items-center gap-3 p-4 bg-white hover:bg-green-50 rounded-xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:scale-102"
                  >
                    <span class="text-2xl">🛡️</span>
                    <div class="text-left">
                      <p class="font-medium text-gray-800">Two-Factor Auth</p>
                      <p class="text-sm text-gray-600">Enable 2FA security</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div class="flex gap-4 mt-8 justify-end">
                <button
                  onClick={handleCancel}
                  class="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Cancel Changes
                </button>
                <button
                  onClick={handleSave}
                  class="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <span>💾</span>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Scrollbar Styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #f97316, #ea580c);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #ea580c, #dc2626);
          }
        `}
      </style>
    </div>
  );
};

export default ProfilePage;

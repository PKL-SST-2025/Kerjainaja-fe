import { createSignal, createEffect } from "solid-js";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: "low" | "moderate" | "high";
  status: "not started" | "in progress" | "completed";
  category: string;
}

const EditTaskPage = () => {
  const [task, setTask] = createSignal<Task>({
    id: "1",
    title: "Attend Nischal's Birthday Party",
    description:
      "Buy gifts on the way and pick up cake from the bakery. 6 PM | Fresh Elements",
    date: "2025-06-20",
    priority: "moderate",
    status: "not started",
    category: "Personal",
  });

  const [isImageUploaded, setIsImageUploaded] = createSignal(false);
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [activeNavItem, setActiveNavItem] = createSignal("My Task");

  const handleInputChange = (field: keyof Task, value: string) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Task saved:", task());
  };

  const handleGoBack = () => {
    window.location.href = "/dashboard";
  };

  const handleImageUpload = () => {
    setIsImageUploaded(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "moderate":
        return "bg-blue-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in progress":
        return "text-blue-600";
      case "not started":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Navigation items configuration
  const navItems = [
    { label: "Dashboard", icon: "📊", href: "/dashboard" },
    { label: "Vital Task", icon: "🎯", href: "/vitaltask" },
    { label: "My Task", icon: "📝", href: "/mytask" },
    { label: "Task Categories", icon: "📂", href: "/taskcate" },
    { label: "Settings", icon: "⚙️", href: "/profile" },
  ];

  // Handle navigation item clicks
  const handleNavClick = (label: string, href?: string) => {
    setActiveNavItem(label);
    if (href) {
      window.location.href = href;
    }
  };

  // NavItem component matching the first design
  const NavItem = (props: {
    label: string;
    icon: string;
    active?: boolean;
    onClick?: () => void;
  }) => (
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

  return (
    <div class="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* Enhanced Sidebar matching first design */}
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
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="avatar"
                class="w-14 h-14 rounded-full object-cover ring-4 ring-white/30"
              />
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white"></div>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-lg leading-tight">Alfazri M.H.</h3>
              <p class="text-sm text-white/80">ayomina67@gmail.com</p>
              <div class="flex items-center gap-1 mt-1">
                <span class="text-xs text-white/60">✨ Pro Member</span>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav class="space-y-2">
            {navItems.map((item) => (
              <NavItem
                label={item.label}
                icon={item.icon}
                active={activeNavItem() === item.label}
                onClick={() => handleNavClick(item.label, item.href)}
              />
            ))}
          </nav>

          {/* Stats Card */}
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <h4 class="font-semibold mb-3 text-sm">Today's Progress</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="text-center">
                <div class="text-2xl font-bold">2</div>
                <div class="text-xs text-white/80">Completed</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold">3</div>
                <div class="text-xs text-white/80">In Progress</div>
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

      {/* Main Content */}
      <main class="flex-1 p-8 space-y-8 overflow-y-auto relative">
        {/* Enhanced Header */}
        <header class="flex justify-between items-start flex-wrap gap-6">
          <div class="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              class="group p-4 bg-white hover:bg-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span class="text-xl group-hover:animate-pulse">←</span>
            </button>
            <div class="flex flex-col gap-2">
              <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Edit Task ✏️
              </h1>
              <p class="text-gray-600">
                Tuesday, 20/06/2025 - Update your task details
              </p>
            </div>
          </div>
          <div class="flex gap-4 items-center">
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <p class="text-sm font-medium">Tuesday 20/06/2025</p>
            </div>
          </div>
        </header>

        {/* Enhanced Edit Form */}
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={task().title}
                  onInput={(e) =>
                    handleInputChange("title", e.currentTarget.value)
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:shadow-md"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={task().date}
                  onInput={(e) =>
                    handleInputChange("date", e.currentTarget.value)
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:shadow-md"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div class="flex space-x-4">
                  {(["low", "moderate", "high"] as const).map((priority) => (
                    <button
                      onClick={() => handleInputChange("priority", priority)}
                      class={`px-4 py-3 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        task().priority === priority
                          ? "border-orange-500 bg-orange-50 text-orange-600 shadow-lg"
                          : "border-gray-300 hover:border-orange-300 hover:shadow-md"
                      }`}
                    >
                      <div class="flex items-center">
                        <div
                          class={`w-3 h-3 rounded-full mr-2 ${getPriorityColor(
                            priority
                          )}`}
                        ></div>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={task().status}
                  onInput={(e) =>
                    handleInputChange("status", e.currentTarget.value)
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:shadow-md"
                >
                  <option value="not started">Not Started</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={task().category}
                  onInput={(e) =>
                    handleInputChange("category", e.currentTarget.value)
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:shadow-md"
                  placeholder="Enter task category"
                />
              </div>
            </div>

            {/* Right Column */}
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Task Description
                </label>
                <textarea
                  value={task().description}
                  onInput={(e) =>
                    handleInputChange("description", e.currentTarget.value)
                  }
                  rows={6}
                  class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:shadow-md resize-none"
                  placeholder="Enter task description"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-orange-300 transition-all duration-300 hover:shadow-lg">
                  {isImageUploaded() ? (
                    <div class="text-green-600">
                      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">✓</span>
                      </div>
                      <p class="font-medium">Image uploaded successfully</p>
                    </div>
                  ) : (
                    <div class="text-gray-500">
                      <div class="w-16 h-16 mx-auto mb-4 text-gray-400 flex items-center justify-center text-4xl">
                        ⬆️
                      </div>
                      <p class="mb-2">Drag and drop files here</p>
                      <p class="text-sm text-gray-400 mb-4">
                        Supported formats: JPG, PNG, GIF
                      </p>
                      <button
                        onClick={handleImageUpload}
                        class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Browse Files
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Task Preview */}
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span class="text-xl">👁️</span>
                  Task Preview
                </h3>
                <div class="bg-white rounded-2xl p-4 border-l-4 border-orange-500 shadow-md">
                  <h4 class="font-semibold text-gray-800 mb-2">
                    {task().title}
                  </h4>
                  <p class="text-gray-600 text-sm mb-3">{task().description}</p>
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center space-x-4">
                      <span
                        class={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          task().priority
                        )} text-white`}
                      >
                        {task().priority}
                      </span>
                      <span
                        class={`font-medium ${getStatusColor(task().status)}`}
                      >
                        {task().status}
                      </span>
                    </div>
                    <span class="text-gray-500 font-medium">{task().date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleGoBack}
              class="px-8 py-3 border border-gray-300 text-gray-600 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              class="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span class="text-lg">💾</span>
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditTaskPage;

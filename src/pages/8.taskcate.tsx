import type { Component } from "solid-js";
import { createSignal, For, onMount } from "solid-js";

/** -------------------------------------------------------------------------
 * Data types & dummy data
 * ---------------------------------------------------------------------- */
interface TaskStatus {
  id: number;
  name: string;
  status: string;
}

interface TaskPriority {
  id: number;
  name: string;
  priority: string;
}

const taskStatuses: TaskStatus[] = [
  { id: 1, name: "Completed", status: "completed" },
  { id: 2, name: "In Progress", status: "in_progress" },
  { id: 3, name: "Not Started", status: "not_started" },
];

const taskPriorities: TaskPriority[] = [
  { id: 1, name: "Extreme", priority: "extreme" },
  { id: 2, name: "Moderate", priority: "moderate" },
  { id: 3, name: "Low", priority: "low" },
];

/** -------------------------------------------------------------------------
 * Helper components
 * ---------------------------------------------------------------------- */
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

const statusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "in_progress":
      return "bg-blue-500";
    case "not_started":
    default:
      return "bg-red-500";
  }
};

const priorityColor = (priority: string) => {
  switch (priority) {
    case "extreme":
      return "bg-red-500";
    case "moderate":
      return "bg-blue-500";
    case "low":
    default:
      return "bg-green-500";
  }
};

/** -------------------------------------------------------------------------
 * Task Categories Page
 * ---------------------------------------------------------------------- */
const TaskCategoriesPage: Component = () => {
  const [isLoaded, setIsLoaded] = createSignal(false);

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
            <NavItem
              label="Dashboard"
              icon="📊"
              onClick={() => (window.location.href = "/dashboard")}
            />
            <NavItem
              label="Vital Task"
              icon="🎯"
              onClick={() => (window.location.href = "/vitaltask")}
            />
            <NavItem
              label="My Task"
              icon="📝"
              onClick={() => (window.location.href = "/mytask")}
            />
            <NavItem
              label="Task Categories"
              icon="📂"
              active
              onClick={() => (window.location.href = "/categories")}
            />
            {/* <NavItem label="Analytics" icon="📈" onClick={() => (window.location.href = "/analytics")} /> */} {/* BUTTON ANALYTICS DIHILANGKAN */}
            <NavItem
              label="Settings"
              icon="⚙️"
              onClick={() => (window.location.href = "/profile")}
            />
          </nav>

          {/* Stats Card */}
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <h4 class="font-semibold mb-3 text-sm">Today's Progress</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="text-center">
                <div class="text-2xl font-bold">5</div>
                <div class="text-xs text-white/80">Completed</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold">2</div>
                <div class="text-xs text-white/80">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Logout */}
        <button
          onClick={() => (window.location.href = "/login")}
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
              Task Categories
            </h1>
            <p class="text-gray-600">
              Manage your task statuses and priorities
            </p>
          </div>
          <div class="flex gap-4 items-center">
            <button class="group p-4 bg-white hover:bg-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span class="text-xl group-hover:animate-pulse">🔔</span>
            </button>
            <button class="group p-4 bg-white hover:bg-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span class="text-xl group-hover:animate-pulse">📅</span>
            </button>
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <p class="text-sm font-medium">Tuesday 20/06/2025</p>
            </div>
          </div>
        </header>

        {/* Enhanced Content */}
        <div
          class={`space-y-8 transform transition-all duration-1000 delay-300 ${
            isLoaded()
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Task Status Section */}
          <section class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span class="text-2xl">📊</span>
                Task Status
              </h2>
              <button class="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1">
                <span>➕</span>
                Add New Status
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">
                      SN
                    </th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">
                      Task Status
                    </th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <For each={taskStatuses}>
                    {(status, index) => (
                      <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td class="py-4 px-4 text-gray-600">{index() + 1}</td>
                        <td class="py-4 px-4">
                          <div class="flex items-center gap-3">
                            <div
                              class={`w-3 h-3 rounded-full ${statusColor(
                                status.status
                              )}`}
                            ></div>
                            <span class="text-gray-800 font-medium">
                              {status.name}
                            </span>
                          </div>
                        </td>
                        <td class="py-4 px-4 text-center">
                          <div class="flex items-center justify-center gap-2">
                            <button class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                              Edit
                            </button>
                            <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </section>

          {/* Task Priority Section */}
          <section class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                Task Priority
              </h2>
              <button class="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1">
                <span>➕</span>
                Add New Priority
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">
                      SN
                    </th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">
                      Task Priority
                    </th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <For each={taskPriorities}>
                    {(priority, index) => (
                      <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td class="py-4 px-4 text-gray-600">{index() + 1}</td>
                        <td class="py-4 px-4">
                          <div class="flex items-center gap-3">
                            <div
                              class={`w-3 h-3 rounded-full ${priorityColor(
                                priority.priority
                              )}`}
                            ></div>
                            <span class="text-gray-800 font-medium">
                              {priority.name}
                            </span>
                          </div>
                        </td>
                        <td class="py-4 px-4 text-center">
                          <div class="flex items-center justify-center gap-2">
                            <button class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                              Edit
                            </button>
                            <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </section>
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

export default TaskCategoriesPage;

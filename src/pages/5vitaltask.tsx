import type { Component } from "solid-js";
import { createSignal, For, onMount } from "solid-js";

/** -------------------------------------------------------------------------
 * Data types & dummy seed
 * ---------------------------------------------------------------------- */
interface VitalTask {
  id: number;
  title: string;
  summary: string;
  description: string[]; // multiline bullet list
  image: string;
  status: "not_started" | "in_progress" | "completed";
  priority: "low" | "moderate" | "high" | "extreme";
  created: string; // ISO date
}

const vitalTasks: VitalTask[] = [
  {
    id: 1,
    title: "Walk the dog",
    summary: "Take the dog to the park and bring treats as well…",
    description: [
      "Take Luffy and Jiro for a leisurely stroll around the neighborhood.",
      "Enjoy the fresh air and give them the exercise and mental stimulation they need.",
      "Bring along squeaky and fluffy for some extra fun.",
      "Listen to a podcast or audiobooks along the way.",
      "Practice obedience training while walking.",
      "Chat with neighbors or other dog walkers.",
      "Snap photos of interesting sights along the way.",
    ],
    image: "src/assets/dogtask.png",
    status: "not_started",
    priority: "extreme",
    created: "2025-06-20",
  },
  {
    id: 2,
    title: "Take grandma to hospital",
    summary: "Go back home and take grandma to the hospital…",
    description: [
      "Pick grandma up at 9 AM sharp.",
      "Double‑check all required documents.",
      "Bring wheelchair and warm blanket in the car.",
      "Stop by the pharmacy afterward to collect medicine.",
    ],
    image: "src/assets/ininenek.png",
    status: "in_progress",
    priority: "moderate",
    created: "2025-06-20",
  },
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

const statusColor = (status: VitalTask["status"]) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-50";
    case "in_progress":
      return "text-blue-600 bg-blue-50";
    case "not_started":
    default:
      return "text-red-600 bg-red-50";
  }
};

const priorityColor = (priority: VitalTask["priority"]) => {
  switch (priority) {
    case "extreme":
      return "text-red-600 bg-red-50";
    case "high":
      return "text-orange-500 bg-orange-50";
    case "moderate":
      return "text-blue-500 bg-blue-50";
    case "low":
    default:
      return "text-green-600 bg-green-50";
  }
};

const statusIcon = (status: VitalTask["status"]) => {
  switch (status) {
    case "completed":
      return "✅";
    case "in_progress":
      return "🔄";
    case "not_started":
    default:
      return "⭕";
  }
};

const priorityIcon = (priority: VitalTask["priority"]) => {
  switch (priority) {
    case "extreme":
      return "🔥";
    case "high":
      return "⚡";
    case "moderate":
      return "📋";
    case "low":
    default:
      return "📝";
  }
};

/** -------------------------------------------------------------------------
 * Vital Task Page
 * ---------------------------------------------------------------------- */
const VitalTaskPage: Component = () => {
  const [selectedId, setSelectedId] = createSignal<number>(vitalTasks[0].id);
  const [isLoaded, setIsLoaded] = createSignal(false);

  const selected = () => vitalTasks.find((t) => t.id === selectedId())!;

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
          {/* Navigation mirip dashboard dan terhubung */}
          <nav class="space-y-2">
            <NavItem
              label="Dashboard"
              icon="📊"
              onClick={() => (window.location.href = "/dashboard")}
            />
            <NavItem
              label="Vital Task"
              icon="🎯"
              active
              onClick={() => (window.location.href = "/vitaltask")}
            />
            <NavItem
              label="My Task"
              icon="📝"
              onClick={() => (window.location.href = "/mytask")}
            />
            <NavItem label="Task Categories" icon="📂" />
            <NavItem label="Analytics" icon="📈" />
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
        <button class="relative z-10 flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20">
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
              Vital Tasks Dashboard
            </h1>
            <p class="text-gray-600">
              Manage your most important tasks efficiently
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

        {/* Enhanced Content Grid */}
        <div
          class={`grid grid-cols-1 lg:grid-cols-5 gap-8 transform transition-all duration-1000 delay-300 ${
            isLoaded()
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Enhanced Task List */}
          <section class="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 h-[75vh] flex flex-col border border-white/20">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                Vital Tasks
              </h2>
              <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {vitalTasks.length} tasks
              </div>
            </div>

            <div class="space-y-4 overflow-y-auto pr-2 flex-1 custom-scrollbar">
              <For each={vitalTasks}>
                {(task, index) => (
                  <button
                    onClick={() => setSelectedId(task.id)}
                    class={`group relative w-full rounded-2xl p-5 text-left flex gap-4 transition-all duration-500 transform hover:scale-102 ${
                      selectedId() === task.id
                        ? "bg-gradient-to-r from-orange-50 to-orange-100 ring-2 ring-orange-400 shadow-lg scale-102"
                        : "bg-white/60 hover:bg-white/80 border border-gray-200 hover:border-orange-200 shadow-md hover:shadow-lg"
                    }`}
                    style={{ "animation-delay": `${index() * 100}ms` }}
                  >
                    {/* Enhanced Status Indicator */}
                    <div class="flex flex-col items-center gap-2">
                      <div
                        class={`w-4 h-4 rounded-full transition-all duration-300 ${
                          task.status === "not_started"
                            ? "bg-red-500"
                            : task.status === "in_progress"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        } ${selectedId() === task.id ? "animate-pulse" : ""}`}
                      ></div>
                      <span class="text-lg">{statusIcon(task.status)}</span>
                    </div>

                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-lg mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                        {task.title}
                      </h3>
                      <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                        {task.summary}
                      </p>

                      {/* Enhanced Tags */}
                      <div class="flex flex-wrap gap-2 mb-3">
                        <span
                          class={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor(
                            task.priority
                          )}`}
                        >
                          {priorityIcon(task.priority)} {task.priority}
                        </span>
                        <span
                          class={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                            task.status
                          )}`}
                        >
                          {task.status.replace("_", " ")}
                        </span>
                      </div>

                      <div class="text-xs text-gray-500 flex items-center gap-1">
                        <span>📅</span>
                        Created on {new Date(task.created).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Enhanced Image */}
                    <div class="relative">
                      <img
                        src={task.image}
                        alt="task preview"
                        class="w-20 h-16 object-cover rounded-xl shrink-0 ring-2 ring-white group-hover:ring-orange-200 transition-all duration-300"
                      />
                      {selectedId() === task.id && (
                        <div class="absolute inset-0 bg-orange-500/20 rounded-xl"></div>
                      )}
                    </div>
                  </button>
                )}
              </For>
            </div>
          </section>

          {/* Enhanced Detail Panel */}
          <section class="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-white/20">
            {/* Task Header */}
            <div class="flex items-start gap-6">
              <div class="relative">
                <img
                  src={selected().image}
                  alt="task preview"
                  class="w-40 h-32 object-cover rounded-2xl shadow-lg"
                />
                <div class="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-full text-sm font-bold">
                  {priorityIcon(selected().priority)}
                </div>
              </div>

              <div class="flex-1">
                <h3 class="text-3xl font-bold text-gray-800 mb-4">
                  {selected().title}
                </h3>

                <div class="flex flex-wrap gap-3 mb-4">
                  <div
                    class={`px-4 py-2 rounded-full text-sm font-semibold ${priorityColor(
                      selected().priority
                    )}`}
                  >
                    {priorityIcon(selected().priority)} Priority:{" "}
                    {selected().priority}
                  </div>
                  <div
                    class={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor(
                      selected().status
                    )}`}
                  >
                    {statusIcon(selected().status)} Status:{" "}
                    {selected().status.replace("_", " ")}
                  </div>
                </div>

                <div class="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                  <span>📅</span>
                  <span>
                    Created on{" "}
                    {new Date(selected().created).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Task Description */}
            <div class="bg-gray-50 rounded-2xl p-6 flex-1">
              <h4 class="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <span>📋</span>
                Task Details
              </h4>
              <div class="space-y-3 overflow-y-auto max-h-96 pr-2 custom-scrollbar">
                <For each={selected().description}>
                  {(line, idx) => (
                    <div class="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {idx() + 1}
                      </div>
                      <p class="text-gray-700 leading-relaxed flex-1">{line}</p>
                    </div>
                  )}
                </For>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div class="flex justify-between items-center">
              <div class="flex gap-3">
                <button class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                  <span>✏️</span>
                  Edit Task
                </button>
                <button class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                  <span>🗑️</span>
                  Delete
                </button>
              </div>

              <button class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                <span>✅</span>
                Mark Complete
              </button>
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

export default VitalTaskPage;

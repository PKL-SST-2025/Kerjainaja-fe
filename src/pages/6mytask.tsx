import type { Component } from "solid-js";
import { For, createSignal, onMount } from "solid-js";

/**
 * Vital Task data model & seed ------------------------------------------
 */
interface VitalTask {
  id: number;
  title: string;
  objective: string;
  description: string;
  status: "not_started" | "in_progress" | "completed";
  priority: "low" | "moderate" | "high" | "extreme";
  created: string; // YYYY‑MM‑DD
  deadline: string;
  additionalNotes: string[];
  image?: string;
}

const vitalTasks: VitalTask[] = [
  {
    id: 1,
    title: "Submit Documents",
    objective: "To submit required documents for something important",
    description:
      "Review the list of documents required for submission and ensure all necessary documents are ready. Organize the documents accordingly and scan them if physical copies need to be submitted digitally. Rename the scanned files appropriately for easy identification and verify the accepted file formats.",
    status: "not_started",
    priority: "extreme",
    created: "2025-06-20",
    deadline: "End of Day",
    additionalNotes: [
      "Ensure that the documents are authentic and up-to-date.",
      "Maintain confidentiality and security",
    ],
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=150&h=100&fit=crop",
  },
  {
    id: 2,
    title: "Complete assignments",
    objective: "To complete all pending assignments before final evaluation",
    description:
      "The assignments must be completed to pass final year. Focus on quality and timely submission. Review all requirements and guidelines provided by instructors.",
    status: "in_progress",
    priority: "high",
    created: "2025-06-19",
    deadline: "End of Week",
    additionalNotes: [
      "Double-check all formatting requirements",
      "Submit before the deadline",
      "Keep backup copies of all work",
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=150&h=100&fit=crop",
  },
  {
    id: 3,
    title: "Project Presentation Preparation",
    objective: "Prepare comprehensive presentation for final project review",
    description:
      "Create slides, practice presentation, and prepare for Q&A session. Ensure all project deliverables are ready and properly documented.",
    status: "not_started",
    priority: "high",
    created: "2025-06-18",
    deadline: "Next Monday",
    additionalNotes: [
      "Prepare demo environment",
      "Practice timing for presentation",
      "Prepare answers for potential questions",
    ],
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=100&fit=crop",
  },
];

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

const priorityColor = (priority: VitalTask["priority"]) => {
  switch (priority) {
    case "extreme":
      return "text-red-600 bg-red-50 border-red-200";
    case "high":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "moderate":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "low":
    default:
      return "text-green-600 bg-green-50 border-green-200";
  }
};

const statusColor = (status: VitalTask["status"]) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-50 border-green-200";
    case "in_progress":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "not_started":
    default:
      return "text-red-600 bg-red-50 border-red-200";
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

/**
 * Main Vital Task Page ---------------------------------------------------
 */
const MyTaskPage: Component = () => {
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [activeNavItem, setActiveNavItem] = createSignal("My Task");
  const [selectedTask, setSelectedTask] = createSignal<VitalTask | null>(null);

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
    if (label === "Dashboard") {
      window.location.href = "/dashboard";
      return;
    }
    if (label === "Vital Task") {
      window.location.href = "/vitaltask";
      return;
    }
    if (label === "Settings") {
      window.location.href = "/profile";
      return;
    }
    if (label === "My Task") {
      window.location.href = "/mytask";
      return;
    }
    console.log(`Navigating to: ${label}`);
  };

  // Handle task selection
  const handleTaskSelect = (task: VitalTask) => {
    setSelectedTask(task);
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

          {/* Stats Card: Today's Progress */}
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <h4 class="font-semibold mb-3 text-sm">Today's Progress</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="text-center">
                <div class="text-2xl font-bold">
                  {vitalTasks.filter((t) => t.status === "completed").length}
                </div>
                <div class="text-xs text-white/80">Completed</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold">
                  {vitalTasks.filter((t) => t.status === "in_progress").length}
                </div>
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

      {/* ░░ Main Content ░░ */}
      <main class="flex-1 flex gap-6 p-6">
        {/* Left Side - Task List */}
        <div class="w-2/5 space-y-6">
          {/* Header */}
          <div
            class={`transform transition-all duration-1000 ${
              isLoaded()
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-3xl shadow-2xl">
              <h1 class="text-3xl font-bold mb-2">My Task</h1>
              <p class="text-orange-100">Tuesday, 20/06/2025</p>
            </div>
          </div>

          {/* Task List */}
          <div
            class={`space-y-4 transform transition-all duration-1000 delay-300 ${
              isLoaded()
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 class="text-xl font-bold text-gray-800 mb-4">My Tasks</h2>
            <div class="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <For each={vitalTasks}>
                {(task, index) => (
                  <div
                    onClick={() => handleTaskSelect(task)}
                    class={`group cursor-pointer border-2 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg transform hover:scale-102 ${
                      selectedTask()?.id === task.id
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200 bg-white hover:border-orange-200"
                    }`}
                    style={{ "animation-delay": `${index() * 100}ms` }}
                  >
                    <div class="flex items-center gap-3 mb-3">
                      <div
                        class={`w-4 h-4 rounded-full ${
                          task.status === "not_started"
                            ? "bg-red-500"
                            : task.status === "in_progress"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <h3 class="font-bold text-gray-800 flex-1 truncate">
                        {task.title}
                      </h3>
                    </div>

                    <p class="text-sm text-gray-600 line-clamp-2 mb-3">
                      {task.objective}
                    </p>

                    <div class="flex items-center justify-between">
                      <div class="flex gap-2">
                        <span
                          class={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColor(
                            task.priority
                          )}`}
                        >
                          {priorityIcon(task.priority)} {task.priority}
                        </span>
                        <span
                          class={`px-2 py-1 rounded-full text-xs font-medium border ${statusColor(
                            task.status
                          )}`}
                        >
                          {statusIcon(task.status)}{" "}
                          {task.status.replace("_", " ")}
                        </span>
                      </div>
                      <span class="text-xs text-gray-500">
                        Created on: {task.created}
                      </span>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>

        {/* Right Side - Task Details */}
        <div class="flex-1">
          {selectedTask() ? (
            <div
              class={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-1000 delay-500 ${
                isLoaded()
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Task Header */}
              <div class="flex items-start gap-4 mb-6">
                {selectedTask()?.image && (
                  <img
                    src={selectedTask()!.image}
                    alt="task thumbnail"
                    class="w-32 h-20 object-cover rounded-2xl shadow-lg"
                  />
                )}
                <div class="flex-1">
                  <h2 class="text-2xl font-bold text-gray-800 mb-2">
                    {selectedTask()?.title}
                  </h2>
                  <div class="flex gap-2 mb-3">
                    <span
                      class={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColor(
                        selectedTask()!.priority
                      )}`}
                    >
                      Priority: {selectedTask()?.priority}
                    </span>
                    <span
                      class={`px-3 py-1 rounded-full text-sm font-medium border ${statusColor(
                        selectedTask()!.status
                      )}`}
                    >
                      Status: {selectedTask()?.status.replace("_", " ")}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600">
                    Created on: {selectedTask()?.created}
                  </p>
                </div>
              </div>

              {/* Task Details */}
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-2">
                    Task Title:
                  </h3>
                  <p class="text-gray-700">{selectedTask()?.title}</p>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-2">
                    Objective:
                  </h3>
                  <p class="text-gray-700">{selectedTask()?.objective}</p>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-2">
                    Task Description:
                  </h3>
                  <p class="text-gray-700 leading-relaxed">
                    {selectedTask()?.description}
                  </p>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-2">
                    Additional Notes:
                  </h3>
                  <ul class="space-y-2">
                    <For each={selectedTask()?.additionalNotes}>
                      {(note) => (
                        <li class="flex items-start gap-2 text-gray-700">
                          <span class="text-orange-500 mt-1">•</span>
                          <span>{note}</span>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-2">
                    Deadline for Submission:
                  </h3>
                  <p class="text-gray-700">{selectedTask()?.deadline}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div class="flex gap-4 mt-8">
                <button
                  onClick={() => console.log("Edit task:", selectedTask()?.id)}
                  class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <span>✏️</span>
                  Edit Task
                </button>
                <button
                  onClick={() =>
                    console.log("Mark complete:", selectedTask()?.id)
                  }
                  class="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <span>✅</span>
                  Mark Complete
                </button>
              </div>
            </div>
          ) : (
            <div
              class={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 h-full flex items-center justify-center transform transition-all duration-1000 delay-500 ${
                isLoaded()
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div class="text-center">
                <div class="text-6xl mb-4">🎯</div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">
                  Select a My Task
                </h3>
                <p class="text-gray-600">
                  Choose a task from the list to view its details
                </p>
              </div>
            </div>
          )}
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
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default MyTaskPage;

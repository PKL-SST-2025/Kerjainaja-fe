import type { Component } from "solid-js";
import { For, createSignal, onMount } from "solid-js";

/**
 * Dummy data model & seed --------------------------------------------------
 */
interface Task {
  id: number;
  title: string;
  description: string;
  status: "not_started" | "in_progress" | "completed";
  priority: "low" | "moderate" | "high";
  created: string; // YYYY‑MM‑DD
}

const dummyTasks: Task[] = [
  {
    id: 1,
    title: "Attend Nischal's Birthday Party",
    description:
      "Buy gifts on the way and pick up cake from the bakery. 6 PM | Fresh Elements",
    status: "not_started",
    priority: "moderate",
    created: "2025-06-20",
  },
  {
    id: 2,
    title: "Landing Page Design for TravelDays",
    description:
      "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
    status: "in_progress",
    priority: "moderate",
    created: "2025-06-20",
  },
  {
    id: 3,
    title: "Presentation on Final Product",
    description:
      "Make sure everything is functioning and documents ready for …",
    status: "in_progress",
    priority: "moderate",
    created: "2025-06-19",
  },
  {
    id: 4,
    title: "Walk the dog",
    description: "Take the dog to the park and bring treats as well.",
    status: "completed",
    priority: "low",
    created: "2025-06-18",
  },
  {
    id: 5,
    title: "Conduct meeting",
    description: "Meet with the client and finalize requirements.",
    status: "completed",
    priority: "low",
    created: "2025-06-18",
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

const StatusRing: Component<{
  percent: number;
  label: string;
  colorClass: string; // e.g. "text-green-500"
}> = (props) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (props.percent / 100) * circumference;

  return (
    <div class="flex flex-col items-center">
      <svg width="96" height="96" class="-rotate-90">
        {/* Background circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke-width="10"
          fill="transparent"
          class="text-gray-200"
          style={{ stroke: "currentColor" }}
        />

        {/* Progress circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke-width="10"
          stroke-linecap="round"
          fill="transparent"
          class={props.colorClass}
          style={{
            stroke: "currentColor",
            "stroke-dasharray": `${circumference}`,
            "stroke-dashoffset": `${offset}`,
            transition: "stroke-dashoffset 300ms ease",
          }}
        />
      </svg>
      <span class={`mt-2 font-semibold ${props.colorClass}`}>
        {props.percent}%
      </span>
      <span class="text-xs text-gray-500">{props.label}</span>
    </div>
  );
};

const statusColor = (status: Task["status"]) => {
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

const priorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "text-orange-500 bg-orange-50";
    case "moderate":
      return "text-blue-500 bg-blue-50";
    case "low":
    default:
      return "text-green-600 bg-green-50";
  }
};

const statusIcon = (status: Task["status"]) => {
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

const priorityIcon = (priority: Task["priority"]) => {
  switch (priority) {
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
 * Main Dashboard -----------------------------------------------------------
 */
const DashboardPage: Component = () => {
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [activeNavItem, setActiveNavItem] = createSignal("Dashboard");

  const toDoTasks = dummyTasks.filter((t) => t.status !== "completed");
  const completedTasks = dummyTasks.filter((t) => t.status === "completed");

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
    // Navigasi ke halaman Dashboard
    if (label === "Dashboard") {
      window.location.href = "/dashboard";
      return;
    }
    // Navigasi ke halaman Vital Task
    if (label === "Vital Task") {
      window.location.href = "/vitaltask";
      return;
    }
    // Navigasi ke halaman My Task
    if (label === "My Task") {
      window.location.href = "/mytask";
      return;
    }
    // Navigasi ke halaman ProfilePage (Settings)
    if (label === "Settings") {
      window.location.href = "/profile";
      return;
    }
    // Navigasi lain bisa ditambahkan di sini
    console.log(`Navigating to: ${label}`);
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

          {/* Stats Card */}
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <h4 class="font-semibold mb-3 text-sm">Today's Progress</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="text-center">
                <div class="text-2xl font-bold">{completedTasks.length}</div>
                <div class="text-xs text-white/80">Completed</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold">{toDoTasks.length}</div>
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
              Welcome back, Alfazri 👋
            </h1>
            <p class="text-gray-600">
              Tuesday, 20/06/2025 - Let's make today productive!
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

        {/* Enhanced Three-column grid */}
        <div
          class={`grid grid-cols-1 xl:grid-cols-3 gap-8 transform transition-all duration-1000 delay-300 ${
            isLoaded()
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Enhanced To-Do Section */}
          <section class="xl:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span class="text-2xl">📋</span>
                To-Do Tasks
              </h2>
              <button
                onClick={() => console.log("Add task clicked")}
                class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>➕</span>
                Add Task
              </button>
            </div>

            <div class="space-y-4 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
              <For each={toDoTasks}>
                {(task, index) => (
                  <div
                    class="group border border-gray-200 rounded-2xl p-5 flex gap-4 bg-gradient-to-r from-white/60 to-white/80 hover:from-white/80 hover:to-white/100 transition-all duration-300 hover:shadow-lg hover:border-orange-200 transform hover:scale-102"
                    style={{ "animation-delay": `${index() * 100}ms` }}
                  >
                    {/* Enhanced Status Indicator */}
                    <div class="flex flex-col items-center gap-2">
                      <div
                        class={`w-4 h-4 rounded-full transition-all duration-300 ${
                          task.status === "not_started"
                            ? "bg-red-500"
                            : task.status === "in_progress"
                            ? "bg-blue-500 animate-pulse"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <span class="text-lg">{statusIcon(task.status)}</span>
                    </div>

                    <div class="w-1.5 rounded-full bg-gradient-to-b from-orange-400 to-orange-600"></div>

                    <div class="flex-1 space-y-2 overflow-hidden">
                      <h3 class="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors truncate">
                        {task.title}
                      </h3>
                      <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>

                      <div class="flex flex-wrap gap-2 mt-3">
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
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          📅 {task.created}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        console.log(`Options clicked for task: ${task.title}`)
                      }
                      class="text-gray-400 hover:text-orange-600 self-start opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 hover:bg-orange-50 rounded-lg"
                    >
                      <span class="text-lg">⋮</span>
                    </button>
                  </div>
                )}
              </For>
            </div>
          </section>

          {/* Enhanced Right side */}
          <div class="flex flex-col gap-8">
            {/* Enhanced Completed Tasks */}
            <section class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span class="text-2xl">✅</span>
                Completed Tasks
              </h2>
              <div class="space-y-4">
                <For each={completedTasks}>
                  {(task, index) => (
                    <div
                      class="group border border-gray-200 rounded-2xl p-4 flex gap-4 bg-gradient-to-r from-green-50/50 to-green-100/50 hover:from-green-100/70 hover:to-green-50/70 transition-all duration-300 hover:shadow-md"
                      style={{ "animation-delay": `${index() * 100}ms` }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=80&fit=crop"
                        alt="task thumbnail"
                        class="w-20 h-14 object-cover rounded-xl shrink-0 ring-2 ring-green-200 group-hover:ring-green-300 transition-all duration-300"
                      />
                      <div class="flex-1">
                        <h3 class="font-bold text-gray-800 truncate group-hover:text-green-600 transition-colors">
                          {task.title}
                        </h3>
                        <p class="text-sm text-gray-600 line-clamp-2 mt-1">
                          {task.description}
                        </p>
                        <div class="flex items-center gap-2 mt-2">
                          <span class="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                            ✅ Completed
                          </span>
                          <span class="text-xs text-gray-500">2 days ago</span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          console.log(
                            `Options clicked for completed task: ${task.title}`
                          )
                        }
                        class="text-gray-400 hover:text-green-600 self-start opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 hover:bg-green-50 rounded-lg"
                      >
                        <span class="text-lg">⋮</span>
                      </button>
                    </div>
                  )}
                </For>
              </div>
            </section>

            {/* Enhanced Status Ring */}
            <section class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span class="text-2xl">📊</span>
                Task Status
              </h2>
              <div class="flex justify-around">
                <StatusRing
                  percent={Math.round(
                    (completedTasks.length / dummyTasks.length) * 100
                  )}
                  label="Completed"
                  colorClass="text-green-500"
                />
                <StatusRing
                  percent={Math.round(
                    (toDoTasks.filter((t) => t.status === "in_progress")
                      .length /
                      dummyTasks.length) *
                      100
                  )}
                  label="In Progress"
                  colorClass="text-blue-500"
                />
                <StatusRing
                  percent={Math.round(
                    (toDoTasks.filter((t) => t.status === "not_started")
                      .length /
                      dummyTasks.length) *
                      100
                  )}
                  label="Not Started"
                  colorClass="text-red-500"
                />
              </div>
            </section>
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

export default DashboardPage;

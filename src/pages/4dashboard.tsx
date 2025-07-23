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

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  time: string;
  isRead: boolean;
  icon: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "deadline" | "event";
  color: string;
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

const dummyNotifications: Notification[] = [
  {
    id: 1,
    title: "Complete UI Design of Landing Page for TravelDays",
    message: "Don't forget to discuss with the client before leaving",
    type: "warning",
    time: "2 hours ago",
    isRead: false,
    icon: "⚠️",
  },
  {
    id: 2,
    title: "Complete the UI Design of Landing Page for TravelDays",
    message: "Priority: High",
    type: "error",
    time: "3 hours ago",
    isRead: false,
    icon: "🚨",
  },
  {
    id: 3,
    title: "You have Monday web design for Pet Vacation",
    message: "Meeting scheduled at 2 PM",
    type: "info",
    time: "5 hours ago",
    isRead: true,
    icon: "📅",
  },
  {
    id: 4,
    title: "Complete the online design for Juice Slider",
    message: "Deadline: Today 6 PM",
    type: "warning",
    time: "1 day ago",
    isRead: true,
    icon: "⏰",
  },
  {
    id: 5,
    title: "Complete the online slideshow for Juice Slider",
    message: "Task completed successfully",
    type: "success",
    time: "2 days ago",
    isRead: true,
    icon: "✅",
  },
];

const dummyCalendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Team Meeting",
    date: "2025-06-20",
    time: "10:00 AM",
    type: "meeting",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Project Deadline",
    date: "2025-06-21",
    time: "6:00 PM",
    type: "deadline",
    color: "bg-red-500",
  },
  {
    id: 3,
    title: "Client Presentation",
    date: "2025-06-22",
    time: "2:00 PM",
    type: "meeting",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Birthday Party",
    date: "2025-06-23",
    time: "6:00 PM",
    type: "event",
    color: "bg-purple-500",
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
  colorClass: string;
}> = (props) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (props.percent / 100) * circumference;

  return (
    <div class="flex flex-col items-center">
      <svg width="96" height="96" class="-rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke-width="10"
          fill="transparent"
          class="text-gray-200"
          style={{ stroke: "currentColor" }}
        />
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

const NotificationItem: Component<{
  notification: Notification;
  onMarkAsRead: (id: number) => void;
}> = (props) => {
  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <div
      class={`p-4 rounded-2xl border transition-all duration-300 hover:shadow-md ${
        props.notification.isRead ? "opacity-60 bg-gray-50" : "bg-white"
      } ${getTypeColor(props.notification.type)}`}
    >
      <div class="flex items-start gap-3">
        <span class="text-lg flex-shrink-0">{props.notification.icon}</span>
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold text-sm leading-tight mb-1 truncate">
            {props.notification.title}
          </h4>
          <p class="text-xs text-gray-600 mb-2 line-clamp-2">
            {props.notification.message}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">{props.notification.time}</span>
            {!props.notification.isRead && (
              <button
                onClick={() => props.onMarkAsRead(props.notification.id)}
                class="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarWidget: Component<{
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}> = (props) => {
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [selectedDate, setSelectedDate] = createSignal(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    const current = currentDate();
    return (
      day === today.getDate() &&
      current.getMonth() === today.getMonth() &&
      current.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number | null) => {
    if (!day) return false;
    const selected = selectedDate();
    const current = currentDate();
    return (
      day === selected.getDate() &&
      current.getMonth() === selected.getMonth() &&
      current.getFullYear() === selected.getFullYear()
    );
  };

  const hasEvent = (day: number | null) => {
    if (!day) return false;
    const current = currentDate();
    const dateString = `${current.getFullYear()}-${String(
      current.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return props.events.some((event) => event.date === dateString);
  };

  const getEventForDay = (day: number | null) => {
    if (!day) return null;
    const current = currentDate();
    const dateString = `${current.getFullYear()}-${String(
      current.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return props.events.find((event) => event.date === dateString);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const current = currentDate();
    const newDate = new Date(current);
    if (direction === "prev") {
      newDate.setMonth(current.getMonth() - 1);
    } else {
      newDate.setMonth(current.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = getDaysInMonth(currentDate());
  const todayEvents = props.events.filter((event) => {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return event.date === todayString;
  });

  return (
    <div class="space-y-4">
      {/* Calendar Header */}
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-800">
          {monthNames[currentDate().getMonth()]} {currentDate().getFullYear()}
        </h3>
        <div class="flex gap-2">
          <button
            onClick={() => navigateMonth("prev")}
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span class="text-gray-600">←</span>
          </button>
          <button
            onClick={() => navigateMonth("next")}
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span class="text-gray-600">→</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        {/* Day headers */}
        <div class="grid grid-cols-7 gap-1 mb-2">
          <For each={dayNames}>
            {(day) => (
              <div class="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            )}
          </For>
        </div>

        {/* Calendar days */}
        <div class="grid grid-cols-7 gap-1">
          <For each={days}>
            {(day) => (
              <div
                class={`relative h-8 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-all duration-200 ${
                  day === null
                    ? ""
                    : isToday(day)
                    ? "bg-orange-500 text-white font-bold"
                    : isSelected(day)
                    ? "bg-blue-500 text-white"
                    : hasEvent(day)
                    ? "bg-blue-100 text-blue-800 font-medium hover:bg-blue-200"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  if (day) {
                    const newDate = new Date(currentDate());
                    newDate.setDate(day);
                    setSelectedDate(newDate);
                    const event = getEventForDay(day);
                    if (event) {
                      props.onEventClick(event);
                    }
                  }
                }}
              >
                {day}
                {hasEvent(day) && (
                  <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                )}
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Today's Events */}
      {todayEvents.length > 0 && (
        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-gray-700">Today's Events</h4>
          <For each={todayEvents}>
            {(event) => (
              <div
                class={`p-3 rounded-lg border-l-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors ${event.color} border-l-current`}
                onClick={() => props.onEventClick(event)}
              >
                <div class="flex items-center justify-between">
                  <h5 class="font-medium text-sm text-gray-800">
                    {event.title}
                  </h5>
                  <span class="text-xs text-gray-500">{event.time}</span>
                </div>
              </div>
            )}
          </For>
        </div>
      )}
    </div>
  );
};

// Helper functions
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
  const [showNotifications, setShowNotifications] = createSignal(false);
  const [showCalendar, setShowCalendar] = createSignal(false);
  const [notifications, setNotifications] = createSignal(dummyNotifications);
  const [events, setEvents] = createSignal(dummyCalendarEvents);

  const toDoTasks = dummyTasks.filter((t) => t.status !== "completed");
  const completedTasks = dummyTasks.filter((t) => t.status === "completed");
  const unreadNotifications = () => notifications().filter((n) => !n.isRead);

  // Navigation items configuration
  const navItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Vital Task", icon: "🎯" },
    { label: "My Task", icon: "📝" },
    { label: "Task Categories", icon: "📂", href: "/categories" }, // arahkan ke /taskcate
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
    if (label === "My Task") {
      window.location.href = "/mytask";
      return;
    }
    if (label === "Settings") {
      window.location.href = "/profile";
      return;
    }
    console.log(`Navigating to: ${label}`);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications());
    setShowCalendar(false);
  };

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar());
    setShowNotifications(false);
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log("Event clicked:", event);
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
                  onClick={() => {
                    if (item.href) {
                      window.location.href = item.href;
                    } else {
                      handleNavClick(item.label);
                    }
                  }}
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
          onClick={() => console.log("/login")}
          class="relative z-10 flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
        >
          <span class="text-lg">🚪</span>
          <span class="font-medium">Logout</span>
        </button>
      </aside>

      {/* ░░ Enhanced Main content ░░ */}
      <main class="flex-1 p-8 space-y-8 overflow-y-auto relative">
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
          <div class="flex gap-4 items-center relative">
            <button
              onClick={handleNotificationClick}
              class="group relative p-4 bg-white hover:bg-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span class="text-xl group-hover:animate-pulse">🔔</span>
              {unreadNotifications().length > 0 && (
                <div class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadNotifications().length}
                </div>
              )}
            </button>
            <button
              onClick={handleCalendarClick}
              class="group p-4 bg-white hover:bg-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span class="text-xl group-hover:animate-pulse">📅</span>
            </button>
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <p class="text-sm font-medium">Tuesday 20/06/2025</p>
            </div>
          </div>
        </header>

        {/* Notification Panel */}
        {showNotifications() && (
          <div class="absolute top-20 right-8 w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 z-50 max-h-96 overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-800">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                class="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div class="space-y-4">
              <For each={notifications()}>
                {(notification) => (
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                  />
                )}
              </For>
            </div>
          </div>
        )}

        {/* Calendar Panel */}
        {showCalendar() && (
          <div class="absolute top-20 right-8 w-80 bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 z-50">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-800">Calendar</h3>
              <button
                onClick={() => setShowCalendar(false)}
                class="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <CalendarWidget events={events()} onEventClick={handleEventClick} />
          </div>
        )}

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
                onClick={() => (window.location.href = "/addtask")}
                class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>➕</span>
                Add Task
              </button>
            </div>

            <div class="space-y-4 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
              <For each={toDoTasks}>
                {(task, index) => (
                  <div class="group border border-gray-200 rounded-2xl p-5 flex gap-4 bg-gradient-to-r from-white/60 to-white/80 hover:from-white/80 hover:to-white/100 transition-all duration-300 hover:shadow-lg hover:border-orange-200 transform hover:scale-105">
                    <div class="flex flex-col items-center gap-2">
                      <div
                        class={`w-4 h-4 rounded-full ${
                          task.status === "not_started"
                            ? "bg-red-500"
                            : task.status === "in_progress"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <span class="text-xl">{statusIcon(task.status)}</span>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-lg text-gray-800">
                        {task.title}
                      </h3>
                      <p class="text-gray-500 text-sm mt-1">
                        {task.description}
                      </p>
                      <div class="flex items-center gap-2 mt-2">
                        <span
                          class={`text-xs px-2 py-1 rounded-full ${priorityColor(
                            task.priority
                          )}`}
                        >
                          {priorityIcon(task.priority)} {task.priority}
                        </span>
                        <span
                          class={`text-xs px-2 py-1 rounded-full ${statusColor(
                            task.status
                          )}`}
                        >
                          {task.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </section>

          {/* Completed Tasks Section */}
          <section class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span class="text-2xl">✅</span>
              Completed Tasks
            </h2>
            <div class="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              <For each={completedTasks}>
                {(task) => (
                  <div class="border border-gray-200 rounded-2xl p-5 flex gap-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:shadow-lg hover:border-green-200">
                    <div class="flex flex-col items-center gap-2">
                      <div class="w-4 h-4 rounded-full bg-green-500"></div>
                      <span class="text-xl">{statusIcon(task.status)}</span>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-lg text-gray-800">
                        {task.title}
                      </h3>
                      <p class="text-gray-500 text-sm mt-1">
                        {task.description}
                      </p>
                      <div class="flex items-center gap-2 mt-2">
                        <span
                          class={`text-xs px-2 py-1 rounded-full ${priorityColor(
                            task.priority
                          )}`}
                        >
                          {priorityIcon(task.priority)} {task.priority}
                        </span>
                        <span
                          class={`text-xs px-2 py-1 rounded-full ${statusColor(
                            task.status
                          )}`}
                        >
                          {task.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

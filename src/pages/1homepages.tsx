import type { Component } from "solid-js";
import { createSignal, onMount } from "solid-js";
import pattern from "../assets/pattern.png";

const HomePage: Component = () => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [currentFact, setCurrentFact] = createSignal(0);

  // Animation trigger on mount
  onMount(() => {
    setTimeout(() => setIsVisible(true), 300);

    // Rotate facts every 5 seconds
    setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % 3);
    }, 5000);
  });

  const facts = [
    {
      title: "No Fuss, Just Get It Done",
      description:
        "KerjainAja is built for people who want a simple, fast, and effective to-do list.",
      icon: "⚡",
    },
    {
      title: "Access Anytime, Anywhere",
      description:
        "Whether you're on your phone, tablet, or laptop, your tasks are always synced and ready.",
      icon: "📱",
    },
    {
      title: "Smart Reminders That Work With You",
      description:
        "Our notifications help keep you on track without overwhelming you.",
      icon: "🧠",
    },
  ];

  return (
    <div
      class="min-h-screen bg-gradient-to-br from-orange-300 via-orange-400 to-amber-400 relative overflow-hidden"
      style={{
        "background-image": `
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          url{pattern}
        `,
        "background-color": "#FFC067",
      }}
    >
      {/* Animated Background Elements */}
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div class="relative z-10 flex flex-col items-center px-4 py-8 text-gray-800">
        {/* Logo & Title with entrance animation */}
        <div
          class={`text-center mt-8 transform transition-all duration-1000 ${
            isVisible()
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div class="relative group mb-6">
            {/* Glowing Background Circle */}
            <div class="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-white/30 rounded-full blur-2xl scale-110 animate-pulse"></div>

            {/* Outer Ring Animation */}
            <div
              class="absolute inset-0 rounded-full border-4 border-white/20 scale-110 animate-spin"
              style="animation-duration: 20s;"
            ></div>
            <div
              class="absolute inset-0 rounded-full border-2 border-white/30 scale-105 animate-spin"
              style="animation-duration: 15s; animation-direction: reverse;"
            ></div>

            {/* Logo Container */}
            <div class="relative bg-white/10 backdrop-blur-sm rounded-full p-6 shadow-2xl">
              <img
                src="src/assets/Logokerjainaja.png"
                alt="KerjainAja Logo"
                class="mx-auto w-72 md:w-96 drop-shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 filter brightness-110"
              />

              {/* Shimmer Effect */}
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full transform -skew-x-12 group-hover:animate-pulse"></div>
            </div>

            {/* Floating Sparkles */}
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-white/60 rounded-full animate-ping"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-white/60 rounded-full animate-ping delay-500"></div>
            <div class="absolute top-1/2 -right-4 w-2 h-2 bg-white/60 rounded-full animate-ping delay-1000"></div>

            {/* 3D Shadow Effect */}
            <div class="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 rounded-full transform translate-x-2 translate-y-2 -z-10 blur-sm"></div>
          </div>

          {/* Enhanced Subtitle */}
          <div class="mt-4 text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            <span class="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Your Personal Productivity Companion
            </span>
          </div>

          {/* Animated Tagline */}
          <div class="mt-2 text-sm md:text-base text-white/80 font-medium animate-pulse">
            ✨ Simple • Fast • Effective ✨
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div class="mt-8 flex flex-col items-center animate-bounce">
          <div class="text-4xl mb-2 text-white/80">↓</div>
          <div class="text-sm text-white/70 font-medium">Scroll to explore</div>
        </div>

        {/* Interactive Quick Facts Box */}
        <div
          class={`mt-8 bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-2xl w-full transform transition-all duration-1000 delay-300 ${
            isVisible()
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h2 class="font-bold mb-6 text-2xl text-gray-800 text-center">
            Why Choose KerjainAja?
          </h2>

          {/* Fact Navigation Dots */}
          <div class="flex justify-center mb-6 space-x-2">
            {facts.map((_, index) => (
              <button
                onClick={() => setCurrentFact(index)}
                class={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentFact() === index
                    ? "bg-orange-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Animated Fact Display */}
          <div class="relative h-32 overflow-hidden">
            {facts.map((fact, index) => (
              <div
                class={`absolute inset-0 transition-all duration-500 transform ${
                  currentFact() === index
                    ? "translate-x-0 opacity-100"
                    : index < currentFact()
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
              >
                <div class="text-center">
                  <div class="text-4xl mb-3">{fact.icon}</div>
                  <h3 class="font-bold text-lg mb-2 text-gray-800">
                    {fact.title}
                  </h3>
                  <p class="text-gray-600 leading-relaxed">
                    {fact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div class="mt-6 w-full bg-gray-200 rounded-full h-1">
            <div
              class="bg-gradient-to-r from-orange-400 to-orange-600 h-1 rounded-full transition-all duration-300"
              style={{
                width: `${((currentFact() + 1) / facts.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Enhanced About Us Section */}
        <div
          class={`mt-8 bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-2xl w-full transform transition-all duration-1000 delay-500 ${
            isVisible()
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h3 class="font-bold mb-6 text-2xl text-gray-800 flex items-center">
            <span class="text-2xl mr-3">🎯</span>
            About Us
          </h3>

          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p class="text-lg">
              We know what it feels like to have a long list of things to do and
              not know where to start.
              <span class="font-semibold text-orange-600">KerjainAja</span> was
              born from that everyday struggle — and built to help you stay
              focused, organized, and in control.
            </p>

            <div class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border-l-4 border-orange-400">
              <p class="italic">
                "Made for everyone: students, freelancers, office workers —
                anyone who wants a better way to manage their day. Because at
                the end of the day, it's not about being busy all the time. It's
                about knowing what matters, and just… get it done."
              </p>
            </div>
          </div>

          {/* Enhanced Contact & Social Icons */}
          <div class="mt-8 flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div class="flex items-center space-x-2">
              <span class="text-2xl">📧</span>
              <span class="font-semibold text-gray-700">Contact Us</span>
            </div>
            <div class="flex space-x-4">
              <button class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 transform hover:scale-110">
                <span class="text-sm font-bold">f</span>
              </button>
              <button class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 transform hover:scale-110">
                <span class="text-sm font-bold">G</span>
              </button>
              <button class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 transform hover:scale-110">
                <span class="text-sm font-bold">X</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div class="mt-10 mb-8">
          <button
            class="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-12 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            onClick={() => (window.location.href = "/register")}
          >
            <span class="relative z-10 flex items-center space-x-2">
              <span class="text-lg">🚀</span>
              <span class="text-lg">Get Started Now</span>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>

          <p class="text-center mt-4 text-white/80 text-sm">
            Join thousands of productive people worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

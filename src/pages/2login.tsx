import type { Component } from "solid-js";

const LoginPage: Component = () => {
  return (
    <div
      class="min-h-screen bg-orange-100 flex items-center justify-center bg-cover bg-center"
      style={{
        "background-image": "url('src/assets/pattern.png')",
        "background-color": "#FFC067",
      }}
    >
      <div class="bg-orange-50 rounded-xl shadow-lg w-[90%] max-w-4xl flex flex-col md:flex-row p-6">
        {/* Left Side Image */}
        <div class="hidden md:flex items-center justify-center w-1/2">
          <img
            src="src/assets/oranglogin.png"
            alt="Login Illustration"
            class="w-full max-w-sm"
          />
        </div>

        {/* Right Side Form */}
        <div class="w-full md:w-1/2 px-4 py-6">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>

          <form class="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter Username"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <div>
              <button
                type="submit"
                class="bg-pink-400 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-md w-full"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/dashboard";
                }}
              >
                Login
              </button>
            </div>
          </form>

          {/* Social Login */}
          <div class="mt-4 text-sm flex items-center">
            <span class="mr-2">Or, Login with</span>
            <div class="flex gap-2">
              <a href="#" class="text-blue-700 font-bold">
                F
              </a>
              <a href="#" class="text-orange-600 font-bold">
                G
              </a>
              <a href="#" class="text-black font-bold">
                X
              </a>
            </div>
          </div>

          <div class="mt-2 text-sm">
            Don’t have an account?{" "}
            <a
              href="/register"
              class="text-blue-500"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/register";
              }}
            >
              Create One
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import HomePage from "./pages/1homepages";
import LoginPage from "./pages/2login";
import RegisterPage from "./pages/3register";
import DashboardPage from "./pages/4dashboard";
import VitalTaskPage from "./pages/5vitaltask";
import MyTaskPage from "./pages/6mytask";
import ProfilePage from "./pages/7accinfo";
import EditTaskPage from "./pages/9.addtask";
import TaskCategoriesPage from "./pages/8.taskcate"; 

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/vitaltask" component={VitalTaskPage} />
      <Route path="/mytask" component={MyTaskPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/addtask" component={EditTaskPage} />
      <Route path="/categories" component={TaskCategoriesPage} />
    </Router>
  );
};

export default App;

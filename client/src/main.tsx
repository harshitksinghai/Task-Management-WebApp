import App from "./App.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";
import UserMain from "./screens/UserMain.tsx";
import Marketing from "./screens/Marketing.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import TaskScreen from "./screens/TaskScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Marketing />} />
      <Route index={true} path="/register" element={<RegisterScreen />} />
      <Route index={true} path="/login" element={<LoginScreen />} />
      <Route index={true} path="/main" element={<UserMain />} />
      <Route index={true} path="/main/:taskId" element={<TaskScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(

    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>

);

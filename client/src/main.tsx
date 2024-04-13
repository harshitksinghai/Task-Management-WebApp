import App from "./App.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { store } from "./manageState/store/store.ts";
import LoginScreen from "./screens/LoginScreen.tsx";
import Marketing from "./screens/Marketing.tsx";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import TaskScreen from "./screens/TaskScreen.tsx";
import UserMain from "./screens/UserMain.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Marketing />} />
      <Route index={true} path="/register" element={<RegisterScreen />} />
      <Route index={true} path="/login" element={<LoginScreen />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/main" element={<UserMain />} />
        <Route index={true} path="/profile" element={<ProfileScreen />} />
        <Route index={true} path="/main/:taskId" element={<TaskScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>

      <RouterProvider router={router} />

  </Provider>
);

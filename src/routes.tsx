import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Container from "./components/Container";
import Notifications from "./pages/Notifications";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";
import ManageGroups from "./pages/MangeGroups";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/create-group" element={<CreateGroup/>} />
        <Route path="/manage-groups" element={<ManageGroups/>} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;

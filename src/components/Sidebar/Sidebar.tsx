import React from "react";
import { useAuth } from "../../contexts/authorizationContext";
import SidebarModerathor from "./SidebarModerathor";
import SidebarUser from "./SidebarUser";

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (user?.isAuthorized) {
    return <SidebarModerathor />;
  }

  return <SidebarUser />;
}

export default Sidebar;

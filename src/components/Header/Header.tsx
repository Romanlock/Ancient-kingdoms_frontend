import React from "react";
import { useAuth } from "../../contexts/authorizationContext";
import HeaderUser from "./HeaderUser";
import HeaderModerathor from "./HeaderModerathor";

const Header: React.FC = () => {
    const { user } = useAuth();

    if (user?.isAuthorized) {
        return <HeaderModerathor />;
    }
    
    return <HeaderUser />;
}

export default Header;

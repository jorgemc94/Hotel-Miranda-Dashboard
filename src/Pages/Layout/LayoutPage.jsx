import { Outlet } from "react-router-dom";
import { LayoutContent, LayoutGrid, LayoutHeader, LayoutMenu } from "./LayoutStyled";
import { MenuComponent } from "../../Components/Menu/MenuComponent";
import { HeaderComponent } from "../../Components/Header/HeaderComponent";
import { useState } from "react";

export const LayoutPage = () => {
    const [menuDisabled, setMenuDisabled] = useState(false);

    const toggleMenu = () => {
        setMenuDisabled(!menuDisabled);
    };

    return (
        <LayoutGrid>
            <LayoutMenu $disable={menuDisabled}>
                <MenuComponent />
            </LayoutMenu>
            <LayoutHeader>
                <HeaderComponent toggleMenu={toggleMenu} menuDisabled={menuDisabled} />
            </LayoutHeader>
            <LayoutContent $menuOpen={!menuDisabled}>
                <Outlet/>
            </LayoutContent>
        </LayoutGrid>
    )
};

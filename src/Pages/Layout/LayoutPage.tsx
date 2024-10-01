import { Outlet, useLocation } from "react-router-dom";
import { LayoutContent, LayoutGrid, LayoutHeader, LayoutMenu } from "./LayoutStyled";
import { MenuComponent } from "../../Components/Menu/MenuComponent";
import { HeaderComponent } from "../../Components/Header/HeaderComponent";
import { useEffect, useState } from "react";

export const LayoutPage = () => {
    const [menuDisabled, setMenuDisabled] = useState(false);
    const [pageTitle, setPageTitle] = useState("Default Title");
    const location = useLocation();

    const toggleMenu = () => {
        setMenuDisabled(!menuDisabled);
    };

    useEffect(() => {
        switch(location.pathname) {
            case '/':
                setPageTitle('Dashboard');
                break;
            case '/rooms':
                setPageTitle('Rooms');
                break;
            case '/bookings':
                setPageTitle('Bookings');
                break;
            case '/users':
                setPageTitle('Users');
                break;
            case '/contact':
                setPageTitle('Contact')
                break;
            default:
                setPageTitle('');
                break;
        }
    },[location])

    return (
        <LayoutGrid>
            <LayoutMenu $disable={menuDisabled}>
                <MenuComponent />
            </LayoutMenu>
            <LayoutHeader  $menuOpen={menuDisabled}>
                <HeaderComponent toggleMenu={toggleMenu} menuDisabled={menuDisabled} title={pageTitle}/>
            </LayoutHeader>
            <LayoutContent $menuOpen={menuDisabled}>
                <Outlet/>
            </LayoutContent>
        </LayoutGrid>
    )
};
import { Header, Menu, MenuLogo, Nav, ImageMenu, TextMenu, TextLogo, TextHeader, TitleText, IconsHeader } from "./NavbarStyled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import '../../styles.css';
import { SlBell, SlEnvolope, SlLogout } from "react-icons/sl";
import { ImContrast } from "react-icons/im";

{/*import { Header, Icons, ImageMenu, LogoMenu, Menu, Nav, Pepe, TextLogo, TextMenu, Title, TitleText } from "./NavbarStyled";
import { useState } from "react";





export const NavbarComponent = () => {
    

    return (
        <>
            <Nav>
                <Menu $disable={menuDisabled}>
                    <LogoMenu>
                        <ImageMenu src="src/assets/icon.png" alt="logo" />
                        
                    </LogoMenu>
                </Menu>
                <Header >
                    
                    
                </Header>
            </Nav>
            <Outlet/>
        </>
    );
}
*/}

export const NavbarComponent = () => {
    

    const [menuDisabled, setMenuDisabled] = useState(true);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuDisabled(!menuDisabled);
    };

    const HandlerLogoOut = () => {
        localStorage.setItem('login','false');
        navigate('/login');
    }

    return (
        <Nav>
            <Menu $disable={menuDisabled}>
                <MenuLogo>
                    <ImageMenu src="src/assets/icon.png" alt="logo" />
                    <TextMenu>
                            <TextLogo $title>travl</TextLogo>
                            <TextLogo>Hotel Admin Dashboard</TextLogo>
                    </TextMenu>
                </MenuLogo>
            </Menu>
            <Header $menuOpen={!menuDisabled}>
                <TextHeader>
                    {menuDisabled ? (
                        <HiMenuAlt3 className="icons" onClick={toggleMenu} />
                    ) : (
                        <HiMenuAlt2 className="icons" onClick={toggleMenu} />
                    )}
                    <TitleText>Dashboard</TitleText>
                </TextHeader>
                <IconsHeader>
                        <SlEnvolope className="icons"/>
                        <SlBell className="icons"/>
                        <SlLogout onClick={HandlerLogoOut} className="icons"/>
                        <ImContrast className="icons"/>
                </IconsHeader>
            </Header>

        </Nav>
    )

}
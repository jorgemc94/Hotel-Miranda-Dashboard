import { ContentNavbar, Icons, ImageMenu, LogoMenu, Menu, Nav, TextLogo, TextMenu, Title, TitleText } from "./NavbarStyled";
import { useState } from "react";
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import { SlBell, SlEnvolope, SlLogout } from "react-icons/sl";
import { ImContrast } from "react-icons/im";
import '../../styles.css';

export const NavbarComponent = () => {
    const [menuDisabled, setMenuDisabled] = useState(true);

    const toggleMenu = () => {
        setMenuDisabled(!menuDisabled);
    };

    return (
        <Nav>
            <Menu $disable={menuDisabled}>
                <LogoMenu>
                    <ImageMenu src="src/assets/icon.png" alt="logo" />
                    <TextMenu>
                        <TextLogo $title>travl</TextLogo>
                        <TextLogo>Hotel Admin Dashboard</TextLogo>
                    </TextMenu>
                </LogoMenu>
            </Menu>
            <ContentNavbar>
                <Title>
                    {menuDisabled ? (
                        <HiMenuAlt3 className="icons" onClick={toggleMenu} />
                    ) : (
                        <HiMenuAlt2 className="icons" onClick={toggleMenu} />
                    )}
                    <TitleText>Dashboard</TitleText>
                </Title>
                <Icons>
                    <SlEnvolope className="icons"/>
                    <SlBell className="icons"/>
                    <SlLogout className="icons"/>
                    <ImContrast className="icons"/>
                </Icons>
            </ContentNavbar>
        </Nav>
    );
}

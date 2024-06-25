import { Header, Menu, MenuLogo, Nav, ImageMenu, TextMenu, TextLogo, TextHeader, TitleText, IconsHeader, Navigation, NavigationLink, Footer, TitleFooter, SubtitleFooter, User, UserImg, UserName, UserButton } from "./NavbarStyled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles.css';
import { HiMenuAlt2, HiMenuAlt3, HiOutlinePuzzle } from "react-icons/hi";
import { SlBell, SlEnvolope, SlLogout } from "react-icons/sl";
import { ImContrast } from "react-icons/im";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { LuCalendarCheck2 } from "react-icons/lu";



export const NavbarComponent = () => {
    

    const [menuDisabled, setMenuDisabled] = useState(false);
    const login = useNavigate();

    const toggleMenu = () => {
        setMenuDisabled(!menuDisabled);
    };

    const HandlerLogoOut = () => {
        localStorage.setItem('login','false');
        login('/login');
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
                <Navigation>
                    <NavigationLink>
                        <MdOutlineDashboard className="icons icons--link"/>
                        <p>Dashboard</p>
                    </NavigationLink>
                    <NavigationLink >
                        <TfiKey className="icons icons--link"/>
                        <p>Room</p>
                    </NavigationLink>
                    <NavigationLink >
                        <LuCalendarCheck2 className="icons icons--link"/>
                        <p>Bookings</p>
                    </NavigationLink>
                    <NavigationLink >
                        <HiOutlinePuzzle className="icons icons--link"/>
                        <p>Users</p>
                    </NavigationLink>
                </Navigation>
                <User>
                    <UserImg src="src/assets/jorge.png"></UserImg>
                    <UserName $title={true}>Jorge Macias Cordobés</UserName>
                    <UserName>jorgemc1294@gmail.com</UserName>
                    <UserButton>Contact Us</UserButton>
                </User>
                <Footer>
                    <TitleFooter>Travl Hotel Admin Dashboard</TitleFooter>
                    <SubtitleFooter>© 2024 All Rights Reserved</SubtitleFooter>
                    <SubtitleFooter>Made with Jorge Macias Cordobés</SubtitleFooter>
                </Footer>
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
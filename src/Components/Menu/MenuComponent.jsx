import { MenuFooter, MenuFooterTitle, MenuFooterSubtitle, MenuLogo, ImageMenu, TextMenu, TextLogo, User, UserImg, UserName, UserButton, NavLinkStyle, NavigationList, NavigationItem } from "./MenuStyled";
import { MdOutlineDashboard, MdOutlineContactMail } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";


export const MenuComponent = () => {
    return (
        <>
            <MenuLogo>
                <ImageMenu src="src/assets/icon.png" alt="logo" />
                <TextMenu>
                    <TextLogo $title>travl</TextLogo>
                    <TextLogo>Hotel Admin Dashboard</TextLogo>
                </TextMenu>
            </MenuLogo>
            <NavigationList>
                <NavLinkStyle to={'/'}>
                    <NavigationItem >
                        <MdOutlineDashboard className="icons icons--link" />
                        Dashboard
                    </NavigationItem>
                </NavLinkStyle>
                <NavLinkStyle to={'/rooms'}>
                    <NavigationItem>
                        <TfiKey className="icons icons--link" />
                        Rooms
                    </NavigationItem>
                </NavLinkStyle>
                <NavLinkStyle to={'/bookings'}>
                    <NavigationItem>
                        <LuCalendarCheck2 className="icons icons--link" />
                        Bookings
                    </NavigationItem>
                </NavLinkStyle>
                <NavLinkStyle to={'/users'}>
                    <NavigationItem>
                        <FaRegUser  className="icons icons--link" />
                        Users
                    </NavigationItem>
                </NavLinkStyle>
                <NavLinkStyle to={'/contact'}>
                    <NavigationItem>
                        <MdOutlineContactMail  className="icons icons--link" />
                        Contact
                    </NavigationItem>
                </NavLinkStyle>
            </NavigationList>
            <User>
                <UserImg src="src/assets/jorge.png"></UserImg>
                <UserName $title={true}>Jorge Macias Cordobés</UserName>
                <UserName>jorgemc1294@gmail.com</UserName>
                <UserButton>Contact Us</UserButton>
            </User>
            <MenuFooter>
                <MenuFooterTitle>Travl Hotel Admin Dashboard</MenuFooterTitle>
                <MenuFooterSubtitle>© 2024 All Rights Reserved</MenuFooterSubtitle>
                <MenuFooterSubtitle>Made with Jorge Macias Cordobés</MenuFooterSubtitle>
            </MenuFooter>
        </>
    );
};

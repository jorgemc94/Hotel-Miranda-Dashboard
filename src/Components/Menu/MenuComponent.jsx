import { MenuFooter, MenuFooterTitle, MenuFooterSubtitle, MenuLogo, ImageMenu, TextMenu, TextLogo, Navigation, NavigationLink, User, UserImg, UserName, UserButton } from "./MenuStyled";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { HiOutlinePuzzle } from "react-icons/hi";

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
            <Navigation>
                <NavigationLink>
                    <MdOutlineDashboard className="icons icons--link" />
                    <p>Dashboard</p>
                </NavigationLink>
                <NavigationLink>
                    <TfiKey className="icons icons--link" />
                    <p>Room</p>
                </NavigationLink>
                <NavigationLink>
                    <LuCalendarCheck2 className="icons icons--link" />
                    <p>Bookings</p>
                </NavigationLink>
                <NavigationLink>
                    <HiOutlinePuzzle className="icons icons--link" />
                    <p>Users</p>
                </NavigationLink>
            </Navigation>
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

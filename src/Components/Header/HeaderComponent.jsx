import { TextHeader, TitleText, IconsHeader } from "./HeaderStyled";
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import { SlBell, SlEnvolope, SlLogout } from "react-icons/sl";
import { ImContrast } from "react-icons/im";

export const HeaderComponent = ({ toggleMenu, menuDisabled }) => {
    

    return (
        <>
            <TextHeader>
                {menuDisabled ? (
                    <HiMenuAlt3 className="icons" onClick={toggleMenu} />
                ) : (
                    <HiMenuAlt2 className="icons" onClick={toggleMenu} />
                )}
                <TitleText>Dashboard</TitleText>
            </TextHeader>
            <IconsHeader>
                <SlEnvolope className="icons" />
                <SlBell className="icons" />
                <SlLogout className="icons" />
                <ImContrast className="icons" />
            </IconsHeader>
        </>
    );
};

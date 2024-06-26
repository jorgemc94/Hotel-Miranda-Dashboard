import { TextHeader, TitleText, IconsHeader } from "./HeaderStyled";
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import { SlBell, SlEnvolope, SlLogout } from "react-icons/sl";
import { ImContrast } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export const HeaderComponent = ({ toggleMenu, menuDisabled, title }) => {
    const navigate = useNavigate()
    
    const LogOut = () => {
        localStorage.removeItem('isLoggedIn', false);
        navigate('/login');
    }

    return (
        <>
            <TextHeader>
                {menuDisabled ? (
                    <HiMenuAlt3 className="icons" onClick={toggleMenu} />
                ) : (
                    <HiMenuAlt2 className="icons" onClick={toggleMenu} />
                )}
                <TitleText>{title}</TitleText>
            </TextHeader>
            <IconsHeader>
                <SlEnvolope className="icons" />
                <SlBell className="icons" />
                <SlLogout onClick={LogOut} className="icons" />
                <ImContrast className="icons" />
            </IconsHeader>
        </>
    );
};

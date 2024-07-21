import React, { useContext } from 'react';
import { TextHeader, TitleText, IconsHeader } from "./HeaderStyled";
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import { SlBell, SlEnvolope, SlLogout } from "react-icons/sl";
import { ImContrast } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext';

interface HeaderComponentProps {
  toggleMenu: () => void;
  menuDisabled: boolean;
  title: string;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ toggleMenu, menuDisabled, title }) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { dispatch } = context;
  const navigate = useNavigate();

  const LogoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('auth');
    navigate('/login');
  };

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
        <SlLogout onClick={LogoutHandler} className="icons" />
        <ImContrast className="icons" />
      </IconsHeader>
    </>
  );
};

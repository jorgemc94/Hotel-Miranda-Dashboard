import { useContext, useEffect, useState } from "react";
import { ButtonStyled } from "../styled/ButtonStyled";
import { PopupContent, PopupInput, PopupButtonContent, PopupLabel, PopupForm } from "./PopupStyled";
import { UserContext } from "../../context/userContext";

interface PopupComponentProps {
    isActive: boolean;
    onClose: () => void;
}

export const PopupComponent = ({ isActive, onClose }: PopupComponentProps) => {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext is not available");
    }

    const { dispatch, state } = userContext;
    const [newName, setNewName] = useState(state.name || "");
    const [newEmail, setNewEmail] = useState(state.email || "");

    useEffect(() => {
        setNewName(state.name || "");
        setNewEmail(state.email || "");
    }, [state]);

    const saveChangeHandler = () => {
        dispatch({ type: "EDITUSER", payload: { name: newName, email: newEmail } });
        onClose();
    };

    if (!isActive) {
        return null;
    }

    const newNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };

    const newEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(event.target.value);
    };

    return (
        <PopupContent $inactive={!isActive}>
            <PopupForm onSubmit={saveChangeHandler}>
                <PopupLabel>Name</PopupLabel>
                <PopupInput type="text" name="name" placeholder="" onChange={newNameHandler}></PopupInput>
                <PopupLabel>Email</PopupLabel>
                <PopupInput type="email" name="email" placeholder="" onChange={newEmailHandler}></PopupInput>
                <PopupButtonContent>
                    <ButtonStyled styled='available' onClick={saveChangeHandler}>EDIT</ButtonStyled>
                    <ButtonStyled styled='bookedRed' onClick={onClose}>CANCEL</ButtonStyled>
                </PopupButtonContent>
            </PopupForm>
        </PopupContent>
    );
};

import React from 'react';
import { PopupContent } from "../../../Components/Popup/PopupStyled";
import { NameTable, SubtitleTable } from "../../../Components/Table/TableStyled";
import { Contact } from "../../../types";
import { ButtonStyled } from '../../../Components/styled/ButtonStyled';
import { FiArrowLeft } from 'react-icons/fi';

interface CommentComponentProps {
    isActive: boolean;
    onClose: () => void;
    contact: Contact | null;
}

export const CommentComponent = ({ isActive, onClose, contact }: CommentComponentProps) => {
    
    if (!isActive || !contact) {
        return null;
    }

    return (
        <>
            <PopupContent $inactive={!isActive}>
                <ButtonStyled styled='pending' onClick={onClose}><FiArrowLeft /></ButtonStyled>
                <NameTable>
                    <SubtitleTable>Subject</SubtitleTable>
                    <SubtitleTable $subtitle>{contact.subject}</SubtitleTable>
                    <SubtitleTable>Message</SubtitleTable>
                    <SubtitleTable $subtitle>{contact.comment}</SubtitleTable>
                </NameTable>    
            </PopupContent>
        </>
    );
};

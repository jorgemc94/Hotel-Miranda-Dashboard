import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ContentDetails, ContentText, ImageDetails, SectionDetails, TextDetails, ContentTextDetails } from "../../Components/styled/DetailsStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FiArrowLeft } from "react-icons/fi";
import { AppDispatch, RootState } from "../../App/store";
import { FourSquare } from "react-loading-indicators";
import { getContact, getContactsError, getContactsStatus } from "../../Features/contact/contactsSlice";
import { ContactThunk } from "../../Features/contact/contactsThunk";
import { Contact } from "../../types";

export const ContactDetailsPage = () => {
    const { id } = useParams<string>();
    const dispatchRedux: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    
    const contact = useSelector((state: RootState) => getContact(state));
    const contactStatus = useSelector((state: RootState) => getContactsStatus(state));
    const contactError = useSelector((state: RootState) => getContactsError(state));
    
    const [renderContact, setRenderContact] = useState<Contact | null>(null);

    useEffect(() => {
        if (id) {
            dispatchRedux(ContactThunk(id));
        }
    }, [id, dispatchRedux]);

    useEffect(() => {
        if (contactStatus === 'pending') {
            setIsLoading(true);
        } else if (contactStatus === 'fulfilled' && contact) {
            setRenderContact(contact);
            setIsLoading(false);
        } else if (contactStatus === 'rejected') {
            setIsLoading(false);
            console.error(contactError);
        }
    }, [contactStatus, contact, contactError]);

    const navigateHandle = () => {
        navigate('/contacts');
    };

    return (
        <>
            {isLoading ? 
                <FourSquare color="#32cd32" size="medium" text="" textColor="" />  : 
                renderContact && (
                <>
                    <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled> 
                    <SectionDetails>
                        <ContentDetails>
                            <TextDetails $title>{renderContact.client.name}</TextDetails>
                            <TextDetails>{renderContact._id}</TextDetails>
                            <ContentText>
                                <ContentTextDetails>
                                    <TextDetails $title>Email</TextDetails>
                                    <TextDetails>{renderContact.client.email}</TextDetails>
                                </ContentTextDetails>
                                <ContentTextDetails $right>
                                    <TextDetails $title>Contact</TextDetails>
                                    <TextDetails>{renderContact.client.phone}</TextDetails>
                                </ContentTextDetails>
                            </ContentText>
                            <ContentText>
                                <ContentTextDetails>
                                    <TextDetails $title>Start Date</TextDetails>
                                    <TextDetails>{renderContact.date}</TextDetails>
                                </ContentTextDetails>
                                <ContentTextDetails $right>
                                    <TextDetails $title>Status</TextDetails>
                                    <TextDetails>{renderContact.archived === 'true' ? <ButtonStyled styled='available'>Publish</ButtonStyled> : <ButtonStyled styled='bookedRed'>Archived</ButtonStyled>}</TextDetails>
                                </ContentTextDetails>
                            </ContentText>
                            <TextDetails $title>Description</TextDetails>
                            <TextDetails>{renderContact.comment}</TextDetails>
                        </ContentDetails>
                        <ImageDetails src={renderContact.client.image} alt="img User" />
                    </SectionDetails>
                </>
                )
            }
        </>
    );
};

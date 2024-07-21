import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editContact, addContact, getContact, getContactList } from "../../Features/contact/contactsSlice";
import { ContactDetailsThunk } from "../../Features/contact/contactDetailsThunk";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FormStyled, InputStyled, LabelStyled, SectionFormStyled, TextareaStyled } from "../../Components/styled/FormStyled";
import { FiArrowLeft } from "react-icons/fi";
import { AppDispatch, RootState } from "../../App/store";
import { Contact } from "../../types";
import { SingleValue } from "react-select";
import { SelectForm } from "../../Components/styled/SelectStyled";
import Swal from 'sweetalert2';
import { FourSquare } from "react-loading-indicators";

export const ContactEditPage = () => {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const dispatchRedux: AppDispatch = useDispatch();
    const contact = useSelector((state: RootState) => getContact(state));
    const contactsError = useSelector((state: RootState) => state.contacts.error);
    const contactList = useSelector((state: RootState) => getContactList(state));
    const [contactEdit, setContactEdit] = useState<Contact>({
        id: 0,
        subject: "",
        comment: "",
        archived: "false",
        date: "",
        client: {
            name:"",
            email:"",
            phone: "",
            image: "",
        },
    });
    const [isLoading, setIsLoading] = useState(true);
    const isEditPage = Boolean(id);

    useEffect(() => {
        const numberId = Number(id);
        const fetchContactDetails = async () => {
            if (isEditPage) {
                try {
                    await dispatchRedux(ContactDetailsThunk({ id: numberId, contactList }));
                } catch (err) {
                    console.log(contactsError);
                }
            }
            setIsLoading(false);
        };

        fetchContactDetails();
    }, [id, dispatchRedux, isEditPage, contactsError, contactList]);

    useEffect(() => {
        if (contact && isEditPage) {
            setContactEdit({
                ...contact,
                client: { ...contact.client }
            });
        }
    }, [contact, isEditPage]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name in contactEdit.client) {
            setContactEdit(prevState => ({
                ...prevState,
                client: { ...prevState.client, [name]: value }
            }));
        } else {
            setContactEdit({ ...contactEdit, [name]: value });
        }
    };

    const handleSelectChange = (selectedOption: SingleValue<{ value: "false" | "true"; label: string }>) => {
        if (selectedOption) {
            setContactEdit(prevState => ({
                ...prevState,
                archived: selectedOption.value
            }));
        }
    };

    const optionsActivity = [
        { value: "false", label: "Archived" },
        { value: "true", label: "Publish" },
    ];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (isEditPage) {
                await dispatchRedux(editContact(contactEdit));
                Swal.fire({
                    title: "Edit Contact!",
                    text: "Your contact has been edited.",
                    icon: "success"
                });
            } else {
                await dispatchRedux(addContact(contactEdit));
                Swal.fire({
                    title: "New Contact!",
                    text: "Your contact has been added.",
                    icon: "success"
                });
            }
            navigate('/contacts');
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while saving the contact.",
                icon: "error"
            });
        }
    };

    const navigateHandle = () => {
        navigate('/contacts');
    };

    return (
        <>
            {isLoading ? <FourSquare color="#32cd32" size="medium" text="" textColor="" /> :
                <>
                    <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled>
                    <SectionFormStyled>
                        <FormStyled onSubmit={handleSubmit}>
                            <LabelStyled>ID</LabelStyled>
                            <InputStyled type="number" name="id" value={contactEdit.id} onChange={handleChange} readOnly={isEditPage} placeholder="Id" />
                            <LabelStyled>Name</LabelStyled>
                            <InputStyled type="text" name="name" value={contactEdit.client.name} onChange={handleChange} placeholder="Name" />
                            <LabelStyled>Email</LabelStyled>
                            <InputStyled type="email" name="email" value={contactEdit.client.email} onChange={handleChange} placeholder="Email" />
                            <LabelStyled>Phone</LabelStyled>
                            <InputStyled type="tel" name="phone" value={contactEdit.client.phone} onChange={handleChange} placeholder="Phone" />
                            <LabelStyled>Date</LabelStyled>
                            <InputStyled type="date" name="date" value={contactEdit.date} onChange={handleChange} placeholder="Date" />
                            <LabelStyled>Subject</LabelStyled>
                            <InputStyled type="text" name="subject" value={contactEdit.subject} onChange={handleChange} readOnly={isEditPage} placeholder="Subject" />
                            <LabelStyled>Archived</LabelStyled>
                            <SelectForm 
                                name="archived"
                                options={optionsActivity}
                                value={optionsActivity.find(option => option.value === contactEdit.archived)}
                                onChange={(option) => handleSelectChange(option as SingleValue<{ value: "false" | "true" ; label: string }>)}
                            />
                            <LabelStyled>Comment</LabelStyled>
                            <TextareaStyled name="comment" value={contactEdit.comment} onChange={handleChange} placeholder="Comment" />
                            <ButtonStyled styled='send' type="submit">{isEditPage ? 'Save Changes' : 'Add Contact'}</ButtonStyled>
                        </FormStyled>
                    </SectionFormStyled>
                </>
            }
        </>
    );
};

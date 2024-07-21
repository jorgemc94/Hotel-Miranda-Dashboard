import { SectionOrder } from "../../Components/styled/OrderStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { TableComponent } from "../../Components/Table/TableComponent";
import { ImageTable, NameTable, SubtitleTable } from "../../Components/Table/TableStyled";
import { Contact } from "../../types";
import { deleteContact, getContactList, getContactsError, getContactsStatus } from "../../Features/contact/contactsSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../App/store";
import { useNavigate } from "react-router-dom";
import { ContactThunk } from "../../Features/contact/contactsThunk";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2';
import { FourSquare } from "react-loading-indicators";

export const ContactPage = () => {
    const dispatchRedux: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const contactsStatus = useSelector((state: RootState) => getContactsStatus(state));
    const contactsList = useSelector((state: RootState) => getContactList(state));
    const contactListError = useSelector((state: RootState) => getContactsError(state));

    const [allContacts, setAllContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (contactsStatus === 'idle') {
            dispatchRedux(ContactThunk());
        } else if (contactsStatus === 'fulfilled') {
            setIsLoading(false);
            setAllContacts(contactsList);
            setFilteredContacts(contactsList);
        } else if (contactsStatus === 'rejected') {
            setIsLoading(false);
            setError(contactListError);
        }
    }, [contactsStatus, contactsList, contactListError, dispatchRedux]);

    const columns = [
        { headerColumn: 'Photos', columnsData: 'photo', columnRenderer: (row: Contact) => <ImageTable styled='users' src={row.client.image} alt="User Photo" /> },
        { headerColumn: 'Information', columnsData: 'information', columnRenderer: (row: Contact) => <SubtitleTable>{row.date}</SubtitleTable>},
        { headerColumn: 'Costumer', columnsData: 'costumer', columnRenderer: (row: Contact) => 
            (
                <>
                    <SubtitleTable>{row.client.name}</SubtitleTable>
                    <SubtitleTable>{row.client.email}</SubtitleTable>
                    <SubtitleTable>{row.client.phone}</SubtitleTable>
                </>
            )
        },
        { headerColumn: 'Comment', columnsData: 'comment', columnRenderer: (row: Contact) =>
        (
            <NameTable>
                <SubtitleTable>Subject</SubtitleTable>
                <SubtitleTable $subtitle>{row.subject}</SubtitleTable>
                <SubtitleTable>Message</SubtitleTable>
                <SubtitleTable $subtitle>{row.comment}</SubtitleTable>
            </NameTable> 
        )},
        { headerColumn: 'Archived', columnsData: 'archived', columnRenderer: (row: Contact) => (
            row.archived === 'true' ? (
                <ButtonStyled styled='available'>Publish</ButtonStyled>
            ) : (
                <ButtonStyled styled='bookedRed'>Archived</ButtonStyled>
            )
        )},
        { headerColumn: 'Actions', columnsData: 'actions', columnRenderer: (row: Contact) => {
            return (
                <>
                    <RiDeleteBin6Line onClick={(event: React.MouseEvent<SVGElement>) => deleteHandle(event, row.id)} /> 
                    <CiEdit onClick={() => navigateEditHandle(row.id)} />
                </>
            )
        }}
    ];

    const deleteHandle = (event: React.MouseEvent<SVGElement>, ContactId: number) => {
        event.stopPropagation();
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatchRedux(deleteContact(ContactId));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                setAllContacts((prevContacts) => prevContacts.filter(contact => contact.id !== ContactId));
            }
        });
    }

    const navigateEditHandle = (ContactId: number) => {
        navigate(`/contact/edit/${ContactId}`);
    };


    const handleClickAll = () => {
        setFilteredContacts(allContacts);
    };

    const handleClickPublish = () => {
        const archivedContacts = allContacts.filter(contact => contact.archived === 'true');
        setFilteredContacts(archivedContacts);
    };

    return (
        <>
           {isLoading ? <FourSquare color="#32cd32" size="medium" text="" textColor="" /> :
            <>
                 <SectionOrder>
                    <List>
                        <ItemList onClick={handleClickAll}>All Contacts</ItemList>
                        <ItemList onClick={handleClickPublish}>Publish</ItemList>
                    </List>
                    <ButtonStyled styled='send' onClick={() => navigate('/contact/newcontact')}>+ New Contact</ButtonStyled>
                </SectionOrder>
                <TableComponent columns={columns} data={filteredContacts} detailPage='/contact' />
            </>
           }
        </>
    );
};

import { SectionOrder } from "../../Components/styled/OrderStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { TableComponent } from "../../Components/Table/TableComponent";
import { ImageTable, NameTable, SubtitleTable } from "../../Components/Table/TableStyled";
import { Contact } from "../../types";
import { getContactList, getContactsError, getContactsStatus } from "../../Features/contact/contactsSlice";
import { useState, useEffect, ChangeEvent } from "react";
import { AppDispatch, RootState } from "../../App/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ContactsListThunk, deleteContactThunk } from "../../Features/contact/contactsThunk";
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
        dispatchRedux(ContactsListThunk());
    }, [dispatchRedux]);

    useEffect(() => {
        if (contactsStatus === 'idle') {
            setIsLoading(false);
        } else if (contactsStatus === 'fulfilled') {
            setIsLoading(false);
            setAllContacts(contactsList);
            setFilteredContacts(contactsList);
        } else if (contactsStatus === 'rejected') {
            setIsLoading(false);
            setError(contactListError);
        }
    }, [contactsStatus, contactsList, contactListError]);

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
            if (!row._id) {
                return <span>No Actions Available</span>;
            }
            return (
                <>
                    <RiDeleteBin6Line onClick={(event: React.MouseEvent<SVGElement>) => deleteHandle(event, row._id!.toString())} /> 
                    <CiEdit onClick={() => navigateEditHandle(row._id!.toString())} />
                </>
            );
        }}
    ];

    const deleteHandle = (event: React.MouseEvent<SVGElement>, contactId: string) => {
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
                dispatchRedux(deleteContactThunk(contactId));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                setAllContacts((prevContacts) => prevContacts.filter(contact => contact._id !== contactId));
                setFilteredContacts((prevContacts) => prevContacts.filter(contact => contact._id !== contactId));
            }
        });
    }

    const navigateEditHandle = (contactId: string) => {
        navigate(`/contact/edit/${contactId}`);
    };

    const sortContactsHandler = (value: string) => {
        let sortedContacts = [...filteredContacts];

        if (value === 'date') {
            sortedContacts = sortedContacts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (value === 'name') {
            sortedContacts = sortedContacts.sort((a, b) => a.client.name.localeCompare(b.client.name));
        } else if (value === 'email') {
            sortedContacts = sortedContacts.sort((a, b) => a.client.email.localeCompare(b.client.email));
        } else if (value === 'phone') {
            sortedContacts = sortedContacts.sort((a, b) => a.client.phone.localeCompare(b.client.phone));
        } else {
            sortedContacts = sortedContacts.sort((a, b) => a._id!.toString().localeCompare(b._id!.toString()));
        }

        setFilteredContacts(sortedContacts);
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        sortContactsHandler(value);
    };

    const handleClickAll = () => {
        setFilteredContacts(allContacts);
    };

    const handleClickPublished = () => {
        const publishedContacts = allContacts.filter(contact => contact.archived === 'false');
        setFilteredContacts(publishedContacts);
    };

    const handleClickArchived = () => {
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
                            <ItemList onClick={handleClickPublished}>Archived</ItemList>
                            <ItemList onClick={handleClickArchived}>Published</ItemList>
                        </List>
                        <ButtonStyled styled='send' onClick={() => navigate('/contact/newcontact')}>+ New Contact</ButtonStyled>
                        <SelectStyled onChange={handleSelectChange}>
                            <option value='date'>Date</option>
                            <option value='name'>Name</option>
                            <option value='email'>Email</option>
                            <option value='phone'>Phone</option>
                        </SelectStyled>
                    </SectionOrder>
                    <TableComponent columns={columns} data={filteredContacts} detailPage='/contact' />
                </>
            }
        </>
    );
};

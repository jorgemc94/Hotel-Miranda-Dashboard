import { SectionOrder } from "../../Components/styled/OrderStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { TableComponent } from "../../Components/Table/TableComponent";
import data from "../../Components/data/contact.json";
import { ImageTable, NameTable, SubtitleTable } from "../../Components/Table/TableStyled";
import { useState } from "react";

export const ContactPage = () => {

    const columns = [
        { headerColumn: 'Photos', columnsData: 'photo', columnRenderer: (row) => <ImageTable styled='users' src={row.client.image} alt="User Photo" /> },
        { headerColumn: 'Information', columnsData: 'information', columnRenderer: (row) => <SubtitleTable>{row.date}</SubtitleTable>},
        { headerColumn: 'Costumer', columnsData: 'costumer', columnRenderer: (row) => 
            (
                <>
                    <SubtitleTable>{row.client.name}</SubtitleTable>
                    <SubtitleTable>{row.client.email}</SubtitleTable>
                    <SubtitleTable>{row.client.phone}</SubtitleTable>
                </>
            )
        },
        { headerColumn: 'Comment', columnsData: 'comment', columnRenderer: (row) =>
        (
            <NameTable>
                <SubtitleTable>Subject</SubtitleTable>
                <SubtitleTable $subtitle>{row.subject}</SubtitleTable>
                <SubtitleTable>Message</SubtitleTable>
                <SubtitleTable $subtitle>{row.comment}</SubtitleTable>
            </NameTable> 
        )},
        { headerColumn: 'Archived', columnsData: 'archived', columnRenderer: (row) => (
            row.archived === 'true' ? (
                <ButtonStyled styled='available'>Publish</ButtonStyled>
            ) : (
                <ButtonStyled styled='bookedRed'>Archived</ButtonStyled>
            )
        )},
        
        { headerColumn: 'Actions', columnsData: ''}
    ];

    const [contact, setContact] = useState(data);

    const handleClickAll = () => {
        setContact(data);
    };

    const handleClickArchive = () => {
        const filteredContact = data.filter(user => user.archived === 'true');
        setContact(filteredContact);
    };


    return(
        <>
             <SectionOrder>
                <List>
                    <ItemList onClick={handleClickAll}>All Contact</ItemList>
                    <ItemList onClick={handleClickArchive}>Actives</ItemList>
                </List>
            </SectionOrder>
            <TableComponent columns={columns} data={contact} />
        </>
    )
}
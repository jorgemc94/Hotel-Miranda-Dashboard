import { SectionOrder } from "../../Components/styled/OrderStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { TableComponent } from "../../Components/Table/TableComponent";
import data from "../../Components/data/users.json";
import { ImageTable, SubtitleTable } from "../../Components/Table/TableStyled";
import { useState, useEffect } from "react";

export const UsersPage = () => {
    const columns = [
        { headerColumn: 'Photos', columnsData: 'photo', columnRenderer: (row) => <ImageTable styled='users' src={row.photo} alt="User Photo" /> },
        { headerColumn: 'Information', columnsData: 'information', columnRenderer: (row) => 
            (
                <>
                    <SubtitleTable>{row.name}</SubtitleTable>
                    <SubtitleTable>{row.email}</SubtitleTable>
                    <SubtitleTable>{row.id}</SubtitleTable>
                </>
            )
        },
        { headerColumn: 'Start Date', columnsData: 'StartDate', columnRenderer: (row) => <SubtitleTable>{row.date}</SubtitleTable>},
        { headerColumn: 'Description', columnsData: 'description', columnRenderer: (row) => <SubtitleTable>{row.position.description}</SubtitleTable>},
        { headerColumn: 'Contact', columnsData: 'contact', columnRenderer: (row) => <SubtitleTable>{row.phone}</SubtitleTable>},
        { headerColumn: 'Status', columnsData: 'status', columnRenderer: (row) => (
            row.status === 'valid' ? (
                <ButtonStyled styled='available'>{row.status}</ButtonStyled>
            ) : (
                <ButtonStyled styled='bookedRed'>{row.status}</ButtonStyled>
            )
        )},
        { headerColumn: 'Actions', columnsData: ''}
    ];

    const [users, setUsers] = useState(data);

    useEffect(() => {
        sortUsersHandler('id');
    }, []);

    const sortUsersHandler = (value) => {
        let sortedUsers = [...data];

        if (value === 'date') {
            sortedUsers = sortedUsers.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (value === 'name') {
            sortedUsers = sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            sortedUsers = sortedUsers.sort((a, b) => a.id - b.id);
        }

        setUsers(sortedUsers);
    };

    const handleSortChange = (event) => {
        const value = event.target.value;
        sortUsersHandler(value);
    };

    const handleClickAll = () => {
        setUsers(data);
    };

    const handleClickActive = () => {
        const filteredUsers = data.filter(user => user.status === 'valid');
        setUsers(filteredUsers);
    };

    const handleClickInactive = () => {
        const filteredUsers = data.filter(user => user.status !== 'valid');
        setUsers(filteredUsers);
    };

    return (
        <>
            <SectionOrder>
                <List>
                    <ItemList onClick={handleClickAll}>Todos los Empleados</ItemList>
                    <ItemList onClick={handleClickActive}>Empleados Activos</ItemList>
                    <ItemList onClick={handleClickInactive}>Empleados Inactivos</ItemList>
                </List>
                <ButtonStyled styled='send'>+ Nuevo Usuario</ButtonStyled>
                <SelectStyled onChange={handleSortChange}>
                    <option value='date'>Fecha de Inicio</option>
                    <option value='name'>Nombre Completo</option>
                </SelectStyled>
            </SectionOrder>
            <TableComponent columns={columns} data={users} />
        </>
    );
};

import { SectionOrder } from "../../Components/styled/OrderStyled"
import { ItemList, List } from "../../Components/styled/LinkStyled"
import { SelectStyled } from "../../Components/styled/SelectStyled"
import { ButtonStyled } from "../../Components/styled/ButtonStyled"
import { TableComponent } from "../../Components/Table/TableComponent"
import data from "../../Components/data/users.json"
import { ImageTable, SubtitleTable } from "../../Components/Table/TableStyled"


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
    ]

    return(
        <>
         <SectionOrder>
                <List>
                    <ItemList>All Employees</ItemList>
                    <ItemList>Active Employees</ItemList>
                    <ItemList>Inactive Employees</ItemList>
                    <ItemList>In progress</ItemList>
                </List>
                <ButtonStyled styled='send'>+ New User</ButtonStyled>
                <SelectStyled>
                <option value={'startDate'}>Star Date</option>
                <option value={'fullName'}>Full Name</option>
                </SelectStyled>
            </SectionOrder>
            <TableComponent columns={columns} data={data} />
        </>
    )
}
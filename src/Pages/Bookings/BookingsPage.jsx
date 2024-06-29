import { SectionOrder } from "../../Components/styled/OrderStyled"
import { ItemList, List } from "../../Components/styled/LinkStyled"
import { SelectStyled } from "../../Components/styled/SelectStyled"
import { ButtonStyled } from "../../Components/styled/ButtonStyled"
import { TableComponent } from "../../Components/Table/TableComponent"
import data from "../../Components/data/bookings.json"
import { SubtitleTable } from "../../Components/Table/TableStyled"


export const BookingsPage = () => {

    const columns = [
        { headerColumn: 'Guest', columnsData: 'fullName', columnRenderer: (row) => <SubtitleTable>{row.fullName}</SubtitleTable>},
        { headerColumn: 'Order Date', columnsData: 'bookDate', columnRenderer: (row) => <SubtitleTable>{row.bookDate}</SubtitleTable>},
        { headerColumn: 'Check In', columnsData: 'checkIn', columnRenderer: (row) => <SubtitleTable>{row.checkIn}</SubtitleTable>},
        { headerColumn: 'Check Out', columnsData: 'checkOut', columnRenderer: (row) => <SubtitleTable>{row.checkOut}</SubtitleTable>},
        { headerColumn: 'Special Request', columnsData: 'specialRequest', columnRenderer: (row) => <SubtitleTable>{row.specialRequest}</SubtitleTable>},
        { headerColumn: 'Status', columnsData: 'status', columnRenderer: (row) => (
            row.status === 'In progress' ? (
                <ButtonStyled styled='progress'>{row.status}</ButtonStyled>
            ) : (
                row.status === 'Check In' ? (
                    <ButtonStyled styled='available'>{row.status}</ButtonStyled>
                ) : (
                    <ButtonStyled styled='bookedRed'>{row.status}</ButtonStyled>
                )
            )
        )},
        { headerColumn: 'Actions', columnsData: ''}

    ]

    return (
        <>
            <SectionOrder>
                <List>
                    <ItemList>All Bookings</ItemList>
                    <ItemList>Check In</ItemList>
                    <ItemList>Check Out</ItemList>
                    <ItemList>In progress</ItemList>
                </List>
                <ButtonStyled styled='send'>+ New Booking</ButtonStyled>
                <SelectStyled>
                <option value={'orderDate'}>Order Date</option>
                <option value={'guest'}>Guest</option>
                <option value={'checkIn'}>Check In</option>
                <option value={'checkOut'}>Check Out</option>
                </SelectStyled>
            </SectionOrder>
            <TableComponent columns={columns} data={data} />
        </>
    )
}
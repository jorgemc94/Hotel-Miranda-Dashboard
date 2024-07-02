import { SectionOrder } from "../../Components/styled/OrderStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { TableComponent } from "../../Components/Table/TableComponent";
import data from "../../Components/data/bookings.json";
import { SubtitleTable } from "../../Components/Table/TableStyled";
import { useState, useEffect } from "react";

export const BookingsPage = () => {

    const columns = [
        { headerColumn: 'Guest', columnsData: 'fullName', columnRenderer: (row) => <SubtitleTable>{row.fullName}</SubtitleTable> },
        { headerColumn: 'Order Date', columnsData: 'bookDate', columnRenderer: (row) => <SubtitleTable>{row.bookDate}</SubtitleTable> },
        { headerColumn: 'Check In', columnsData: 'checkIn', columnRenderer: (row) => <SubtitleTable>{row.checkIn}</SubtitleTable> },
        { headerColumn: 'Check Out', columnsData: 'checkOut', columnRenderer: (row) => <SubtitleTable>{row.checkOut}</SubtitleTable> },
        { headerColumn: 'Special Request', columnsData: 'specialRequest', columnRenderer: (row) => <SubtitleTable>{row.specialRequest}</SubtitleTable> },
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
        ) },
        { headerColumn: 'Actions', columnsData: '' }
    ];

    const [bookings, setBookings] = useState(data);

    useEffect(() => {
        sortBookingsHandler('id');
    }, []);

    const sortBookingsHandler = (value) => {
        let sortedBookings = [...data];

        if (value === 'orderDate') {
            sortedBookings = sortedBookings.sort((a, b) => new Date(a.bookDate) - new Date(b.bookDate));
        } else if (value === 'guest') {
            sortedBookings = sortedBookings.sort((a, b) => a.fullName.localeCompare(b.fullName));
        } else if (value === 'checkIn') {
            sortedBookings = sortedBookings.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
        } else if (value === 'checkOut') {
            sortedBookings = sortedBookings.sort((a, b) => new Date(a.checkOut) - new Date(b.checkOut));
        } else {
            sortedBookings = sortedBookings.sort((a, b) => a.id - b.id);
        }

        setBookings(sortedBookings);
    };

    const handleBookingsChange = (event) => {
        const value = event.target.value;
        sortBookingsHandler(value);
    };

    const handleClickAll = () => {
        setBookings(data);
    };

    const handleClickCheckIn = () => {
        const filteredBookings = data.filter(booking => booking.status === 'Check In');
        setBookings(filteredBookings);
    };

    const handleClickCheckOut = () => {
        const filteredBookings = data.filter(booking => booking.status === 'Check Out');
        setBookings(filteredBookings);
    };

    const handleClickInProgress = () => {
        const filteredBookings = data.filter(booking => booking.status === 'In progress');
        setBookings(filteredBookings);
    };

    return (
        <>
            <SectionOrder>
                <List>
                    <ItemList onClick={handleClickAll}>All Bookings</ItemList>
                    <ItemList onClick={handleClickCheckIn}>Check In</ItemList>
                    <ItemList onClick={handleClickCheckOut}>Check Out</ItemList>
                    <ItemList onClick={handleClickInProgress}>In progress</ItemList>
                </List>
                <ButtonStyled styled='send'>+ New Booking</ButtonStyled>
                <SelectStyled onChange={handleBookingsChange}>
                    <option value='orderDate'>Order Date</option>
                    <option value='guest'>Guest</option>
                    <option value='checkIn'>Check In</option>
                    <option value='checkOut'>Check Out</option>
                </SelectStyled>
            </SectionOrder>
            <TableComponent columns={columns} data={bookings} />
        </>
    );
};

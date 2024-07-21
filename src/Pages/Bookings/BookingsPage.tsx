import { SectionOrder } from "../../Components/styled/OrderStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { TableComponent } from "../../Components/Table/TableComponent";
import { SubtitleTable } from "../../Components/Table/TableStyled";
import { useState, useEffect, ChangeEvent } from "react";
import { Booking } from "../../types";
import { deleteBooking, getBookingList, getBookingsError, getBookingsStatus } from "../../Features/booking/bookingsSlice";
import { AppDispatch, RootState } from "../../App/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookingsThunk } from "../../Features/booking/bookingsThunk";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2';
import { FourSquare } from "react-loading-indicators";

export const BookingsPage = () => {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const bookingsStatus = useSelector((state: RootState) => getBookingsStatus(state));
    const bookingsList = useSelector((state: RootState) => getBookingList(state));
    const bookingListError = useSelector((state: RootState) => getBookingsError(state));
    const dispatchRedux: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (bookingsStatus === 'idle') {
            dispatchRedux(BookingsThunk());
        } else if (bookingsStatus === 'fulfilled') {
            setIsLoading(false);
            setBookings(bookingsList);
        } else if (bookingsStatus === 'rejected') {
            setIsLoading(false);
            setError(bookingListError);
        }
    }, [bookingsStatus, bookingsList, bookingListError, dispatchRedux]);

    const columns = [
        { headerColumn: 'Guest', columnsData: 'fullName', columnRenderer: (row: Booking) => <SubtitleTable>{row.fullName}</SubtitleTable> },
        { headerColumn: 'Order Date', columnsData: 'bookDate', columnRenderer: (row: Booking) => <SubtitleTable>{row.bookDate}</SubtitleTable> },
        { headerColumn: 'Check In', columnsData: 'checkIn', columnRenderer: (row: Booking) => <SubtitleTable>{row.checkIn}</SubtitleTable> },
        { headerColumn: 'Check Out', columnsData: 'checkOut', columnRenderer: (row: Booking) => <SubtitleTable>{row.checkOut}</SubtitleTable> },
        { headerColumn: 'Special Request', columnsData: 'specialRequest', columnRenderer: (row: Booking) => <SubtitleTable>{row.specialRequest}</SubtitleTable> },
        { headerColumn: 'Status', columnsData: 'status', columnRenderer: (row: Booking) => (
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
        { headerColumn: 'Actions', columnsData: 'actions', columnRenderer: (row: Booking) => {
            return (
                <>
                    <RiDeleteBin6Line onClick={(event: React.MouseEvent<SVGElement>) => deleteHandle(event, row.id)} /> 
                    <CiEdit onClick={() => navigateEditHandle(row.id)} />
                </>
            )
        }}
    ];

    const deleteHandle = (event: React.MouseEvent<SVGElement>, bookingID: number) => {
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
                dispatchRedux(deleteBooking(bookingID));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== bookingID));
            }
        });
    }

    const navigateEditHandle = (bookingID: number) => {
        navigate(`/booking/edit/${bookingID}`);
    };

    const sortBookingsHandler = (value: string) => {
        let sortedBookings = [...bookings];

        if (value === 'orderDate') {
            sortedBookings = sortedBookings.sort((a, b) => new Date(a.bookDate).getTime() - new Date(b.bookDate).getTime());
        } else if (value === 'guest') {
            sortedBookings = sortedBookings.sort((a, b) => a.fullName.localeCompare(b.fullName));
        } else if (value === 'checkIn') {
            sortedBookings = sortedBookings.sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime());
        } else if (value === 'checkOut') {
            sortedBookings = sortedBookings.sort((a, b) => new Date(a.checkOut).getTime() - new Date(b.checkOut).getTime());
        } else {
            sortedBookings = sortedBookings.sort((a, b) => a.id - b.id);
        }

        setBookings(sortedBookings);
    };

    const handleBookingsChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        sortBookingsHandler(value);
    };

    const handleClickAll = () => {
        setBookings(bookingsList);
    };

    const handleClickCheckIn = () => {
        const filteredBookings = bookingsList.filter(booking => booking.status === 'Check In');
        setBookings(filteredBookings);
    };

    const handleClickCheckOut = () => {
        const filteredBookings = bookingsList.filter(booking => booking.status === 'Check Out');
        setBookings(filteredBookings);
    };

    const handleClickInProgress = () => {
        const filteredBookings = bookingsList.filter(booking => booking.status === 'In progress');
        setBookings(filteredBookings);
    };

    return (
        <>
            {isLoading ? <FourSquare color="#32cd32" size="medium" text="" textColor="" /> : 
                <>
                    <SectionOrder>
                        <List>
                            <ItemList onClick={handleClickAll}>All Bookings</ItemList>
                            <ItemList onClick={handleClickCheckIn}>Check In</ItemList>
                            <ItemList onClick={handleClickCheckOut}>Check Out</ItemList>
                            <ItemList onClick={handleClickInProgress}>In progress</ItemList>
                        </List>
                        <ButtonStyled styled='send' onClick={() => navigate('/booking/newbooking')}>+ New Booking</ButtonStyled>
                        <SelectStyled onChange={handleBookingsChange}>
                            <option value='orderDate'>Order Date</option>
                            <option value='guest'>Guest</option>
                            <option value='checkIn'>Check In</option>
                            <option value='checkOut'>Check Out</option>
                        </SelectStyled>
                    </SectionOrder>
                    <TableComponent columns={columns} data={bookings} detailPage='/booking' />
                </>
            }
        </>
    );
};

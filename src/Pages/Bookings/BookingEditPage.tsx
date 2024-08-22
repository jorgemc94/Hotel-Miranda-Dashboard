import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateBookingThunk, addBookingThunk, BookingThunk } from "../../Features/booking/bookingsThunk";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FormStyled, InputStyled, LabelStyled, SectionFormStyled, TextareaStyled } from "../../Components/styled/FormStyled";
import { FiArrowLeft } from "react-icons/fi";
import { AppDispatch, RootState } from "../../App/store";
import { Booking } from "../../types";
import { SingleValue } from "react-select";
import { SelectForm } from "../../Components/styled/SelectStyled";
import Swal from 'sweetalert2';
import { FourSquare } from "react-loading-indicators";
import { getBooking, getBookingsStatus } from "../../Features/booking/bookingsSlice";

export const BookingEditPage = () => {
    const bookingStatus = useSelector((state: RootState) => getBookingsStatus(state));
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const dispatchRedux: AppDispatch = useDispatch();
    const booking: Booking = useSelector((state: RootState) => getBooking(state));
    const bookingsError = useSelector((state: RootState) => state.bookings.error);
    const [bookingEdit, setBookingEdit] = useState<Booking>({
        fullName: "",
        _id: 0,
        bookDate: "",
        checkIn: "",
        checkOut: "",
        specialRequest: "",
        roomId: 0,
        status: "In progress",
    });
    const [isLoading, setIsLoading] = useState(true);
    const isEditPage = Boolean(id);

    useEffect(() => {
        if (isEditPage) {
            dispatchRedux(BookingThunk(id as string));
        } else {
            setIsLoading(false);
        }
    }, [id, dispatchRedux, isEditPage]);

    useEffect(() => {
        if (bookingStatus === 'pending') {
            setIsLoading(true)
        } else if (bookingStatus === 'fulfilled' && isEditPage) {
            setBookingEdit({
                ...booking
            });
            setIsLoading(false)
        } else if (bookingStatus === 'rejected') {
            setIsLoading(false);
            console.error(bookingsError);
        }
    }, [bookingStatus, isEditPage, booking, bookingsError]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setBookingEdit({ ...bookingEdit, [name]: value });
    };

    const handleSelectChange = (selectedOption: SingleValue<{ value: "In progress" | "Check In" | "Check Out"; label: string }>) => {
        if (selectedOption) {
            setBookingEdit(prevState => ({
                ...prevState,
                status: selectedOption.value
            }));
        }
    };

    const optionsActivity = [
        { value: "In progress", label: "In progress" },
        { value: "Check In", label: "Check In" },
        { value: "Check Out", label: "Check Out" }
    ];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (isEditPage) {
                await dispatchRedux(updateBookingThunk(bookingEdit));
                Swal.fire({
                    title: "Edit Booking!",
                    text: "Your booking has been edited.",
                    icon: "success"
                });
            } else {
                await dispatchRedux(addBookingThunk(bookingEdit));
                Swal.fire({
                    title: "New Booking!",
                    text: "Your booking has been added.",
                    icon: "success"
                });
            }
            navigate('/bookings');
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while saving the booking.",
                icon: "error"
            });
        }
    };

    const navigateHandle = () => {
        navigate('/bookings');
    };

    return (
        <>
            {isLoading ? <FourSquare color="#32cd32" size="medium" text="" textColor="" /> :
                <>
                    <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled>
                    <SectionFormStyled>
                        <FormStyled onSubmit={handleSubmit}>
                            <LabelStyled>Full Name</LabelStyled>
                            <InputStyled
                                type="text"
                                name="fullName"
                                value={isEditPage ? bookingEdit.fullName : ""}
                                onChange={handleChange}
                                placeholder="Full Name"
                            />
                            <LabelStyled>Book Date</LabelStyled>
                            <InputStyled
                                type="text"
                                name="bookDate"
                                value={isEditPage ? bookingEdit.bookDate : ""}
                                onChange={handleChange}
                                placeholder="Book Date"
                            />
                            <LabelStyled>Check In</LabelStyled>
                            <InputStyled
                                type="date"
                                name="checkIn"
                                value={isEditPage ? bookingEdit.checkIn : ""}
                                onChange={handleChange}
                                placeholder="Check In"
                            />
                            <LabelStyled>Check Out</LabelStyled>
                            <InputStyled
                                type="date"
                                name="checkOut"
                                value={isEditPage ? bookingEdit.checkOut : ""}
                                onChange={handleChange}
                                placeholder="Check Out"
                            />
                            <LabelStyled>Room ID</LabelStyled>
                            <InputStyled
                                type="number"
                                name="roomId"
                                value={isEditPage ? bookingEdit.roomId : 0}
                                onChange={handleChange}
                                readOnly={isEditPage}
                                placeholder="Room Id"
                            />
                            <LabelStyled>Status</LabelStyled>
                            <SelectForm 
                                name="status"
                                options={optionsActivity}
                                value={optionsActivity.find(option => option.value === bookingEdit.status)}
                                onChange={(option) => handleSelectChange(option as SingleValue<{ value: "In progress" | "Check In" | "Check Out"; label: string }>)}
                            />
                            <LabelStyled>Special Request</LabelStyled>
                            <TextareaStyled
                                name="specialRequest"
                                value={isEditPage ? bookingEdit.specialRequest : ""}
                                onChange={handleChange}
                                placeholder="Description"
                            />
                            <ButtonStyled styled='send' type="submit">{isEditPage ? 'Save Changes' : 'Add Booking'}</ButtonStyled>
                        </FormStyled>
                    </SectionFormStyled>
                </>
            }
        </>
    );
};

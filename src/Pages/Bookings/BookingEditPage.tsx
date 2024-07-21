import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editBooking, addBooking, getBooking, getBookingList } from "../../Features/booking/bookingsSlice";
import { BookingDetailsThunk } from "../../Features/booking/bookingsDetailsThunk";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FormStyled, InputStyled, LabelStyled, SectionFormStyled, TextareaStyled } from "../../Components/styled/FormStyled";
import { FiArrowLeft } from "react-icons/fi";
import { AppDispatch, RootState } from "../../App/store";
import { Booking } from "../../types";
import { SingleValue } from "react-select";
import { SelectForm } from "../../Components/styled/SelectStyled";
import Swal from 'sweetalert2';
import { FourSquare } from "react-loading-indicators";

export const BookingEditPage = () => {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const dispatchRedux: AppDispatch = useDispatch();
    const booking = useSelector((state: RootState) => getBooking(state));
    const bookingsError = useSelector((state: RootState) => state.bookings.error);
    const bookingList = useSelector((state: RootState) => getBookingList(state))
    const [bookingEdit, setBookingEdit] = useState<Booking>({
        fullName: "",
        id: 0,
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
        const numberId = Number(id);
        const fetchBookingDetails = async () => {
            if (isEditPage) {
                try {
                    await dispatchRedux(BookingDetailsThunk({ id: numberId, bookingList }));
                } catch (err) {
                    console.log(bookingsError);
                }
            }
            setIsLoading(false);
        };

        fetchBookingDetails();
    }, [id, dispatchRedux, isEditPage, bookingsError]);

    useEffect(() => {
        if (booking && isEditPage) {
            setBookingEdit({
                ...booking
            });
        }
    }, [booking, isEditPage]);

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
                await dispatchRedux(editBooking(bookingEdit));
                Swal.fire({
                    title: "Edit Booking!",
                    text: "Your booking has been edited.",
                    icon: "success"
                });
            } else {
                await dispatchRedux(addBooking(bookingEdit));
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
                            <LabelStyled>ID</LabelStyled>
                            <InputStyled type="number" name="id" value={bookingEdit.id} onChange={handleChange} readOnly={isEditPage} placeholder="Id" />
                            <LabelStyled>Full Name</LabelStyled>
                            <InputStyled type="text" name="fullName" value={bookingEdit.fullName} onChange={handleChange} placeholder="Full Name" />
                            <LabelStyled>Book Date</LabelStyled>
                            <InputStyled type="text" name="bookDate" value={bookingEdit.bookDate} onChange={handleChange} placeholder="Book Date" />
                            <LabelStyled>Check In</LabelStyled>
                            <InputStyled type="date" name="checkIn" value={bookingEdit.checkIn} onChange={handleChange} placeholder="Check In" />
                            <LabelStyled>Check Out</LabelStyled>
                            <InputStyled type="date" name="checkOut" value={bookingEdit.checkOut} onChange={handleChange} placeholder="Check Out" />
                            <LabelStyled>Room ID</LabelStyled>
                            <InputStyled type="number" name="roomId" value={bookingEdit.roomId} onChange={handleChange} readOnly={isEditPage} placeholder="Room Id" />
                            <LabelStyled>Status</LabelStyled>
                            <SelectForm 
                                name="status"
                                options={optionsActivity}
                                value={optionsActivity.find(option => option.value === bookingEdit.status)}
                                onChange={(option) => handleSelectChange(option as SingleValue<{ value: "In progress" | "Check In" | "Check Out"; label: string }>)}
                            />
                            <LabelStyled>Special Request</LabelStyled>
                            <TextareaStyled name="specialRequest" value={bookingEdit.specialRequest} onChange={handleChange} placeholder="Description" />
                            <ButtonStyled styled='send' type="submit">{isEditPage ? 'Save Changes' : 'Add Booking'}</ButtonStyled>
                        </FormStyled>
                    </SectionFormStyled>
                </>
            }
        </>
    );
};

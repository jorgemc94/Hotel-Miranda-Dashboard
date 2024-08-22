import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ContentDetails, ContentText, SectionDetails, TextDetails, ContentTextDetails, ContentBottom, ImageDetails } from "../../Components/styled/DetailsStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FiArrowLeft } from "react-icons/fi";
import { AppDispatch, RootState } from "../../App/store";
import { Booking } from "../../types";
import { FourSquare } from "react-loading-indicators";
import { getBooking, getBookingsError, getBookingsStatus } from "../../Features/booking/bookingsSlice";
import { BookingThunk } from "../../Features/booking/bookingsThunk";

export const BookingDetailsPage = () => {
    const { id } = useParams<string>();
    const dispatchRedux: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const booking = useSelector((state: RootState) => getBooking(state));
    const bookingStatus = useSelector((state: RootState) => getBookingsStatus(state));
    const bookingsError = useSelector((state: RootState) => getBookingsError(state));
    const [renderBooking, setRenderBooking] = useState<Booking | null>(null);

    useEffect(() => {
        dispatchRedux(BookingThunk(id as string));
    },[])

    useEffect(() => {
        if (bookingStatus === 'pending') {
            setIsLoading(true)
        } else if (bookingStatus === 'fulfilled') {
            setRenderBooking(booking)
            //dispatchRedux(RoomThunk(id as string));
            setIsLoading(false)//cuando haga el useEffect de rooms deberá ser true
            console.log(booking)
        } else if (bookingStatus === 'rejected') {
            setIsLoading(false);
            console.error(bookingsError);
        }
    }, [bookingStatus]);

    /*useEffect(() => {
        if (bookingStatus === 'pending') {
            setIsLoading(true)
        } else if (bookingStatus === 'fulfilled') {
            setRenderBooking(booking)
            setIsLoading(false)
            console.log(booking)
        } else if (bookingStatus === 'rejected') {
            setIsLoading(false);
            console.error(bookingsError);
        }
    }, [bookingStatus]); cambiarlo para hacer las room*/

    const navigateHandle = () => {
        navigate('/bookings');
    };

    return (
        <>
            {isLoading ? (
                <FourSquare color="#32cd32" size="medium" text="" textColor="" />
            ) : (
                renderBooking &&(
                    <>
                        <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled> 
                        <SectionDetails>
                            <ContentDetails>
                                <TextDetails $title>{renderBooking.fullName}</TextDetails>
                                <ContentText>
                                    <ContentTextDetails>
                                        <TextDetails $title>Check In</TextDetails>
                                        <TextDetails>{renderBooking.checkIn}</TextDetails>
                                    </ContentTextDetails>
                                    <ContentTextDetails $right>
                                        <TextDetails $title>Check Out</TextDetails>
                                        <TextDetails>{renderBooking.checkOut}</TextDetails>
                                    </ContentTextDetails>
                                </ContentText>
                            </ContentDetails>
                        </SectionDetails>
                    </>
                )
            )}
        </>
    );
};

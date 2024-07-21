import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ContentDetails, ContentText, SectionDetails, TextDetails, ContentTextDetails, ContentBottom, ImageDetails } from "../../Components/styled/DetailsStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FiArrowLeft } from "react-icons/fi";
import { AppDispatch, RootState } from "../../App/store";
import { Booking, Room } from "../../types";
import { FourSquare } from "react-loading-indicators";
import { getBooking, getBookingList, getBookingsError, getBookingsStatus } from "../../Features/booking/bookingsSlice";
import { BookingDetailsThunk } from "../../Features/booking/bookingsDetailsThunk";
import { getRoom, getRoomsStatus, getRoomsError, getRoomsList } from "../../Features/rooms/roomsSlice";
import { RoomDetailsThunk } from "../../Features/rooms/roomsDetailsThunk";

export const BookingDetailsPage = () => {
    const { id } = useParams<string>();
    const dispatchRedux: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const booking = useSelector((state: RootState) => getBooking(state));
    const bookingStatus = useSelector((state: RootState) => getBookingsStatus(state));
    const bookingsError = useSelector((state: RootState) => getBookingsError(state));
    const bookingsList = useSelector((state: RootState) => getBookingList(state));
    const [renderBooking, setRenderBooking] = useState<Booking | null>(null);
    const room = useSelector((state: RootState) => getRoom(state));
    const roomStatus = useSelector((state: RootState) => getRoomsStatus(state));
    const roomError = useSelector((state: RootState) => getRoomsError(state));
    const roomsList = useSelector((state: RootState) => getRoomsList(state));
    const [roomRender, setRoomRender] = useState<Room | null>(null);

    useEffect(() => {
        const numberId = Number(id);
        if (bookingStatus === 'idle' || bookingStatus === 'fulfilled') {
            dispatchRedux(BookingDetailsThunk({ id: numberId, bookingList: bookingsList }));
        }
    }, [id, dispatchRedux, bookingStatus, bookingsList]);

    useEffect(() => {
        if (bookingStatus === 'fulfilled' && booking) {
            setRenderBooking(booking);
            setIsLoading(false);
        } else if (bookingStatus === 'rejected') {
            setIsLoading(false);
            console.error(bookingsError);
        }
    }, [bookingStatus, booking, bookingsError]);

    useEffect(() => {
        if (renderBooking && (roomStatus === 'idle' || roomStatus === 'fulfilled')) {
            const roomId = renderBooking.roomId;
            dispatchRedux(RoomDetailsThunk({ id: roomId, roomList: roomsList }));
        }
    }, [renderBooking, dispatchRedux, roomStatus, roomsList]);

    useEffect(() => {
        if (roomStatus === 'fulfilled') {
            setRoomRender(room as Room);
            setIsLoading(false);
        } else if (roomStatus === 'rejected') {
            setIsLoading(false);
            console.log(roomError);
        }
    }, [roomStatus, roomError, room]);

    const navigateHandle = () => {
        navigate('/bookings');
    };

    return (
        <>
            {isLoading ? (
                <FourSquare color="#32cd32" size="medium" text="" textColor="" />
            ) : (
                renderBooking && roomRender && (
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
                                <ContentText>
                                    <ContentTextDetails>
                                        <TextDetails $title>Room Info</TextDetails>
                                        <TextDetails>{roomRender.roomType}/{roomRender.roomNumber}</TextDetails>
                                    </ContentTextDetails>
                                    <ContentTextDetails $right>
                                        <TextDetails $title>Price</TextDetails>
                                        <TextDetails>{roomRender.price}€/night</TextDetails>
                                    </ContentTextDetails>
                                </ContentText>
                                <TextDetails $title>Amenities</TextDetails>
                                <ContentBottom>
                                    {roomRender.amenities && roomRender.amenities.map((amenity, index) => (
                                    <ButtonStyled key={index} styled='amenity'> {amenity} </ButtonStyled>
                                    ))}
                                </ContentBottom>
                            </ContentDetails>
                            <ImageDetails src={roomRender.photosArray[0]}/>
                        </SectionDetails>
                    </>
                )
            )}
        </>
    );
};

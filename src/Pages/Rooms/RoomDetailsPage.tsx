import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FiArrowLeft } from "react-icons/fi";
import { getRoom, getRoomsError, getRoomsList, getRoomsStatus } from "../../Features/rooms/roomsSlice";
import { RoomDetailsThunk } from "../../Features/rooms/roomsDetailsThunk";
import { ContentDetails, ContentText, ImageDetails, SectionDetails, ContentTextDetails, TextDetails, ContentBottom } from "../../Components/styled/DetailsStyled";

export const RoomDetailsPage = () => {
    const { id } = useParams();
    const dispatchRedux = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const room = useSelector(getRoom);
    const roomStatus = useSelector(getRoomsStatus);
    const roomError = useSelector(getRoomsError);
    const [error, setError] = useState(null);
    const roomsList = useSelector(getRoomsList);

    useEffect(() => {
        if (roomStatus === 'idle') {
            dispatchRedux(RoomDetailsThunk(id));
        } else if (roomStatus === 'fulfilled') {
            setIsLoading(false);
        } else if (roomStatus === 'rejected') {
            setIsLoading(false);
            setError(roomError);
        }
    }, [dispatchRedux, id, roomStatus, roomError]);

    const navigateHandle = () => {
        navigate('/rooms');
    };

    const initialFetch = async () => {
        try {
            await dispatchRedux(RoomDetailsThunk({id: id, roomsList: roomsList})).unwrap();
            setIsLoading(false);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initialFetch();
    }, [id]);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!room) {
        return <p>No room found</p>;
    }

    return (
        <>
            {isLoading ? 
                <p>...loading...</p> : 
                <>
                    <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled>
                    <SectionDetails>
                        <ContentDetails>
                            <ContentText>
                                <ContentTextDetails>
                                    <TextDetails $title>Room Info</TextDetails>
                                    <TextDetails>{room.roomType}</TextDetails>
                                </ContentTextDetails>
                                <ContentTextDetails $right>
                                    <TextDetails $title>Price</TextDetails>
                                    <TextDetails>${room.price}/night</TextDetails>
                                </ContentTextDetails>
                            </ContentText>
                            <TextDetails $title>Amenities</TextDetails>
                            <ContentBottom>
                                {room.amenities && room.amenities.map((amenity, index) => (
                                    <ButtonStyled key={index} styled='amenity'> {amenity} </ButtonStyled>
                                ))}
                            </ContentBottom>
                        </ContentDetails>
                        <ImageDetails src={room.photosArray[0]}/>
                    </SectionDetails>
                    
                </>
            }
        </>
    );
};

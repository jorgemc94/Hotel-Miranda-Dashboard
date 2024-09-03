import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FiArrowLeft } from "react-icons/fi";
import { getRoom, getRoomsError, getRoomsStatus } from "../../Features/rooms/roomsSlice";
import { RoomThunk } from "../../Features/rooms/roomsThunk";
import { ContentDetails, ContentText, ImageDetails, SectionDetails, ContentTextDetails, TextDetails, ContentBottom } from "../../Components/styled/DetailsStyled";
import { AppDispatch, RootState } from "../../App/store";
import { Room } from "../../types";
import { FourSquare } from "react-loading-indicators";

export const RoomDetailsPage = () => {
    const { id } = useParams<string>();
    const dispatchRedux: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const room = useSelector((state: RootState) => getRoom(state));
    const roomStatus = useSelector((state: RootState) => getRoomsStatus(state));
    const roomError = useSelector((state: RootState) => getRoomsError(state));
    const [roomRender, setRoomRender] = useState<Room | null>(null)

    useEffect(() => {
        if (id) {
            dispatchRedux(RoomThunk(id));
        }
    }, [id, dispatchRedux]);

    useEffect(() => {
        if (roomStatus === 'pending') {
            setIsLoading(true);
        } else if (roomStatus === 'fulfilled' && room) {
            setRoomRender(room);
            setIsLoading(false);
        } else if (roomStatus === 'rejected') {
            setIsLoading(false);
            console.error(roomError);
        }
    }, [roomStatus, room, roomError]);

    const navigateHandle = () => {
        navigate('/rooms');
    };

    return (
        <>
            {isLoading ? 
                <FourSquare color="#32cd32" size="medium" text="" textColor="" />  : 
                roomRender && (
                <>
                    <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled>
                    <SectionDetails>
                        <ContentDetails>
                            <ContentText>
                                <ContentTextDetails>
                                    <TextDetails $title>Room Info</TextDetails>
                                    <TextDetails>{roomRender.roomType}</TextDetails>
                                </ContentTextDetails>
                                <ContentTextDetails $right>
                                    <TextDetails $title>Price</TextDetails>
                                    <TextDetails>${roomRender.price}/night</TextDetails>
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
            }
        </>
    );
};
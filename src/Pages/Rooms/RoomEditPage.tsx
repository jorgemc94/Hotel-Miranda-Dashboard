import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FiArrowLeft } from "react-icons/fi";
import { addRoom, editRoom, getRoom, getRoomsList } from "../../Features/rooms/roomsSlice";
import { RoomDetailsThunk } from "../../Features/rooms/roomsDetailsThunk";
import { FormStyled, InputStyled, LabelStyled, SectionFormStyled, TextareaStyled } from "../../Components/styled/FormStyled";

export const RoomEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatchRedux = useDispatch();
    const room = useSelector(getRoom);
    const [roomEdit, setRoomEdit] = useState({id: "", roomNumber: "", availability: "", roomType: "", description: "", price: "", discount: "", cancellation: "", amenities: [], photosArray: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const roomsList = useSelector(getRoomsList);

    const isEditPage = Boolean(id);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            if (isEditPage) {
                try {
                    await dispatchRedux(RoomDetailsThunk({ id: id, roomsList: roomsList })).unwrap();
                } catch (err) {
                    setError(err);
                }
            }
            setIsLoading(false);
        };

        fetchRoomDetails();
    }, [id, dispatchRedux, isEditPage, roomsList]);

    useEffect(() => {
        if (room && isEditPage) {
            setRoomEdit({
                id: room.id,
                roomNumber: room.roomNumber,
                availability: room.availability,
                roomType: room.roomType,
                description: room.description,
                price: room.price,
                discount: room.discount,
                cancellation: room.cancellation,
                amenities: room.amenities,
                photosArray: room.photosArray,
            });
        }
    }, [room, isEditPage]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRoomEdit({ ...roomEdit, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEditPage) {
            dispatchRedux(editRoom(roomEdit));
        } else {
            dispatchRedux(addRoom(roomEdit));
        }

        navigate('/rooms');
    };

    const navigateHandle = () => {
        navigate('/rooms');
    };

  

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            {isLoading ? <p>...Loading...</p> : 
                <>
                    <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled>
                        <SectionFormStyled>
                            <FormStyled onSubmit={handleSubmit}>
                            <LabelStyled>ID</LabelStyled>
                            <InputStyled type="number" name="id" value={roomEdit.id} onChange={handleChange} readOnly={isEditPage} placeholder="Id" />
                            <LabelStyled>Number</LabelStyled>
                            <InputStyled type="number" name="roomNumber" value={roomEdit.roomNumber} onChange={handleChange} placeholder="Room Number" />
                            <LabelStyled>Bed Type</LabelStyled>
                            <InputStyled type="text" name="roomType" value={roomEdit.roomType} onChange={handleChange} placeholder="Room Type" />
                            <LabelStyled>Availability</LabelStyled>
                            <InputStyled type="text" name="availability" value={roomEdit.availability} onChange={handleChange} placeholder="Availability" />
                            <LabelStyled>Description</LabelStyled>
                            <TextareaStyled name="description" value={roomEdit.description} onChange={handleChange} placeholder="Description"> </TextareaStyled>
                            <LabelStyled>Price</LabelStyled>
                            <InputStyled type="number" name="price" value={roomEdit.price} onChange={handleChange} placeholder="Price" />
                            <LabelStyled>Discount (%)</LabelStyled>
                            <InputStyled type="Number" name="discount" value={roomEdit.discount} onChange={handleChange} placeholder="Discount (%)" />
                            <LabelStyled>Cancellation</LabelStyled>
                            <TextareaStyled placeholder="reason for cancellation" name="cancellation" value={roomEdit.cancellation} onChange={handleChange} />
                            <LabelStyled>Amenities</LabelStyled>
                            <InputStyled type="text" name="amenities"  value={roomEdit.amenities.join(', ')} onChange={(e) => setRoomEdit({ ...roomEdit, amenities: e.target.value.split(',').map(item => item.trim()) })} placeholder="Amenities" />
                            <LabelStyled>Photos</LabelStyled>
                            <InputStyled type="text" name="photosArray"  value={roomEdit.photosArray.join(', ')}  onChange={(e) => setRoomEdit({ ...roomEdit, photosArray: e.target.value.split(',').map(item => item.trim()) })} placeholder="Photos" />
                            <ButtonStyled type="submit" styled='send'>{isEditPage ? 'Update Room' : 'Add Room'}</ButtonStyled>
                        </FormStyled>
                    </SectionFormStyled>
                    
                </>
            }
           
        </>
    );
};

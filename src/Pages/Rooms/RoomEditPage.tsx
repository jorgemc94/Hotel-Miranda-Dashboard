import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FiArrowLeft } from "react-icons/fi";
import { addRoom, editRoom, getRoom, getRoomsList } from "../../Features/rooms/roomsSlice";
import { RoomDetailsThunk } from "../../Features/rooms/roomsDetailsThunk";
import { FormStyled, InputStyled, LabelStyled, SectionFormStyled, TextareaStyled } from "../../Components/styled/FormStyled";
import { AppDispatch, RootState } from "../../App/store";
import { Room } from "../../types";
import { SingleValue } from "react-select";
import { SelectForm } from "../../Components/styled/SelectStyled";
import Swal from 'sweetalert2';
import { FourSquare } from "react-loading-indicators";

export const RoomEditPage = () => {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const dispatchRedux: AppDispatch = useDispatch();
    const room = useSelector((state: RootState) => getRoom(state));
    const roomsList = useSelector(getRoomsList);
    const [roomEdit, setRoomEdit] = useState<Room>({
        id: 0,
        roomNumber: 0,
        availability: "available",
        roomType: "Double Superior",
        description: "",
        price: 0,
        discount: 0,
        cancellation: "",
        amenities: [],
        photosArray: [],
        offer: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const isEditPage = Boolean(id);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            const numberId = Number(id);
            if (isEditPage) {
                try {
                    await dispatchRedux(RoomDetailsThunk({ id: numberId, roomList: roomsList }));
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
                offer: room.offer
            });
        }
    }, [room, isEditPage]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;

        if (type === 'checkbox' && name === 'offer') {
            setRoomEdit({ ...roomEdit });
        } else if (name === 'price' || name === 'discount') {
            setRoomEdit({ ...roomEdit, [name]: parseFloat(value) });
        } else {
            setRoomEdit({ ...roomEdit, [name]: value });
        }
    };

    const handleSelectChange = (selectedOptions: any, name: string) => {
        const values = selectedOptions.map((option: { value: string }) => option.value);
        setRoomEdit({ ...roomEdit, [name]: values });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditPage) {
            dispatchRedux(editRoom(roomEdit));
            Swal.fire({
                title: "Edit Room!",
                text: "Your file has been edited.",
                icon: "success"
            });
        } else {
            dispatchRedux(addRoom(roomEdit));
            Swal.fire({
                title: "New Room!",
                text: "Your file has been added.",
                icon: "success"
            });
        }

        navigate('/rooms');
    };

    const optionsAmenities = [
        { value: "Breakfast", label: "Breakfast" },
        { value: "Grocery", label: "Grocery" },
        { value: "Cleaning", label: "Cleaning" },
        { value: "Shop Near", label: "Shop Near" },
        { value: "Towels", label: "Towels" },
        { value: "Air conditioner", label: "Air conditioner" },
        { value: "Kitchen", label: "Kitchen" },
        { value: "TV", label: "TV" },
        { value: "Shower", label: "Shower" },
        { value: "High speed WiFi", label: "High speed WiFi" },
        { value: "Beach views", label: "Beach views" },
    ];

    const optionStatus = [
        { value: "available", label: "available" },
        { value: "booked", label: "booked" }
    ]

    const handleSelectStatusChange = (selectedOption: SingleValue<{ value: "available" | "booked"; label: string }>) => {
        if (selectedOption) {
            setRoomEdit(prevState => ({
                ...prevState,
                availability: selectedOption.value
            }));
        }
    };

    const navigateHandle = () => {
        navigate('/rooms');
    };

    return (
        <>
            {isLoading ? <FourSquare color="#32cd32" size="medium" text="" textColor="" /> : 
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
                            <SelectForm
                            name="status"
                            options={optionStatus}
                            value={optionStatus.find(option => option.value === roomEdit.availability)}
                            onChange={(option) => handleSelectStatusChange(option as SingleValue<{ value: "available" | "booked" ; label: string }>)} 
                            />
                            <LabelStyled>Description</LabelStyled>
                            <TextareaStyled name="description" value={roomEdit.description} onChange={handleChange} placeholder="Description" />
                            <LabelStyled>Price</LabelStyled>
                            <InputStyled type="number" name="price" value={roomEdit.price} onChange={handleChange} placeholder="Price" />
                            <LabelStyled>Discount (%)</LabelStyled>
                            <InputStyled type="number" name="discount" value={roomEdit.discount} onChange={handleChange} placeholder="Discount (%)" />
                            <LabelStyled>Cancellation</LabelStyled>
                            <TextareaStyled placeholder="Reason for cancellation" name="cancellation" value={roomEdit.cancellation} onChange={handleChange} />
                            <LabelStyled>Amenities</LabelStyled>
                            <SelectForm
                                name="amenities"
                                options={optionsAmenities}
                                isMulti
                                value={optionsAmenities.filter(option => roomEdit.amenities.includes(option.value))}
                                onChange={(selectedOptions) => handleSelectChange(selectedOptions, "amenities")}
                            />
                            <LabelStyled>Photos</LabelStyled>
                            <InputStyled type="text" name="photosArray" value={roomEdit.photosArray.join(', ')} onChange={(e) => setRoomEdit({ ...roomEdit, photosArray: e.target.value.split(',').map(item => item.trim()) })} placeholder="Photos" />
                            <LabelStyled>Offer</LabelStyled>
                            <ButtonStyled type="submit" styled='send'>{isEditPage ? 'Update Room' : 'Add Room'}</ButtonStyled>
                        </FormStyled>
                    </SectionFormStyled>
                </>
            }
        </>
    );
};

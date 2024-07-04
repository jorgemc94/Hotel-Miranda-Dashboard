import { TableComponent } from "../../Components/Table/TableComponent";
import { ImageTable, PriceTable, SubtitleTable } from "../../Components/Table/TableStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { SectionOrder } from "../../Components/styled/OrderStyled";
import data from '../../Components/data/rooms.json';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, getRoomsStatus, getRoomsError, getRoomsList } from "../../Features/rooms/roomsSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2'; 
import { RoomsThunk } from "../../Features/rooms/roomsThunk";

export const RoomsListPage = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([data]);
    const [isLoading, setIsLoading] = useState(true);
    const roomStatus = useSelector(getRoomsStatus) || 'idle';
    const roomsError = useSelector(getRoomsError) || null;
    const roomsList = useSelector(getRoomsList) || [];
    const dispatchRedux = useDispatch();

    useEffect(() => {
        if (roomStatus === 'idle') {
            dispatchRedux(RoomsThunk());
        } else if (roomStatus === 'fulfilled') {
            setIsLoading(false);
            setRooms(roomsList);
        } else if (roomStatus === 'rejected') {
            setIsLoading(false);
        }
    }, [dispatchRedux, roomStatus, roomsList, roomsError]);

    const columns = [
        { headerColumn: 'Photos', columnsData: 'photo', columnRenderer: (row) => 
            row.photosArray[0] ? (
                <ImageTable styled='rooms' src={row.photosArray[0]} alt="Room Photo" />
            ) : (
                <SubtitleTable>No Image</SubtitleTable>
            ) 
        },
        { headerColumn: 'Number', columnsData: 'roomNumber', columnRenderer: (row) => <SubtitleTable>{row.roomNumber}</SubtitleTable> },
        { headerColumn: 'ID', columnsData: 'id', columnRenderer: (row) => <SubtitleTable>{row.id}</SubtitleTable> },
        { headerColumn: 'Bed Type', columnsData: 'roomType', columnRenderer: (row) => <SubtitleTable>{row.roomType}</SubtitleTable> },
        { headerColumn: 'Amenities', columnsData: 'amenities', columnRenderer: (row) => 
            Array.isArray(row.amenities) ? (
                <SubtitleTable>{row.amenities.join(', ')}</SubtitleTable>
            ) : (
                <SubtitleTable>No Amenities</SubtitleTable>
            )
        },
        {
            headerColumn: 'Rate', columnsData: 'price', columnRenderer: (row) => (
                <>
                    <PriceTable $price>{row.price}€</PriceTable>
                    <PriceTable $price>{'/night'}</PriceTable>
                </>
            )
        },
        {
            headerColumn: 'Offer Price', columnsData: 'offer', columnRenderer: (row) => (
                <>
                    <PriceTable>{(row.price - (row.price * (row.discount / 100))).toFixed(0)}€ </PriceTable>
                    <PriceTable>{'/night'}</PriceTable>
                </>
            )
        },
        {
            headerColumn: 'Status', columnsData: 'availability', columnRenderer: (row) => (
                row.availability === 'booked' ? (
                    <ButtonStyled styled='bookedRed'>{row.availability}</ButtonStyled>
                ) : (
                    <ButtonStyled styled='available'>{row.availability}</ButtonStyled>
                )
            )
        },
        { headerColumn: 'Actions', columnsData: 'actions', columnRenderer: (row) => {
            return (
                <>
                    <RiDeleteBin6Line onClick={(event) => deleteHandle(event, row.id)} /> <CiEdit onClick={() => navigateEditHandle(row.id)} />
                </>
            )
        } }
    ];

    const deleteHandle = (event, roomId) => {
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
                dispatchRedux(deleteRoom(roomId));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                setRooms((prevRooms) => prevRooms.filter(room => room.id !== roomId));
            }
        });
    }

    const navigateEditHandle = (roomId) => {
        navigate(`/room/edit/${roomId}`);
    };

    useEffect(() => {
        sortRoomsHandler('roomNumber');
    }, []);

    const sortRoomsHandler = (value) => {
        let sortedRooms = [...data];

        if (value === 'roomNumber') {
            sortedRooms = sortedRooms.sort((a, b) => {
                const numA = a.roomNumber.toString();
                const numB = b.roomNumber.toString();
                return numA.localeCompare(numB);
            });
        } else if (value === 'availability') {
            sortedRooms = sortedRooms.filter(room => room.availability === 'available');
        } else if (value === 'booked') {
            sortedRooms = sortedRooms.filter(room => room.availability === 'booked');
        } else if (value === 'lowestPrice') {
            sortedRooms = sortedRooms.sort((a, b) => b.price - a.price);
        } else if (value === 'highestPrice') {
            sortedRooms = sortedRooms.sort((a, b) => a.price - b.price);
        } else if (value === 'id') {
            sortedRooms = sortedRooms.sort((a, b) => a.id - b.id);
        }

        setRooms(sortedRooms);
    };

    const handleSortChange = (event) => {
        const value = event.target.value;
        sortRoomsHandler(value);
    };

    const handleListClick = () => {
        sortRoomsHandler('id');
    };

    const navigateNewRoomHandle = () => {
        navigate('/room/newroom');
    }

    return (
        <>
            {isLoading ? <p>...Loading...</p> :
                <>
                     <SectionOrder>
                        <List>
                            <ItemList onClick={handleListClick}>All Rooms</ItemList>
                        </List>
                        <ButtonStyled styled='send' onClick={navigateNewRoomHandle}>+ New Room</ButtonStyled>
                        <SelectStyled onChange={handleSortChange}>
                            <option value='roomNumber'>Room Number</option>
                            <option value='availability'>Available</option>
                            <option value='booked'>Booked</option>
                            <option value='lowestPrice'>Price Highest to Lowest</option>
                            <option value='highestPrice'>Price Lowest to Highest</option>
                        </SelectStyled>
                    </SectionOrder>
                    <TableComponent columns={columns} data={rooms} />
                </>
            }
           
        </>
    );
}

import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, getRoomsStatus, getRoomsError, getRoomsList } from "../../Features/rooms/roomsSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2'; 
import { RoomsThunk } from "../../Features/rooms/roomsThunk";
import { Room } from "../../types";
import { AppDispatch, RootState } from "../../App/store";
import { FourSquare } from "react-loading-indicators";
import { TableComponent } from "../../Components/Table/TableComponent";
import { ImageTable, PriceTable, SubtitleTable } from "../../Components/Table/TableStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { SectionOrder } from "../../Components/styled/OrderStyled";

export const RoomsListPage = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortCriteria, setSortCriteria] = useState('id');
    const roomStatus = useSelector((state: RootState) => getRoomsStatus(state));
    const roomsError = useSelector((state: RootState) => getRoomsError(state));
    const roomsList = useSelector((state: RootState) => getRoomsList(state));
    const dispatchRedux: AppDispatch = useDispatch();

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

    useEffect(() => {
        sortRoomsHandler(sortCriteria);
    }, [roomsList, sortCriteria]);

    const columns = [
        {
            headerColumn: 'Photos',
            columnsData: 'photo',
            columnRenderer: (row: Room) => (
                row.photosArray[0] ? (
                    <ImageTable styled='rooms' src={row.photosArray[0]} alt="Room Photo" />
                ) : (
                    <SubtitleTable>No Image</SubtitleTable>
                )
            ),
        },
        { headerColumn: 'Number', columnsData: 'roomNumber', columnRenderer: (row: Room) => <SubtitleTable>{row.roomNumber}</SubtitleTable> },
        { headerColumn: 'ID', columnsData: 'id', columnRenderer: (row: Room) => <SubtitleTable>{row.id}</SubtitleTable> },
        { headerColumn: 'Bed Type', columnsData: 'roomType', columnRenderer: (row: Room) => <SubtitleTable>{row.roomType}</SubtitleTable> },
        {
            headerColumn: 'Amenities',
            columnsData: 'amenities',
            columnRenderer: (row: Room) => (
                Array.isArray(row.amenities) ? (
                    <SubtitleTable>{row.amenities.join(', ')}</SubtitleTable>
                ) : (
                    <SubtitleTable>No Amenities</SubtitleTable>
                )
            ),
        },
        {
            headerColumn: 'Rate',
            columnsData: 'price',
            columnRenderer: (row: Room) => (
                <>
                    <PriceTable $price>{row.price}€</PriceTable>
                    <PriceTable $price>/night</PriceTable>
                </>
            ),
        },
        {
            headerColumn: 'Offer Price',
            columnsData: 'offer',
            columnRenderer: (row: Room) => (
                <>
                    <PriceTable>{(row.price - (row.price * (row.discount / 100))).toFixed(0)}€</PriceTable>
                    <PriceTable>/night</PriceTable>
                </>
            ),
        },
        {
            headerColumn: 'Status',
            columnsData: 'availability',
            columnRenderer: (row: Room) => (
                row.availability === 'booked' ? (
                    <ButtonStyled styled='bookedRed'>{row.availability}</ButtonStyled>
                ) : (
                    <ButtonStyled styled='available'>{row.availability}</ButtonStyled>
                )
            ),
        },
        {
            headerColumn: 'Actions',
            columnsData: 'actions',
            columnRenderer: (row: Room) => (
                <>
                    <RiDeleteBin6Line onClick={(event: React.MouseEvent<SVGElement>) => deleteHandle(event, row.id)} />
                    <CiEdit onClick={() => navigateEditHandle(row.id)} />
                </>
            ),
        },
    ];

    const deleteHandle = (event: React.MouseEvent<SVGElement>, roomId: number) => {
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
                    title: "Room Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    const navigateEditHandle = (roomId: number) => {
        navigate(`/room/edit/${roomId}`);
    };

    const sortRoomsHandler = (value: string) => {
        let sortedRooms = [...roomsList];

        if (value === 'roomNumber') {
            sortedRooms = sortedRooms.sort((a, b) => a.roomNumber - b.roomNumber);
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

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortCriteria(value);
        sortRoomsHandler(value);
    };

    const handleListClick = () => {
        setSortCriteria('id');
        sortRoomsHandler('id');
    };

    const navigateNewRoomHandle = () => {
        navigate('/room/newroom');
    };

    return (
        <>
            {isLoading ? <FourSquare color="#32cd32" size="medium" text="" textColor="" /> :
                <>
                     <SectionOrder>
                        <List>
                            <ItemList onClick={handleListClick}>All Rooms</ItemList>
                        </List>
                        <ButtonStyled styled='send' onClick={navigateNewRoomHandle}>+ New Room</ButtonStyled>
                        <SelectStyled value={sortCriteria} onChange={handleSortChange}>
                            <option value='roomNumber'>Room Number</option>
                            <option value='availability'>Available</option>
                            <option value='booked'>Booked</option>
                            <option value='lowestPrice'>Price Highest to Lowest</option>
                            <option value='highestPrice'>Price Lowest to Highest</option>
                            <option value='id'>ID</option>
                        </SelectStyled>
                    </SectionOrder>
                    <TableComponent columns={columns} data={rooms} detailPage='/room'/>
                </>
            }
        </>
    );
};

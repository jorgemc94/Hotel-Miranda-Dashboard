import { TableComponent } from "../../Components/Table/TableComponent";
import { ImageTable, PriceTable, SubtitleTable } from "../../Components/Table/TableStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { SectionOrder } from "../../Components/styled/OrderStyled";
import data from '../../Components/data/rooms.json';
import { useEffect, useState } from "react";

export const RoomsListPage = () => {
    const columns = [
        { headerColumn: 'Photos', columnsData: 'photo', columnRenderer: (row) => <ImageTable styled='rooms' src={row.photosArray[0]} alt="Room Photo" /> },
        { headerColumn: 'Number', columnsData: 'roomNumber', columnRenderer: (row) => <SubtitleTable>{row.roomNumber}</SubtitleTable> },
        { headerColumn: 'ID', columnsData: 'id', columnRenderer: (row) => <SubtitleTable>{row.id}</SubtitleTable> },
        { headerColumn: 'Bed Type', columnsData: 'roomType', columnRenderer: (row) => <SubtitleTable>{row.roomType}</SubtitleTable> },
        { headerColumn: 'Amenities', columnsData: 'amenities', columnRenderer: (row) => <SubtitleTable>{row.amenities.join(', ')}</SubtitleTable> },
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
        { headerColumn: 'Room Floor', columnsData: 'roomFloor', columnRenderer: (row) => <SubtitleTable>{row.roomFloor}</SubtitleTable> }
    ];

    const [rooms, setRooms] = useState(data);

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

    return (
        <>
            <SectionOrder>
                <List>
                    <ItemList onClick={handleListClick}>All Rooms</ItemList>
                </List>
                <ButtonStyled styled='send'>+ New Room</ButtonStyled>
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
    );
}

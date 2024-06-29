import { TableComponent } from "../../Components/Table/TableComponent"
import { ImageTable, PriceTable, SubtitleTable } from "../../Components/Table/TableStyled"
import { ButtonStyled } from "../../Components/styled/ButtonStyled"
import { ItemList, List } from "../../Components/styled/LinkStyled"
import { SelectStyled } from "../../Components/styled/SelectStyled"
import { SectionOrder } from "../../Components/styled/OrderStyled"
import data from '../../Components/data/rooms.json'



export const RoomsListPage = () => {


    const columns = [
        { headerColumn: 'Photos', columnsData: 'photo', columnRenderer: (row) => <ImageTable styled='rooms' src={row.photosArray[0]} alt="Room Photo" /> },
        { headerColumn: 'Number', columnsData: 'roomNumber', columnRenderer: (row) => <SubtitleTable>{row.roomNumber}</SubtitleTable>},
        { headerColumn: 'ID', columnsData: 'id' , columnRenderer: (row) => <SubtitleTable>{row.id}</SubtitleTable>},
        { headerColumn: 'Bed Type', columnsData: 'roomType' , columnRenderer: (row) => <SubtitleTable>{row.roomType}</SubtitleTable>},
        { headerColumn: 'Bed Type', columnsData: 'amenities', columnRenderer: (row) => <SubtitleTable>{row.amenities.join(', ')}</SubtitleTable> },
        { headerColumn: 'Rate', columnsData: 'price', columnRenderer: (row) => (
            <>
                <PriceTable $price>{row.price}</PriceTable>
                <PriceTable $price>{'/night'}</PriceTable>
            </>
        )},

        { headerColumn: 'Offer Price', columnsData: 'offer',columnRenderer: (row) => (
        <>
            <PriceTable>{row.price - (row.price*(row.discount/100)).toFixed(0)}€ </PriceTable>
            <PriceTable>{'/night'}</PriceTable>
            
        </>
        )},
        { headerColumn: 'Status', columnsData: 'availability', columnRenderer:(row) =>(
            row.availability === 'booked' ? (
                <ButtonStyled styled='bookedRed'>{row.availability}</ButtonStyled>
            ) : (
                <ButtonStyled styled='available'>{row.availability}</ButtonStyled>
            )
        )},
        { headerColumn: 'Room Floor', columnsData: 'RoomFloor' }
    ];


    return (
        <>
        <SectionOrder>
            <List>
                <ItemList>All Rooms</ItemList>
            </List>
            <ButtonStyled styled='send'>+ New Room</ButtonStyled>
            <SelectStyled>
                <option value={'roomNumber'}>Room Number</option>
                <option value={'availability'}>Available</option>
                <option value={'booked'}>Booked</option>
                <option value={'lowestPrice'}>Price Highest to Lowest</option>
                <option value={'highestPrice'}>Price Lowest to Highest</option>
            </SelectStyled>
        </SectionOrder>
        <TableComponent columns={columns} data={data} />
        </>
    )
}
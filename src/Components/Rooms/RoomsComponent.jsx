
import data from '../data/rooms.json';
import { TableComponent } from '../Table/TableComponent';
import { ImageTable } from '../Table/TableStyled';

export const RoomsComponent = () => {

    const columns = [
        { headerColumn: 'Photos', columnsData: 'photo', columnRenderer: (row) => <ImageTable styled='rooms' src={row.photo} alt="Room Photo" /> },
        { headerColumn: 'Number', columnsData: 'number' },
        { headerColumn: 'ID', columnsData: 'id' },
        { headerColumn: 'Bed Type', columnsData: 'BedType' },
        { headerColumn: 'Amenities', columnsData: 'Amenities', columnRenderer: (row) => row.Amenities.join(', ') },
        { headerColumn: 'Rate', columnsData: 'Rate' },
        { headerColumn: 'Offer Price', columnsData: 'OfferPrice' },
        { headerColumn: 'Status', columnsData: 'Status' },
        { headerColumn: 'Room Floor', columnsData: 'RoomFloor' }
    ];

    return (
        <TableComponent columns={columns} data={data} />
    )
}
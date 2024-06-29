import { RoomsComponent } from "../../Components/Rooms/RoomsComponent"
import { ButtonStyled } from "../../Components/styled/ButtonStyled"
import { ItemList, List } from "../../Components/styled/LinkStyled"
import { SelectStyled } from "../../Components/styled/SelectStyled"
import { SectionOrder } from "./RoomsStyled"


export const RoomsPage = () => {


    return (
        <>
        <SectionOrder>
            <List>
                <ItemList>All Rooms</ItemList>
            </List>
            <ButtonStyled styled='send'>+ New Room</ButtonStyled>
            <SelectStyled>
                <option>Room Number</option>
                <option>Available</option>
                <option>Booked</option>
                <option>Price Highest to Lowest</option>
                <option>Price Lowest to Highest</option>
            </SelectStyled>
        </SectionOrder>
        <RoomsComponent />
        </>
    )
}
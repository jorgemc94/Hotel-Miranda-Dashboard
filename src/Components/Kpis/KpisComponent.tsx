import { KpisArticle, KpisSection, KpisText, KpisTextDetails } from "./KpisStyled";
import { IoBedOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoIosLogIn, IoIosLogOut  } from "react-icons/io";
import '../../styles.css';


export const KpisComponent = () => {



    return (
        <>
            <KpisSection>
                <KpisArticle>
                    <IoBedOutline className="KPIicon"/>
                    <KpisText>
                        <KpisTextDetails $number>8,461</KpisTextDetails>
                        <KpisTextDetails>New Booking</KpisTextDetails>
                    </KpisText>
                </KpisArticle>
                <KpisArticle>
                    <LuCalendarCheck2 className="KPIicon"/>
                    <KpisText>
                    <KpisTextDetails $number>963</KpisTextDetails>
                    <KpisTextDetails>Scheduled Room</KpisTextDetails>
                    </KpisText>
                </KpisArticle>
                <KpisArticle>
                    <IoIosLogIn className="KPIicon"/>
                    <KpisText>
                    <KpisTextDetails $number>753</KpisTextDetails>
                    <KpisTextDetails>Check In</KpisTextDetails>
                    </KpisText>
                </KpisArticle>
                <KpisArticle>
                    <IoIosLogOut className="KPIicon"/>
                    <KpisText>
                    <KpisTextDetails $number>516</KpisTextDetails>
                    <KpisTextDetails>Check Out</KpisTextDetails>
                    </KpisText>
                </KpisArticle>
            </KpisSection>
        </>
    )
}
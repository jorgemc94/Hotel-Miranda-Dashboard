import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsersError, getUsersStatus } from "../../Features/users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ContentDetails, ContentText, ImageDetails, SectionDetails, TextDetails, ContentTextDetails } from "../../Components/styled/DetailsStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FiArrowLeft } from "react-icons/fi";
import { AppDispatch, RootState } from "../../App/store";
import { User } from "../../types";
import { FourSquare } from "react-loading-indicators";
import { UserThunk } from "../../Features/users/usersThunk";

export const UserDetailsPage = () => {
    const { id } = useParams<string>();
    const dispatchRedux: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state: RootState) => getUser(state));
    const userStatus = useSelector((state: RootState) => getUsersStatus(state));
    const usersError = useSelector((state: RootState) => getUsersError(state));
    const usersList = useSelector((state: RootState) => getUser(state));
    const [employee, setEmployee] = useState<User | null>(null);

    useEffect(() => {
        dispatchRedux(UserThunk(id as string));
    },[])

    useEffect(() => {
        if (userStatus === 'pending') {
            setIsLoading(true)
        } else if (userStatus === 'fulfilled') {
            setEmployee(user)
            setIsLoading(false)
            console.log(user)
        } else if (userStatus === 'rejected') {
            setIsLoading(false);
            console.error(usersError);
        }
    }, [userStatus]);;

    const navigateHandle = () => {
        navigate('/users');
    };

    return (
        <>
            {isLoading ? 
                <FourSquare color="#32cd32" size="medium" text="" textColor="" />  : 
                employee && (
                <>
                    <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled> 
                    <SectionDetails>
                        <ContentDetails>
                            <TextDetails $title>{employee.name}</TextDetails>
                            <TextDetails>{employee._id}</TextDetails>
                            <ContentText>
                                <ContentTextDetails>
                                    <TextDetails $title>Email</TextDetails>
                                    <TextDetails>{employee.email}</TextDetails>
                                </ContentTextDetails>
                                <ContentTextDetails $right>
                                    <TextDetails $title>Contact</TextDetails>
                                    <TextDetails>{employee.phone}</TextDetails>
                                </ContentTextDetails>
                            </ContentText>
                            <ContentText>
                                <ContentTextDetails>
                                    <TextDetails $title>Start Date</TextDetails>
                                    <TextDetails>{employee.date}</TextDetails>
                                </ContentTextDetails>
                                <ContentTextDetails $right>
                                    <TextDetails $title>Status</TextDetails>
                                    <TextDetails>{employee.status === 'valid' ? <ButtonStyled styled='available'>Valid</ButtonStyled> : <ButtonStyled styled='bookedRed'>Invalid</ButtonStyled>}</TextDetails>
                                </ContentTextDetails>
                            </ContentText>
                            <TextDetails $title>Description</TextDetails>
                            <TextDetails>{employee.position.description}</TextDetails>
                        </ContentDetails>
                        <ImageDetails src={employee.photo} alt="img User" />
                    </SectionDetails>
                </>
                )
            }
        </>
    );
};

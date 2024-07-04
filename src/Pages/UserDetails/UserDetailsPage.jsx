import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsersError, getUsersList, getUsersStatus } from "../../Features/users/usersSlice";
import { UserDetailsThunk } from "../../Features/users/userDetailsThunk";
import { useNavigate, useParams } from "react-router-dom";
import { ContentDetails, ContentText, ImageDetails, SectionDetails, TextDetails, ContentTextDetails } from "./UserDetailsStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FiArrowLeft } from "react-icons/fi";

export const UserDetailsPage = () => {

    const { id } = useParams();
    const dispatchRedux = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(getUser);
    const userStatus = useSelector(getUsersStatus);
    const usersError = useSelector(getUsersError);
    const [error, setError] = useState(null);
    const usersList = useSelector(getUsersList);

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatchRedux(UserDetailsThunk(id));
        } else if (userStatus === 'fulfilled') {
            setIsLoading(false);
        } else if (userStatus === 'rejected') {
            setIsLoading(false);
            setError(usersError);
        }
    }, [dispatchRedux, id, userStatus, usersError]);

    const navigateHandle = () => {
        navigate('/users');
    };

    const initialFetch = async () => {
        try {
            await dispatchRedux(UserDetailsThunk({id:id, usersList:usersList})).unwrap();
            setIsLoading(false);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initialFetch();
    }, [id]);


    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!user) {
        return <p>No user found</p>;
    }

    return (
        <>
        {isLoading ? 
            <p>...loading...</p> : 
            <>

                <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled> 
                <SectionDetails>
                    <ContentDetails>
                        <TextDetails $title>{user.name}</TextDetails>
                        <TextDetails>{user.id}</TextDetails>
                        <ContentText>
                            <ContentTextDetails>
                                <TextDetails $title>Email</TextDetails>
                                <TextDetails>{user.email}</TextDetails>
                            </ContentTextDetails>
                            <ContentTextDetails $right>
                                <TextDetails $title>Contact</TextDetails>
                                <TextDetails>{user.phone}</TextDetails>
                            </ContentTextDetails>
                        </ContentText>
                        <ContentText>
                            <ContentTextDetails>
                                <TextDetails $title>Start Date</TextDetails>
                                <TextDetails>{user.date}</TextDetails>
                            </ContentTextDetails>
                            <ContentTextDetails $right>
                                <TextDetails $title>Status</TextDetails>
                                <TextDetails>{user.status === 'valid' ? <ButtonStyled styled='available'>Valid</ButtonStyled> : <ButtonStyled styled='bookedRed'>Invalid</ButtonStyled>}</TextDetails>
                            </ContentTextDetails>
                        </ContentText>
                        <TextDetails $title>Description</TextDetails>
                        <TextDetails>{user.position.description}</TextDetails>
                    </ContentDetails>
                    <ImageDetails src={user.photo} alt="img User" />
                </SectionDetails>
            </>
        }

        </>
    );
};

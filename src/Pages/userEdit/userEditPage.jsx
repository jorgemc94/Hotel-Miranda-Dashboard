import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, editUser, getUsersStatus, getUsersError } from "../../Features/users/usersSlice";
import { UserDetailsThunk } from "../../Features/users/userDetailsThunk";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FormStyled, ImageFormStyled, InputStyled, LabelStyled, SectionFormStyled, TextareaStyled } from "../../Components/styled/FormStyled";
import { FiArrowLeft } from "react-icons/fi";


export const UserEditPage = () => {
    const { id } = useParams();
    const dispatchRedux = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUser);
    const usersStatus = useSelector(getUsersStatus);
    const usersError = useSelector(getUsersError);
    const [userEdit, setUserEdit] = useState({photo: "", name: "", email: "", phone: "", date: "", status: "", description: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const initialFetch = async () => {
        try {
            await dispatchRedux(UserDetailsThunk(id || '')).unwrap();
            setIsLoading(false);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initialFetch();
    }, [id, dispatchRedux]);

    useEffect(() => {
        if (user) {
            setUserEdit({
                photo: user.photo,
                name: user.name,
                email: user.email,
                phone: user.phone,
                date: user.date,
                status: user.status,
                description: user.position?.description || '',
            });
        }
    }, [user]);

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatchRedux(UserDetailsThunk(id));
        } else if (usersStatus === 'fulfilled') {
            setIsLoading(false);
        } else if (usersStatus === 'rejected') {
            setIsLoading(false);
            setError(usersError);
        }
    },[dispatchRedux, id, usersStatus, usersError])

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!user) {
        return <p>No user found</p>;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserEdit({ ...userEdit, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUser = { ...user, ...userEdit, position: { ...user.position, description: userEdit.description } };
        dispatchRedux(editUser(updatedUser));
        navigate('/users');
    };

    const navigateHandle = () => {
        navigate('/users');
    };

    return (
        <>
            {isLoading ? <p>...Loading</p> : 
            <>
                <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled> 
                <SectionFormStyled>
                    <ImageFormStyled src={userEdit.photo} alt="user photo" />
                    <FormStyled onSubmit={handleSubmit}>
                        <LabelStyled>Name</LabelStyled>
                        <InputStyled name="name" value={userEdit.name} onChange={handleChange} placeholder="Name" />
                        <LabelStyled>Email</LabelStyled>
                        <InputStyled name="email" value={userEdit.email} onChange={handleChange} placeholder="Email" />
                        <LabelStyled>Phone</LabelStyled>
                        <InputStyled name="phone" value={userEdit.phone} onChange={handleChange} placeholder="Phone" />
                        <LabelStyled>Start Date</LabelStyled>
                        <InputStyled name="date" value={userEdit.date} onChange={handleChange} placeholder="Start Date" />
                        <LabelStyled>Status</LabelStyled>
                        <InputStyled name="status" value={userEdit.status} onChange={handleChange} placeholder="Status" />
                        <LabelStyled>Description</LabelStyled>
                        <TextareaStyled name="description" value={userEdit.description} onChange={handleChange} placeholder="Description" />
                    <ButtonStyled styled='send' type="submit">Save Changes</ButtonStyled>
                </FormStyled>
                </SectionFormStyled>
            </>
            }
            
        </>
    );
};

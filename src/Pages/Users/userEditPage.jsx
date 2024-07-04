import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, editUser, addUser, getUsersList } from "../../Features/users/usersSlice";
import { UserDetailsThunk } from "../../Features/users/userDetailsThunk";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FormStyled, ImageFormStyled, InputStyled, LabelStyled, SectionFormStyled, TextareaStyled } from "../../Components/styled/FormStyled";
import { FiArrowLeft } from "react-icons/fi";

export const UserEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatchRedux = useDispatch();
    const user = useSelector(getUser);
    const [userEdit, setUserEdit] = useState({
        id: "",
        photo: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        status: "",
        description: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const usersList = useSelector(getUsersList);

    const isEditPage = Boolean(id);

    useEffect(() => {
        if (isEditPage) {
            const fetchUserDetails = async () => {
                try {
                    await dispatchRedux(UserDetailsThunk({ id: id, usersList: usersList })).unwrap();
                } catch (err) {
                    setError(err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchUserDetails();
        } else {
            setIsLoading(false);
        }
    }, [id, dispatchRedux, isEditPage, usersList]);

    useEffect(() => {
        if (user && isEditPage) {
            setUserEdit({
                id: user.id,
                photo: user.photo,
                name: user.name,
                email: user.email,
                phone: user.phone,
                date: user.date,
                status: user.status,
                description: user.position?.description,
            });
        }
    }, [user, isEditPage]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserEdit({ ...userEdit, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEditPage) {
            const updatedUser = { ...user, ...userEdit, position: { ...user.position, description: userEdit.description } };
            dispatchRedux(editUser(updatedUser));
        } else {
            const newUser = {...userEdit, position: { description: userEdit.description }
            };
            dispatchRedux(addUser(newUser));
        }

        navigate('/users');
    };

    const navigateHandle = () => {
        navigate('/users');
    };

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (isEditPage && !user) {
        return <p>No user found</p>;
    }

    return (
        <>
            {isLoading ? <p>...Loading</p> : 
            <>
                <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled> 
                <SectionFormStyled>
                    <FormStyled onSubmit={handleSubmit}>
                        <ImageFormStyled src={userEdit.photo} alt="user photo" />
                        <InputStyled type="file" accept="image/*" placeholder="Photo" />
                        <LabelStyled>ID</LabelStyled>
                        <InputStyled type="number" name="id" value={userEdit.id} onChange={handleChange} readOnly={isEditPage} placeholder="Id" />
                        <LabelStyled>Name</LabelStyled>
                        <InputStyled type="text" name="name" value={userEdit.name} onChange={handleChange} placeholder="Name" />
                        <LabelStyled>Email</LabelStyled>
                        <InputStyled type="email" name="email" value={userEdit.email} onChange={handleChange} placeholder="Email" />
                        <LabelStyled>Phone</LabelStyled>
                        <InputStyled type="tel" name="phone" value={userEdit.phone} onChange={handleChange} placeholder="Phone" />
                        <LabelStyled>Start Date</LabelStyled>
                        <InputStyled type="date" name="date" value={userEdit.date} onChange={handleChange} placeholder="Start Date" />
                        <LabelStyled>Status</LabelStyled>
                        <InputStyled name="status" value={userEdit.status} onChange={handleChange} placeholder="Status" />
                        <LabelStyled>Description</LabelStyled>
                        <TextareaStyled name="description" value={userEdit.description} onChange={handleChange} placeholder="Description" />
                        <ButtonStyled styled='send' type="submit">{isEditPage ? 'Save Changes' : 'Add User'}</ButtonStyled>
                    </FormStyled>
                </SectionFormStyled>
            </>
            }
        </>
    );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, editUser, addUser, getUsersList } from "../../Features/users/usersSlice";
import { UserDetailsThunk } from "../../Features/users/userDetailsThunk";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FormStyled, ImageFormStyled, InputStyled, LabelStyled, SectionFormStyled, TextareaStyled } from "../../Components/styled/FormStyled";
import { FiArrowLeft } from "react-icons/fi";
import { AppDispatch, RootState } from "../../App/store";
import { User } from "../../types";

export const UserEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatchRedux: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => getUser(state));
    const usersError = useSelector((state: RootState) => state.users.error);
    const usersList = useSelector((state: RootState) => getUsersList(state));
    const [userEdit, setUserEdit] = useState<User>({ id: 0, photo: "", name: "", email: "", phone: "", date: "", status: "", position: { name: "Manager", description: "" }, password: "" });
    const [isLoading, setIsLoading] = useState(true);
    const isEditPage = Boolean(id);

    useEffect(() => {
        const numberId = Number(id);
        const fetchUserDetails = async () => {
            if (isEditPage) {
                try {
                    await dispatchRedux(UserDetailsThunk({ id: numberId, usersList: usersList }));
                } catch (err) {
                    console.log(usersError);
                }
            }
            setIsLoading(false);
        };

        fetchUserDetails();
    }, [id, dispatchRedux, isEditPage, usersList, usersError]);

    useEffect(() => {
        if (user && isEditPage) {
            setUserEdit({
                ...user,
                position: {
                    ...user.position,
                    description: user.position?.description || '',
                }
            });
        }
    }, [user, isEditPage]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserEdit({ ...userEdit, [name]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserEdit({ ...userEdit, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isEditPage) {
            const updatedUser = { ...user, ...userEdit, position: { ...user.position, description: userEdit.position.description } };
            dispatchRedux(editUser(updatedUser));
        } else {
            const newUser = { ...userEdit, position: { description: userEdit.position.description } };
            dispatchRedux(addUser(newUser));
        }
        navigate('/users');
    };

    const navigateHandle = () => {
        navigate('/users');
    };

    return (
        <>
            {isLoading ? <p>...Cargando</p> :
                <>
                    <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled>
                    <SectionFormStyled>
                        <FormStyled onSubmit={handleSubmit}>
                            <ImageFormStyled src={userEdit.photo} alt="user photo" />
                            <InputStyled type="file" accept="image/*" onChange={handleFileChange} placeholder="Photo" />
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
                            <TextareaStyled name="position.description" value={userEdit.position.description} onChange={handleChange} placeholder="Description" />
                            <ButtonStyled styled='send' type="submit">{isEditPage ? 'Save Changes' : 'New User'}</ButtonStyled>
                        </FormStyled>
                    </SectionFormStyled>
                </>
            }
        </>
    );
};

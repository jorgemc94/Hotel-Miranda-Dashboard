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
import { SingleValue } from "react-select";
import { SelectForm } from "../../Components/styled/SelectStyled";

type Params = {
    id: string;
};

export const UserEditPage = () => {
    const { id } = useParams<Params>();
    const navigate = useNavigate();
    const dispatchRedux: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => getUser(state));
    const usersError = useSelector((state: RootState) => state.users.error);
    const usersList = useSelector((state: RootState) => getUsersList(state));
    const [userEdit, setUserEdit] = useState<User>({
        id: 0,
        photo: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        status: "",
        position: { name: "Manager", description: "" },
        password: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const isEditPage = Boolean(id);

    useEffect(() => {
        const numberId = Number(id);
        const fetchUserDetails = async () => {
            if (isEditPage) {
                try {
                    await dispatchRedux(UserDetailsThunk({ id: numberId, usersList }));
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

    const handleSelectChange = (selectedOption: SingleValue<{ value: "Manager" | "Room service" | "Reception" ; label: string }>) => {
        if (selectedOption) {
            setUserEdit(prevState => ({
                ...prevState,
                position: {
                    ...prevState.position,
                    name: selectedOption.value
                }
            }));
        }
    };

    const handleSelectStatusChange = (selectedOption: SingleValue<{ value: "Valid" | "Invalid"; label: string }>) => {
        if (selectedOption) {
            setUserEdit(prevState => ({
                ...prevState,
                status: selectedOption.value
            }));
        }
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

    const optionsActivity = [
        { value: "Manager", label: "Manager" },
        { value: "Room service", label: "Room service" },
        { value: "Reception", label: "Reception" }
    ];

    const optionStatus = [
        { value: "valid", label: "valid" },
        { value: "invalid", label: "invalid" }
    ]

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            return;
        }
        if (isEditPage) {
            const updatedUser = { 
                ...user, 
                ...userEdit, 
                position: { 
                    ...user.position, 
                    name: userEdit.position.name,
                    description: userEdit.position.description 
                } 
            };
            dispatchRedux(editUser(updatedUser));
        } else {
            const newUser: User = { 
                ...userEdit, 
                position: { 
                    name: userEdit.position.name,
                    description: userEdit.position.description 
                },
            };
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
                            <SelectForm
                            name="status"
                            options={optionStatus}
                            value={optionStatus.find(option => option.value === userEdit.status)}
                            onChange={(option) => handleSelectStatusChange(option as SingleValue<{ value: "Valid" | "Invalid" ; label: string }>)} 
                            />
                            <LabelStyled>Description</LabelStyled>
                            <TextareaStyled name="position.description" value={userEdit.position.description} onChange={handleChange} placeholder="Description" />
                            <LabelStyled>Activity</LabelStyled>
                            <SelectForm 
                                name="activity"
                                options={optionsActivity}
                                value={optionsActivity.find(option => option.value === userEdit.position.name)}
                                onChange={(option) => handleSelectChange(option as SingleValue<{ value: "Manager" | "Room service" | "Reception"; label: string }>)} 
                            />
                            <ButtonStyled styled='send' type="submit">{isEditPage ? 'Save Changes' : 'New User'}</ButtonStyled>
                        </FormStyled>
                    </SectionFormStyled>
                </>
            }
        </>
    );
};

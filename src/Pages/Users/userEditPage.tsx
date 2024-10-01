import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, getUsersStatus } from "../../Features/users/usersSlice";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { FormStyled, ImageFormStyled, InputStyled, LabelStyled, SectionFormStyled, TextareaStyled } from "../../Components/styled/FormStyled";
import { FiArrowLeft } from "react-icons/fi";
import { AppDispatch, RootState } from "../../App/store";
import { User } from "../../types";
import { SingleValue } from "react-select";
import { SelectForm } from "../../Components/styled/SelectStyled";
import Swal from 'sweetalert2';
import { FourSquare } from "react-loading-indicators";
import { addUserThunk, updateUserThunk, UserThunk } from "../../Features/users/usersThunk";

export const UserEditPage = () => {
    const userStatus = useSelector((state: RootState) => getUsersStatus(state));
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const dispatchRedux: AppDispatch = useDispatch();
    const user: User = useSelector((state: RootState) => getUser(state));
    const usersError = useSelector((state: RootState) => state.users.error);
    const [userEdit, setUserEdit] = useState<User>({
        photo: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        status: "valid",
        position: { name: "Manager", description: "" },
        password: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const isEditPage = Boolean(id);

    useEffect(() => {
        if (isEditPage) {
            dispatchRedux(UserThunk(id as string));
        } else {
            setIsLoading(false);
        }
    }, [id, dispatchRedux, isEditPage]);

    useEffect(() => {
        if (userStatus === 'pending') {
            setIsLoading(true);
        } else if (userStatus === 'fulfilled' && isEditPage) {
            setUserEdit(user);
            setIsLoading(false);
        } else if (userStatus === 'rejected') {
            setIsLoading(false);
            console.error(usersError);
        }
    }, [userStatus, isEditPage, user, usersError]);

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserEdit({ ...userEdit, [name]: value });
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setUserEdit(prevState => ({
            ...prevState,
            position: {
                ...prevState.position,
                description: value
            }
        }));
    };

    const handleSelectChange = (selectedOption: SingleValue<{ value: "Manager" | "Room service" | "Reception"; label: string }>) => {
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

    const handleSelectStatusChange = (selectedOption: SingleValue<{ value: "valid" | "invalid"; label: string }>) => {
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (isEditPage && user) {
            const updatedUser = { 
                ...user, 
                ...userEdit, 
                position: { 
                    ...user.position, 
                    name: userEdit.position.name,
                    description: userEdit.position.description 
                } 
            };
            await dispatchRedux(updateUserThunk(updatedUser));
            Swal.fire({
                title: "Edit User!",
                text: "Your file has been edited.",
                icon: "success"
            });
        } else if (!isEditPage) {
            const newUser: User = { 
                ...userEdit, 
                position: { 
                    name: userEdit.position.name,
                    description: userEdit.position.description 
                },
            };
            await dispatchRedux(addUserThunk(newUser));
            Swal.fire({
                title: "New User!",
                text: "Your file has been added.",
                icon: "success"
            });
        }
        navigate('/users');
    };

    const navigateHandle = () => {
        navigate('/users');
    };

    return (
        <>
            {isLoading ? <FourSquare color="#32cd32" size="medium" text="" textColor="" /> :
                <>
                    <ButtonStyled styled='pending' onClick={navigateHandle}><FiArrowLeft /></ButtonStyled>
                    <SectionFormStyled>
                        <FormStyled onSubmit={handleSubmit}>
                            <LabelStyled>Photos</LabelStyled>
                            <InputStyled type="text" name="photo" value={userEdit.photo} onChange={(e) => setUserEdit({ ...userEdit, photo: e.target.value })} placeholder="Photo URL"/>
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
                                onChange={(option) => handleSelectStatusChange(option as SingleValue<{ value: "valid" | "invalid"; label: string }>)}
                            />
                            <LabelStyled>Description</LabelStyled>
                            <TextareaStyled 
                                name="description"
                                value={userEdit.position.description} 
                                onChange={handleDescriptionChange} 
                                placeholder="Description" 
                            />
                            <LabelStyled>Activity</LabelStyled>
                            <SelectForm 
                                name="activity"
                                options={optionsActivity}
                                value={optionsActivity.find(option => option.value === userEdit.position.name)}
                                onChange={(option) => handleSelectChange(option as SingleValue<{ value: "Manager" | "Room service" | "Reception"; label: string }>)}
                            />
                            <LabelStyled>Password</LabelStyled>
                            <InputStyled type="password" name="password" value={userEdit.password} onChange={handleChange} placeholder="Password" />
                            <ButtonStyled styled='send' type="submit">{isEditPage ? 'Save Changes' : 'New User'}</ButtonStyled>
                        </FormStyled>
                    </SectionFormStyled>
                </>
            }
        </>
    );
};

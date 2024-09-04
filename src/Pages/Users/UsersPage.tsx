import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { SectionOrder } from "../../Components/styled/OrderStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { TableComponent } from "../../Components/Table/TableComponent";
import { ImageTable, SubtitleTable } from "../../Components/Table/TableStyled";
import { useDispatch, useSelector } from "react-redux";
import { getUsersStatus, getUsersError, getUserList } from "../../Features/users/usersSlice";
import { UsersListThunk, deleteUserThunk } from "../../Features/users/usersThunk";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2'; 
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import { AppDispatch, RootState } from "../../App/store";
import { FourSquare } from "react-loading-indicators";

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const usersStatus = useSelector((state: RootState) => getUsersStatus(state));
    const usersList = useSelector((state: RootState) => getUserList(state));
    const userListError = useSelector((state: RootState) => getUsersError(state));
    const dispatchRedux: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatchRedux(UsersListThunk());
    }, [dispatchRedux]);

    useEffect(() => {
        if (usersStatus === 'idle') {
            setIsLoading(false);
        } else if (usersStatus === 'fulfilled') {
            setIsLoading(false);
            setUsers(usersList);
        } else if (usersStatus === 'rejected') {
            setIsLoading(false);
            setError(userListError);
        }
    }, [usersStatus, userListError, usersList]);

    const columns = [
        { headerColumn: 'Photos', columnsData: 'photo', columnRenderer: (row: User) => <ImageTable styled='users' src={row.photo} alt="User Photo" /> },
        { headerColumn: 'Information', columnsData: 'information', columnRenderer: (row: User) => 
            (
                <>
                    <SubtitleTable>{row.name}</SubtitleTable>
                    <SubtitleTable>{row.email}</SubtitleTable>
                    <SubtitleTable>{row._id}</SubtitleTable>
                </>
            )
        },
        { headerColumn: 'Start Date', columnsData: 'StartDate', columnRenderer: (row: User) => <SubtitleTable>{row.date}</SubtitleTable>},
        { headerColumn: 'Description', columnsData: 'description', columnRenderer: (row: User) => <SubtitleTable>{row.position.description}</SubtitleTable>},
        { headerColumn: 'Contact', columnsData: 'contact', columnRenderer: (row: User) => <SubtitleTable>{row.phone}</SubtitleTable>},
        { headerColumn: 'Status', columnsData: 'status', columnRenderer: (row: User) => (
            row.status === 'valid' ? (
                <ButtonStyled styled='available'>{row.status}</ButtonStyled>
            ) : (
                <ButtonStyled styled='bookedRed'>{row.status}</ButtonStyled>
            )
        )},
        { headerColumn: 'Actions', columnsData: 'actions', columnRenderer: (row: User) => {
            
            if (!row?._id) {
                return <> null </>;
            }

            return (
                <>
                    <RiDeleteBin6Line onClick={(event: MouseEvent) => deleteHandle(event, row._id!)} /> 
                    <CiEdit onClick={() => navigateEditHandle(row._id!)} />
                </>
            )
        }}
    ];

    const deleteHandle = (event: MouseEvent, userID?: string) => {
        event.stopPropagation();

        if (userID === undefined) {
            
            Swal.fire({
                title: "Error",
                text: "User ID is undefined.",
                icon: "error"
            });
            return;
        }
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatchRedux(deleteUserThunk(userID));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                setUsers((prevUsers) => prevUsers.filter(user => user._id !== userID));
            }
        });
    }

    const navigateEditHandle = (userId?: string) => {
        if (userId === undefined) {
            
            Swal.fire({
                title: "Error",
                text: "User ID is undefined.",
                icon: "error"
            });
            return;
        }

        navigate(`/user/edit/${userId}`);
    };

    const sortUsersHandler = (value: string) => {
        let sortedUsers = [...users];

        if (value === 'date') {
            sortedUsers = sortedUsers.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (value === 'name') {
            sortedUsers = sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        }

        setUsers(sortedUsers);
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        sortUsersHandler(value);
    };

    const handleClickAll = () => {
        setUsers(usersList);
    };

    const handleClickActive = () => {
        const filteredUsers = usersList.filter(user => user.status === 'valid');
        setUsers(filteredUsers);
    };

    const handleClickInactive = () => {
        const filteredUsers = usersList.filter(user => user.status !== 'valid');
        setUsers(filteredUsers);
    };

    const navigateNewUserHandle = () => {
        navigate('/user/newuser');
    };

    return (
        <>
            {isLoading ? <FourSquare color="#32cd32" size="medium" text="" textColor="" /> : 
                <>
                    <SectionOrder>
                        <List>
                            <ItemList onClick={handleClickAll}>All Employees</ItemList>
                            <ItemList onClick={handleClickActive}>Active Employee</ItemList>
                            <ItemList onClick={handleClickInactive}>Inactive Employee</ItemList>
                        </List>
                        <ButtonStyled styled='send' onClick={navigateNewUserHandle}>+ New User</ButtonStyled>
                        <SelectStyled onChange={handleSortChange}>
                            <option value='date'>Start Date</option>
                            <option value='name'>Full Name</option>
                        </SelectStyled>
                    </SectionOrder>
                    <TableComponent columns={columns} data={users} detailPage='/user'/>
                </>
            }
        </>  
    );
};

import { SectionOrder } from "../../Components/styled/OrderStyled";
import { ItemList, List } from "../../Components/styled/LinkStyled";
import { SelectStyled } from "../../Components/styled/SelectStyled";
import { ButtonStyled } from "../../Components/styled/ButtonStyled";
import { TableComponent } from "../../Components/Table/TableComponent";
import data from "../../Components/data/users.json";
import { ImageTable, SubtitleTable } from "../../Components/Table/TableStyled";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersStatus, getUsersError, getUsersList, deleteUser } from "../../Features/users/usersSlice";
import { UsersThunk } from "../../Features/users/usersThunk";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2'; 
import { useNavigate } from "react-router-dom";

export const UsersPage = () => {
    const [users, setUsers] = useState(data);
    const usersStatus = useSelector(getUsersStatus);
    const usersList = useSelector(getUsersList);
    const userListError = useSelector(getUsersError);
    const dispatchRedux = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatchRedux(UsersThunk());
        }else if (usersStatus === 'fulfilled') {
            setIsLoading(false);
            setUsers(usersList);
        } else if (usersStatus === 'rejected') {
            setIsLoading(false);
            setError(userListError);
        }
    }, [usersStatus, usersList, userListError, dispatchRedux]);

    const columns = [
        { headerColumn: 'Photos', columnsData: 'photo', columnRenderer: (row) => <ImageTable styled='users' src={row.photo} alt="User Photo" /> },
        { headerColumn: 'Information', columnsData: 'information', columnRenderer: (row) => 
            (
                <>
                    <SubtitleTable>{row.name}</SubtitleTable>
                    <SubtitleTable>{row.email}</SubtitleTable>
                    <SubtitleTable>{row.id}</SubtitleTable>
                </>
            )
        },
        { headerColumn: 'Start Date', columnsData: 'StartDate', columnRenderer: (row) => <SubtitleTable>{row.date}</SubtitleTable>},
        { headerColumn: 'Description', columnsData: 'description', columnRenderer: (row) => <SubtitleTable>{row.position.description}</SubtitleTable>},
        { headerColumn: 'Contact', columnsData: 'contact', columnRenderer: (row) => <SubtitleTable>{row.phone}</SubtitleTable>},
        { headerColumn: 'Status', columnsData: 'status', columnRenderer: (row) => (
            row.status === 'valid' ? (
                <ButtonStyled styled='available'>{row.status}</ButtonStyled>
            ) : (
                <ButtonStyled styled='bookedRed'>{row.status}</ButtonStyled>
            )
        )},
        { headerColumn: 'Actions', columnsData: 'actions', columnRenderer: (row) => {
            return (
                <>
                    <RiDeleteBin6Line onClick={(event) => deleteHandle(event, row.id)} /> <CiEdit onClick={() => navigateEditHandle(row.id)} />
                </>
            )
        }}
    ];

    const deleteHandle = (event, userId) => {
        event.stopPropagation();
        
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
                dispatchRedux(deleteUser(userId)).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    setUsers(users.filter(user => user.id !== userId));
                });
            }
          });
    }

    const navigateEditHandle = (userId) => {
        navigate(`/user/edit/${userId}`);
    };

    const sortUsersHandler = (value) => {
        let sortedUsers = [...users];

        if (value === 'date') {
            sortedUsers = sortedUsers.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (value === 'name') {
            sortedUsers = sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            sortedUsers = sortedUsers.sort((a, b) => a.id - b.id);
        }

        setUsers(sortedUsers);
    };

    const handleSortChange = (event) => {
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
            {isLoading ? <p>...Loading...</p> : 
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
            }
            <TableComponent columns={columns} data={users} detailPage='/user'/>
        </>  
    );
};

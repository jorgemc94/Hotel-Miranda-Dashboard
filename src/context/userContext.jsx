import { createContext, useEffect, useReducer } from "react";

const getInitialState = () => {
    const initialState = localStorage.getItem('auth');
    if (initialState) {
        return JSON.parse(initialState);
    }
    return {
        userName: null,
        userEmail: null,
        isLoggedIn: false
    };
};

const userReducer = (state, action) => {
    let newState = {};
    switch (action.type) {
        case "LOGIN":
            newState = {
                ...state,
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                isLoggedIn: true
            };
            return newState;
        case "LOGOUT":
            newState = {
                ...state,
                userName: null,
                userEmail: null,
                isLoggedIn: false
            };
            return newState;
        case "EDITUSER":
            newState = {
                ...state,
                userName: action.payload.userName,
                userEmail: action.payload.userEmail
            };
            return newState;
        default:
            return { ...state };
    }
};

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, getInitialState());

    useEffect(() => {
        if (state) {
            localStorage.setItem('auth', JSON.stringify(state));
        }
    }, [state]);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

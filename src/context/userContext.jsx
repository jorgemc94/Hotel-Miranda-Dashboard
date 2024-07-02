import { createContext, useEffect, useReducer } from "react";

const getInitialState = () => {
    const initialState = localStorage.getItem('auth');
    if (initialState) {
        return JSON.parse(initialState);
    }
    return {
        name: null,
        email: null,
        isLoggedIn: false
    };
};

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                isLoggedIn: true
            };
        case "LOGOUT":
            return {
                ...state,
                name: null,
                email: null,
                isLoggedIn: false
            };
        case "EDITUSER":
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email
            };
        default:
            return state;
    }
};

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, getInitialState());

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(state));
    }, [state]);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

import React, { createContext, useEffect, useReducer, ReactNode } from "react";

interface UserState {
    name: string | null;
    email: string | null;
    isLoggedIn: boolean;
}

type UserAction =
    | { type: "LOGIN"; payload: { name: string; email: string } }
    | { type: "LOGOUT" }
    | { type: "EDITUSER"; payload: { name: string; email: string } };

const getInitialState = (): UserState => {
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

const userReducer = (state: UserState, action: UserAction): UserState => {
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

export const UserContext = createContext<{
    state: UserState;
    dispatch: React.Dispatch<UserAction>;
} | null>(null);

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

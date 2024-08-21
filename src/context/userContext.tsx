import React, { createContext, useEffect, useReducer, ReactNode, useContext } from "react";

interface UserState {
    name: string | null;
    email: string | null;
    isLoggedIn: boolean;
}

interface Login {
    type: 'LOGIN';
    payload: {
        name: string;
        email: string;
    };
}

interface Logout {
    type: 'LOGOUT';
}

interface EditUser {
    type: 'EDITUSER';
    payload: {
        name?: string;
        email?: string;
    };
}

type Action = Login | Logout | EditUser;

const getInitialState = (): UserState => {
    const initialState = localStorage.getItem('auth');
    if (initialState) {
        return JSON.parse(initialState) as UserState;
    }
    return {
        name: null,
        email: null,
        isLoggedIn: false,
    };
};

const userReducer = (state: UserState, action: Action): UserState => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                isLoggedIn: true,
            };
        case "LOGOUT":
            return {
                ...state,
                name: null,
                email: null,
                isLoggedIn: false,
            };
        case "EDITUSER":
            return {
                ...state,
                name: action.payload.name ?? state.name,
                email: action.payload.email ?? state.email,
            };
        default:
            return state;
    }
};

export const UserContext = createContext<{
    state: UserState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};

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
import React, { useContext, useState, FormEvent } from "react";
import { LoginForm, TitleForm, Form, Label, Input, ButtonForm, LogoForm, AccessForm, TextError} from "./LoginStyled";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const LoginPage: React.FC = () => {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext must be used within a UserContextProvider");
    }
    const { dispatch } = userContext;
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (event.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
        const password = (event.target as HTMLFormElement).elements.namedItem('password') as HTMLInputElement;

        if (email.value === 'jorgemc1294@gmail.com' && password.value === '12345') {
            dispatch({ type: 'LOGIN', payload: { name: 'Jorge', email: 'jorgemc1294@gmail.com' } });
            navigate('/');
        } else {
            setError('Incorrect username or password');
        }
    }

    return (
        <LoginForm>
            <LogoForm src="src/assets/icon.png" alt="logo" />
            <TitleForm>Login</TitleForm>
            <AccessForm>Email: jorgemc1294@gmail.com Password: 12345</AccessForm>
            {error && <TextError>{error}</TextError>}
            <Form onSubmit={handleSubmit}>
                <Label>Email</Label>
                <Input type="text" name="email" id="email" placeholder="jorgemc1294@gmail.com"></Input>
                <Label>Password</Label>
                <Input type="password" name="password" id="password" placeholder="12345"></Input>
                <ButtonForm type="submit">SEND</ButtonForm>
            </Form>
        </LoginForm>
    );
}


import React, { useContext, useState, FormEvent } from "react";
import { LoginForm, TitleForm, Form, Label, Input, ButtonForm, LogoForm, AccessForm, TextError } from "./LoginStyled";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { login } from "../../Features/callAPI";

export const LoginPage: React.FC = () => {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext must be used within a UserContextProvider");
    }
    const { dispatch } = userContext;
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (event.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
        const password = (event.target as HTMLFormElement).elements.namedItem('password') as HTMLInputElement;

        try {
            const user = await login({ email: email.value, password: password.value });
            dispatch({ type: 'LOGIN', payload: { password: user.password, email: user.email, name: user.name, photo: user.photo } });
            navigate('/');
        } catch (error) {
            setError('Incorrect username or password');
        }
    }

    return (
        <LoginForm>
            <LogoForm src="../icon.png" alt="logo" />
            <TitleForm>Login</TitleForm>
            <AccessForm>Email:jorgemc1294@gmail.com Password:12345</AccessForm>
            {error && <TextError>{error}</TextError>}
            <Form onSubmit={handleSubmit}>
                <Label>Email</Label>
                <Input type="text" name="email" id="email" placeholder="jorgemc1294@gmail.com" required />
                <Label>Password</Label>
                <Input type="password" name="password" id="password" placeholder="12345" required />
                <ButtonForm type="submit">SEND</ButtonForm>
            </Form>
        </LoginForm>
    );
}

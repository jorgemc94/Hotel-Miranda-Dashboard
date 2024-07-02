import { useContext, useState } from "react";
import { LoginForm, TitleForm, Form, Label, Input, ButtonForm, LogoForm, AccessForm } from "./LoginStyled";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const LoginPage = () => {
    const { dispatch } = useContext(UserContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        if (email === 'jorgemc1294@gmail.com' && password === '12345') {
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Label>Email</Label>
                <Input type="text" name="email" placeholder="jorgemc1294@gmail.com"></Input>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="12345"></Input>
                <ButtonForm type="submit">SEND</ButtonForm>
            </Form>
        </LoginForm>
    );
}


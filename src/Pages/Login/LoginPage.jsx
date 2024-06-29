import { LoginForm, TitleForm, Form, Label, Input, ButtonForm, LogoForm, AccessForm } from "./LoginStyled"
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

    const email = 'jorgemc1294@gmail.com';
    const password = '12345';
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === event.target.email.value && password === event.target.password.value) {
            localStorage.setItem('isLoggedIn', true);
            navigate('/');
        } else {
            alert('Correo o contraseña incorrectos');
        }
    }

    return (
        <LoginForm>
            <LogoForm src="src/assets/icon.png" alt="logo" />
            <TitleForm>Login</TitleForm>
            <AccessForm>Email: jorgemc1294@gmail.com Password: 12345</AccessForm>
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


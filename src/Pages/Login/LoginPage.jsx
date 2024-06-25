import { useNavigate } from "react-router-dom";
import { LoginForm, TitleForm, Form, Label, Input, ButtonForm, LogoForm, AccessForm } from "./LoginStyled"

export const LoginPage = () => {

    const navigate = useNavigate();

    const HandlerLogin = (event) => {
        event.preventDefault();
        let email = 'jorgemc1294@gmail.com';
        let password = '12345';

        if (email === event.target.email.value && password === event.target.password.value) {
            localStorage.setItem('login', 'true');
            navigate('/');
        } else {
            alert('Invalid login credentials');
        }
    }

    return (
        <LoginForm>
            <LogoForm src="src/assets/icon.png" alt="logo" />
            <TitleForm>Login</TitleForm>
            <AccessForm>Email: jorgemc1294@gmail.com Password: 12345</AccessForm>
            <Form onSubmit={HandlerLogin}>
                <Label>Email</Label>
                <Input type="text" name="email" placeholder="jorgemc1294@gmail.com"></Input>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="12345"></Input>
                <ButtonForm type="submit">SEND</ButtonForm>
            </Form>
        </LoginForm>
    );
}


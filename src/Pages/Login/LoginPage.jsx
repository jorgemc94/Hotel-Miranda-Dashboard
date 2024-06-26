import { LoginForm, TitleForm, Form, Label, Input, ButtonForm, LogoForm, AccessForm } from "./LoginStyled"

export const LoginPage = () => {



    return (
        <LoginForm>
            <LogoForm src="src/assets/icon.png" alt="logo" />
            <TitleForm>Login</TitleForm>
            <AccessForm>Email: jorgemc1294@gmail.com Password: 12345</AccessForm>
            <Form>
                <Label>Email</Label>
                <Input type="text" name="email" placeholder="jorgemc1294@gmail.com"></Input>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="12345"></Input>
                <ButtonForm type="submit">SEND</ButtonForm>
            </Form>
        </LoginForm>
    );
}


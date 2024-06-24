import { LoginForm, TitleForm, Form, Label, Input, ButtonForm, LogoForm, AccessForm } from "./LoginStyled"

export const LoginPage = () => {

    

    return (
        <LoginForm>
            <LogoForm img src="src/assets/icon.png" alt="logo" ></LogoForm>
            <TitleForm>Login</TitleForm>
            <AccessForm>Email: jorgemc1294@gmail.com Password: 12345</AccessForm>
            <Form>
                <Label>Email</Label>
                <Input type="text" name="user" placeholder="jorgemc1294@gmail.com"></Input>
                <Label>Password</Label>
                <Input type="password" placeholder="12345"></Input>
                <ButtonForm>SEND</ButtonForm>
            </Form>
        </LoginForm>
    )
}


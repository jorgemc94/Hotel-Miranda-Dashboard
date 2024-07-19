import styled from "styled-components";

export const LoginForm = styled.section`
    background-color: #FFF;
    width: 50%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px; 
    padding: 2em;
    position: absolute;
    top: 8%;
    left: 25%;
`;

export const LogoForm = styled.img `
    width: 5.5em;
    heogth: 5.5em;
    display: block;
    margin: 0 auto;
`

export const TitleForm = styled.h1 `
    font-size: 2.5em;
    weight: 600;
    text-align: center;
`;

export const AccessForm = styled.p `
    text-align: center;
    font-size: 1em;
`

export const Form = styled.form`
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Label = styled.label`
    font-size: 1.5em;
    weight: 400;
    padding-bottom: 1.2em;
    padding-left : 4.7em;
    align-self: flex-start;
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Input = styled.input`
    width: 70%;
    padding: 1em;
    background-color: transparent;
    font-size: 1.3em;
    color: #222;
    margin-bottom: 1em;
`;

export const ButtonForm = styled.button`
    background-color: #135846;
    color: #FFF;
    padding: 1em 2em;
    font-size: 1.5em;
    cursor: pointer;
    border-radius: 1em;
    width: 30%;
    margin-top: 1em;
    border: none;
    align-self: flex-end;
    margin-right: 4.8em;
`;

export const TextError = styled.p`
    color: red;
`
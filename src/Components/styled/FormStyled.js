import styled from "styled-components";

export const SectionFormStyled = styled.section `
    background-color: #FFF;
    width: 50%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px; 
    padding: 2em;
    position: absolute;
    top: 20%;
    left: 32%;
`

export const ImageFormStyled = styled.img `
    width: 10em;
    height: 10em;
`

export const FormStyled = styled.form `
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LabelStyled = styled.label `
    font-size: 1.5em;
    weight: 400;
    padding-bottom: 1.2em;
    align-self: flex-start;
    padding-left: 3.5em;
    color: #799283;
`

export const InputStyled = styled.input`
    width: 70%;
    padding: 1em;
    background-color: #F8F8F8;
    font-size: 1.3em;
    color: #222;
    margin-bottom: 1em;
    border: none;
    border-bottom: 1px solid #212121;
`;

export const TextareaStyled = styled.textarea `
    background-color: #F8F8F8;
    font-size: 1.3em;
    color: #222;
    width: 75%;
    height: 7em;
    margin-bottom: 2em;
`
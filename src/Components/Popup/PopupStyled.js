import styled from "styled-components";



export const PopupContent = styled.dialog `
    background-color: #FFF;
    width: 30%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px; 
    padding: 2em;
    position: absolute;
    top: 35%;
    left: 15%;
    display: ${props => props.$inactive ? 'none' : 'block'};
    border: none;
`

export const PopupForm = styled.form `
    width:100%
`

export const PopupInput = styled.input `
    width: 93%;
    padding: 0.5em;
    background-color: #F8F8F8;
    font-size: 1.3em;
    color: #222;
    margin-bottom: 1em;
    border:none;
`

export const PopupLabel = styled.label `
    font-size: 1.5em;
    weight: 400;
    padding-bottom: 1.2em;
`

export const PopupButtonContent = styled.div `
    display: flex;
    justify-content: space-around;
`

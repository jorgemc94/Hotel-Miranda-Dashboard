import styled from "styled-components";

export const KpisSection = styled.section `
    width: 100%;
    display: flex;
    gap:2em;
`

export const KpisArticle = styled.article `
    width: 20%;
    display: flex;
    box-shadow: 0px 4px 4px #00000005;
    background-color: #FFF;
    padding: 2em;
    align-items: center;
`

export const KpisText = styled.div `
    padding-left: 1.5em;
`

export const KpisTextDetails = styled.p `
    color: ${props => props.$number ? '#393939' : '#787878'};
    font-size: ${props => props.$number ? '1.875em' : '0.875em'};
    margin: 0;
`
import styled from "styled-components";


export const SectionDetails = styled.section `
    width: 100%;
    backgroun-color: #FFF;
    display: grid;
    grid-template-columns: 50% 50%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px; 
    border: none;
    border-radius: 2em;
    margin-top: 2em;
`

export const ContentDetails = styled.div `
    padding: 2em;
`

export const TextDetails = styled.p `
    color: ${props => props.$title ? '#222' : '#799283'};
    font-size: ${props => props.$title ? '1.5em' : '1.2em'};
    margin: 0;
`

export const ContentText = styled.div `
    width: 100%;
    display: flex;
    padding-bottom: 1.5em;
`

export const ContentTextDetails = styled.div `
    width:100%;
    text-align: ${props => props.$right ? 'right' : 'left'}
`

export const ImageDetails = styled.img `
    width: 100%;
    height: 100%;
`

export const ContentBottom = styled.div `
    display:flex;
    gap: 2em;
`


import styled from "styled-components";


export const Nav = styled.nav `
    width: 100%;
    background-color: #FFF;
    display: flex;
    align-content: center;
    
`

export const Menu = styled.div `
    width:20%;
    display: ${props => props.$disable ? 'none' : 'block'};
    padding: 1em;
    align-content:center;
    box-shadow: 13px 3px 40px #00000005;
`
export const LogoMenu = styled.div `
    display: flex;
    
`

export const ImageMenu = styled.img `
    width: 3em;
`

export const TextMenu = styled.div `
    display: flex;
    flex-direction: column;
    padding-left: 1em;
`

export const TextLogo = styled.span `
    font-size: ${props => props.$title ? '1.5em' : '0.6em'};
    font-weight: ${props => props.$title ? 700 : 400};

`

export const ContentNavbar = styled.div `
    width:100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
`

export const Title = styled.div `
    padding: 1em;
    padding-left: 2em;
    
`

export const TitleText = styled.h1 `
    color: #262626;
    font-size: 1.75em;
    font-weight: 600;
    display: inline-block;
    padding-left: 1em
`

export const Icons = styled.div `
    display: flex;
    gap: 2em;
    justify-content: flex-end;
    padding-right: 2em;
    align-items: center;
`
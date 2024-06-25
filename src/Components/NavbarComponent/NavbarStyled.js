
import styled from "styled-components";


export const Nav = styled.div `
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: grid;
    grid-template:
        "menu header" 0.01fr
        "menu content" 1fr / 20% 80%;
`

export const Menu = styled.div `
    grid-area: menu;
    width: 100%;
    padding: 0rem;
    margin: 0rem;
    display: ${props => props.$disable ? 'none' : 'block'};
    box-shadow: 13px 3px 40px #00000005;
    background-color: #FFF;
`

export const MenuLogo = styled.div `
    display: flex;
    justify-content: center;
    padding-top: 1.5em;
`

export const ImageMenu = styled.img`
    width: 3em;
`;

export const TextMenu = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1em;
`;

export const TextLogo = styled.span`
    font-size: ${props => props.$title ? '1.5em' : '0.6em'};
    font-weight: ${props => props.$title ? 700 : 400};
`;

export const Navigation = styled.div `
    display: flex;
    flex-direction: column;
    margin: 2em 0em;
    color: #799283;
    padding-left: 3.5em;
`

export const NavigationLink = styled.div `
    display: flex;
    align-items: center;
    padding-left: 3.5em;
    cursor: pointer;
    margin-bottom: 2.5em;
    color: ${props => props.$selected ? '#E23428' : 'inherit'};
    border-left:  2px ${props => props.$selected ? '#E23428' : 'inherit'} solid;
    p {
        margin: 0;
        font-size: 1.125em;
    }
    
`;

export const User = styled.div `
    width: 80%;
    margin: 0 auto;
    text-align: center;
    box-shadow: 0px 20px 30px #00000014;
    padding: 1em 0em;
`

export const UserImg = styled.img `
    width: 4.375em;
    height: 4.375em;
    transform: translateY(-25%);
`

export const UserName = styled.p `
    color: #393939;
    color: ${props => props.$title ? '#393939' : '#B2B2B2;'};
    font-size: ${props => props.$title ? '1em' : '0.75em;'};
    margin:0;
    padding-bottom:1.2em;
`

export const UserButton = styled.button `
    background-color: #EBF1EF;
    color: #135846;
    margin-bottom: 1.5em;
    padding: 1em 3em;
    border: none;
    border-radius: 0.8px;
    cursor: pointer;

`

export const Footer = styled.div `
    text-align: center;
    margin-top: 3em;
`

export const TitleFooter = styled.p `
    color: #212121;
    font-weight: 600;

`

export const SubtitleFooter = styled.p `
    color: #799283;
    font-size: 0.875em;
    font-weight: 300;
    padding-bottom: 3em;
`

export const Header = styled.div `
    grid-area: header;
    grid-column: ${props => props.$menuOpen ? 'span 1' : 'span 2'};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 91px;
    box-shadow: 0px 3px 10px #00000005;
    background-color: #FFF;
`

export const TextHeader = styled.div`
    padding: 1em;
    padding-left: 2em;
`;

export const TitleText = styled.h1`
    color: #262626;
    font-size: 1.75em;
    font-weight: 600;
    display: inline-block;
    padding-left: 1em;
`;

export const IconsHeader = styled.div`
    display: flex;
    gap: 2em;
    justify-content: flex-end;
    padding-right: 2em;
    align-items: center;
`;
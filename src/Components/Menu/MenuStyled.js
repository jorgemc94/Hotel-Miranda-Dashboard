import styled from "styled-components";


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

export const MenuFooter = styled.div `
    text-align: center;
    margin-top: 3em;
`

export const MenuFooterTitle = styled.p `
    color: #212121;
    font-weight: 600;

`

export const MenuFooterSubtitle = styled.p `
    color: #799283;
    font-size: 0.875em;
    font-weight: 300;
    padding-bottom: 3em;
`
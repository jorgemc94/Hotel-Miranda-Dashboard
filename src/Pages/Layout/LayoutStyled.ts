import styled from "styled-components";

export const LayoutGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template:
        "menu header" 0.01fr
        "menu content" 1fr / 20% 80%;
`;

export const LayoutMenu = styled.div<{ $disable: boolean }>`
    grid-area: menu;
    width: 100%;
    padding: 0rem;
    margin: 0rem;
    display: ${({ $disable }) => ($disable ? 'none' : 'block')};
    box-shadow: 13px 3px 40px #00000005;
    background-color: #FFF;
`;

export const LayoutHeader = styled.div<{ $menuOpen: boolean }>`
    grid-area: header;
    grid-column: ${({ $menuOpen }) => ($menuOpen ? 'span 2' : 'span 1')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 91px;
    box-shadow: 0px 3px 10px #00000005;
    background-color: #FFF;
`;

export const LayoutContent = styled.section<{ $menuOpen: boolean }>`
    grid-area: content;
    grid-column: ${({ $menuOpen }) => ($menuOpen ? 'span 2' : 'span 1')};
    min-height: calc(100% - 91px);
    padding: 2em;
`;

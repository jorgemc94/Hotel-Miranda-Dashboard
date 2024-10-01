import styled from "styled-components";

export const CardComment = styled.article`
    background-color: #FFFFFF;
    border-radius: 1.25em;
    border: 1px solid #EBEBEB;
    padding: 1.5em;
    box-shadow: 0px 2px 8px rgba(204, 204, 204, 0.5);
    color: #4E4E4E;
`;

export const DetailsComment = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const ImagenComment = styled.img`
    width: 3.5em;
    height: 3.5em;
`;

export const DateComment = styled.div`
    display: flex;
`;

interface NameCommentProps {
    $name?: string;
}

export const NameComment = styled.p<NameCommentProps>`
    color: ${props => (props.$name == 'true' ? '#262626' : '#799283')};
    font-size: ${props => (props.$name == 'true' ? '1em' : '0.875em')};
`;

export const IconsComment = styled.div`
    display: flex;
    align-content: end;
    gap: 1em;
`;

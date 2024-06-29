import styled from "styled-components";

export const TableStyled = styled.table `
    width: 100%;
    background-color: #FFF;
    color: #393939;
    margin-top: 3em;
    padding: 1em;
`

export const SubtitleTable = styled.p `
    color: ${props => props.$subtitle ? '#799283' : '#393939'};
    font-size: ${props => props.$subtitle ? '0.875em' : '1em'};
`

export const PriceTable = styled.span `
    color: ${props => props.$price ? '#212121;' : '#799283'};
    font-size: ${props => props.$price ? '1em' : '1.2emem'};
`

export const NameTable = styled.div `
    display: flex;

`

export const ContentTable = styled.td `
    padding: 0.5em 1em;
`

export const ImageTable = styled.img `
    text-align: center;
    ${props => {
        switch (props.styled) {
            case 'rooms':
                return `
                    width: 9.375em;
                    height: 4.8125em;
                `
            case 'users':
                return `
                    height: 5.5em;
                    width: 5.5em;
                `
            case 'bookings':
                return `
                    height: 2.8125em;
                    width: 2.8125em;
                `  
        }
    }
        
    }
`

export const PaginationTable = styled.div `
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 2em;
    margin-top: 1em;
`
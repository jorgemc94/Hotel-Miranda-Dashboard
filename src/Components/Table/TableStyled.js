import styled from "styled-components";

export const Table = styled.table `
    width: 100%;
    background-color: #FFF;
    color: #393939;
`

export const SubtitleTable = styled.p `
    color: ${props => props.$subtitle ? '#799283' : '#393939'};
    font-size: ${props => props.$subtitle ? '0.875em' : '1em'};
`

export const PriceTable = styled.span `
    color: ${props => props.$price ? '#212121;' : '#799283'};
    font-size: ${props => props.$price ? '1em' : '0.875em'};
`

export const NameTable = styled.div `
    display: flex;

`

export const ImageTable = styled.img `
    ${props => {
        switch (props.styled) {
            case 'rooms':
                return `
                    height: 9.375em;
                    width: 4.8125em;
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
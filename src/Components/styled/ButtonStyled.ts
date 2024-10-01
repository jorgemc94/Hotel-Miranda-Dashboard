import styled from "styled-components";

export const ButtonStyled = styled.button <{styled: 'send' | 'edit' | 'available' | 'bookedRed' | 'progress' | "canceled" | "pending" | "booked" | "viewBorder" | "view" | "refund" | "amenity"}> `
    font-size: 1rem;
    padding: 1em 0.6em;
    border-radius: 0.4em;
    cursor: pointer;
    border: none;
    height: 3em;

    ${props => {
        switch (props.styled) {
            case 'send':
                return `
                    background-color : #135846;
                    color: #FFF;
                    width: 10em;
                `
            case 'edit':
                return `
                    background-color : #EBF1EF;
                    color: #135846;
                    width: 9em;
                `
            case 'available':
                return `
                    background-color : #5AD07A;
                    color: #FFF;
                    width: 7.815em;
                `
            case 'bookedRed':
                return `
                    background-color : #E23428;
                    color: #FFF;
                    width: 7.815em;
                `
            case 'progress': 
                return `
                    background-color : #FF9C3A;
                    color: #FFF;
                    width: 7.815em;
                `
            case 'viewBorder':
                return `
                    background-color: transparent;
                    color: #799283;
                    border: 1px solid #799283;
                    width: 9em;
                `
            case 'view':
                return `
                    background-color: #EEF9F2;
                    color: #212121;
                    width: 9em;
                `
            case 'refund': 
                return `
                    background-color: #FFEDEC;
                    color: #E23428;
                    width: 6.8125em;
                `
            case 'booked': 
                return `
                    background-color: #E23428;
                    color: #FFF;
                    width: 6.8125em;
                `
            case 'pending': 
                return `
                    background-color: #E2E2E2;
                    color: #6D6D6D;
                    width: 6.8125em;
                `
            case 'canceled': 
                return `
                    background-color: #575757;
                    color: #BEBEBE;
                    width: 6.8125em;
                `
        }
    }
        
    }
`
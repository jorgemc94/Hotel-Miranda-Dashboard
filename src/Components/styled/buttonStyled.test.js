import { ButtonStyled } from './ButtonStyled';
import "jest-environment-jsdom";
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';


    test('renders with prev style', () => {
        render(<ButtonStyled styled="view">Prev</ButtonStyled>);
        const button = screen.getByText('Prev');
        expect(button).toHaveStyle('background-color: #EEF9F2');
        expect(button).toHaveStyle('color: #212121');
        expect(button).toHaveStyle('width: 9em');
    });
    test('renders with next style', () => {
        render(<ButtonStyled styled="viewBorder">Next</ButtonStyled>);
        const button = screen.getByText('Next');
        expect(button).toHaveStyle('background-color: transparent');
        expect(button).toHaveStyle('color: #799283');
        expect(button).toHaveStyle('border: 1px solid #799283');
        expect(button).toHaveStyle('width: 9em');
    });

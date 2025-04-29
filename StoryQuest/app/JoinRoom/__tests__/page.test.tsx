import React from 'react';
import { render, screen } from '@testing-library/react';
import JoinRoomPage from '../../JoinRoom/page';
import Link from 'next/link';

jest.mock('next/link', () => {
    return jest.fn(({ href, children }) => <a href={href} data-testid="mock-link">{children}</a>);
});

describe('JoinRoomPage', () => {
    it('renders the page elements', () => {
        render(<JoinRoomPage />);
        expect(screen.getByText('GRAB A TABLET AND FOLLOW THE PICTURES BELLOW')).toBeInTheDocument();
        expect(screen.getByText('Scan Below')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Capture' })).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument(); // Exit button (should use the mocked Link)
        expect(screen.queryByText('Processing QR code...')).toBeNull();
        expect(screen.queryByText('No QR code detected. Please position the code clearly and try again.')).toBeNull();
    });
});
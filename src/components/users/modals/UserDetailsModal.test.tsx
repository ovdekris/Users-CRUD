import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserDetailsModal } from './UserDetailsModal';
import type { User } from '../../../types/user';

const mockUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '1-770-736-8031 x56442',
    website: 'example.com',
    address: {
        street: 'Main Street',
        suite: 'Apt 1',
        city: 'New York',
        zipcode: '12345-6789',
        geo: { lat: '0', lng: '0' },
    },
    company: {
        name: 'Test Company',
        catchPhrase: 'Testing is fun',
        bs: 'test business',
    },
};

describe('UserDetailsModal', () => {
    it('should not render when isOpen is false', () => {
        render(
            <UserDetailsModal
                user={mockUser}
                isOpen={false}
                onClose={vi.fn()}
            />
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should not render when user is null', () => {
        render(
            <UserDetailsModal
                user={null}
                isOpen={true}
                onClose={vi.fn()}
            />
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true and user is provided', () => {
        render(
            <UserDetailsModal
                user={mockUser}
                isOpen={true}
                onClose={vi.fn()}
            />
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should display user name as title', () => {
        render(
            <UserDetailsModal
                user={mockUser}
                isOpen={true}
                onClose={vi.fn()}
            />
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display all user details', () => {
        render(
            <UserDetailsModal
                user={mockUser}
                isOpen={true}
                onClose={vi.fn()}
            />
        );

        expect(screen.getByText('johndoe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('1-770-736-8031 x56442')).toBeInTheDocument();
        expect(screen.getByText('example.com')).toBeInTheDocument();
        expect(screen.getByText('Test Company')).toBeInTheDocument();
        expect(screen.getByText('"Testing is fun"')).toBeInTheDocument();
    });

    it('should display address correctly', () => {
        render(
            <UserDetailsModal
                user={mockUser}
                isOpen={true}
                onClose={vi.fn()}
            />
        );

        expect(screen.getByText(/Main Street, Apt 1/)).toBeInTheDocument();
        expect(screen.getByText(/New York 12345-6789/)).toBeInTheDocument();
    });

    it('should call onClose when clicking Close button', () => {
        const onClose = vi.fn();
        render(
            <UserDetailsModal
                user={mockUser}
                isOpen={true}
                onClose={onClose}
            />
        );

        fireEvent.click(screen.getByText('Close'));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when clicking backdrop', () => {
        const onClose = vi.fn();
        render(
            <UserDetailsModal
                user={mockUser}
                isOpen={true}
                onClose={onClose}
            />
        );

        const backdrop = screen.getByRole('dialog').parentElement;
        fireEvent.click(backdrop!);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when pressing Escape key', () => {
        const onClose = vi.fn();
        render(
            <UserDetailsModal
                user={mockUser}
                isOpen={true}
                onClose={onClose}
            />
        );

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should display section labels', () => {
        render(
            <UserDetailsModal
                user={mockUser}
                isOpen={true}
                onClose={vi.fn()}
            />
        );

        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Phone')).toBeInTheDocument();
        expect(screen.getByText('Website')).toBeInTheDocument();
        expect(screen.getByText('Address')).toBeInTheDocument();
        expect(screen.getByText('Company')).toBeInTheDocument();
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DeleteUserModal } from './DeleteUserModal';
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

describe('DeleteUserModal', () => {
    it('should not render when isOpen is false', () => {
        render(
            <DeleteUserModal
                user={mockUser}
                isOpen={false}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
            />
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should not render when user is null', () => {
        render(
            <DeleteUserModal
                user={null}
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
            />
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true and user is provided', () => {
        render(
            <DeleteUserModal
                user={mockUser}
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
            />
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should display user name in confirmation message', () => {
        render(
            <DeleteUserModal
                user={mockUser}
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
            />
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display "Delete user" title', () => {
        render(
            <DeleteUserModal
                user={mockUser}
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
            />
        );

        expect(screen.getByText('Delete user')).toBeInTheDocument();
    });

    it('should call onClose when clicking Cancel button', () => {
        const onClose = vi.fn();
        render(
            <DeleteUserModal
                user={mockUser}
                isOpen={true}
                onClose={onClose}
                onConfirm={vi.fn()}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onConfirm when clicking Delete button', () => {
        const onConfirm = vi.fn();
        render(
            <DeleteUserModal
                user={mockUser}
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={onConfirm}
            />
        );

        fireEvent.click(screen.getByText('Delete'));

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when clicking backdrop', () => {
        const onClose = vi.fn();
        render(
            <DeleteUserModal
                user={mockUser}
                isOpen={true}
                onClose={onClose}
                onConfirm={vi.fn()}
            />
        );

        const backdrop = screen.getByRole('dialog').parentElement;
        fireEvent.click(backdrop!);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when pressing Escape key', () => {
        const onClose = vi.fn();
        render(
            <DeleteUserModal
                user={mockUser}
                isOpen={true}
                onClose={onClose}
                onConfirm={vi.fn()}
            />
        );

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should disable buttons when isLoading is true', () => {
        render(
            <DeleteUserModal
                user={mockUser}
                isOpen={true}
                isLoading={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
            />
        );

        expect(screen.getByText('Cancel')).toBeDisabled();
        expect(screen.getByText('Delete')).toBeDisabled();
    });
});

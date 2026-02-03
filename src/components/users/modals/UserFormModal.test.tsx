import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { UserFormModal } from './UserFormModal';
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

describe('UserFormModal', () => {
    it('should not render when isOpen is false', () => {
        render(
            <UserFormModal isOpen={false} onClose={vi.fn()} onSubmit={vi.fn()}/>
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
        render(
            <UserFormModal isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()}/>
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should display "Add user" title when no user is provided', () => {
        render(
            <UserFormModal isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()}/>
        );

        expect(screen.getByText('Add user')).toBeInTheDocument();
    });

    it('should display "Edit user" title when user is provided', () => {
        render(
            <UserFormModal user={mockUser} isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()}/>
        );

        expect(screen.getByText('Edit user')).toBeInTheDocument();
    });

    it('should populate form fields with user data in edit mode', () => {
        render(
            <UserFormModal user={mockUser} isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()}/>
        );

        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('johndoe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('example.com')).toBeInTheDocument();
    });

    it('should call onClose when clicking Cancel button', async () => {
        const onClose = vi.fn();
        render(
            <UserFormModal isOpen={true} onClose={onClose} onSubmit={vi.fn()}/>
        );

        fireEvent.click(screen.getByText('Cancel'));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when clicking backdrop', async () => {
        const onClose = vi.fn();
        render(
            <UserFormModal isOpen={true} onClose={onClose} onSubmit={vi.fn()}/>
        );

        const backdrop = screen.getByRole('dialog').parentElement;
        fireEvent.click(backdrop!);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when pressing Escape key', async () => {
        const onClose = vi.fn();
        render(
            <UserFormModal isOpen={true} onClose={onClose} onSubmit={vi.fn()}/>
        );

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onSubmit when form is submitted with empty fields', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(
            <UserFormModal isOpen={true} onClose={vi.fn()} onSubmit={onSubmit}/>
        );

        const submitButton = screen.getByText('Add');
        await user.click(submitButton);

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalled();
        });
    });

    it('should display Save button in edit mode', () => {
        render(
            <UserFormModal user={mockUser} isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()}/>
        );

        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('should disable buttons when isLoading is true', () => {
        render(
            <UserFormModal isOpen={true} isLoading={true} onClose={vi.fn()} onSubmit={vi.fn()}/>
        );

        expect(screen.getByText('Cancel')).toBeDisabled();
        expect(screen.getByText('Add')).toBeDisabled();
    });
});

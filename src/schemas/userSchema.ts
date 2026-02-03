import { z } from 'zod';
import type { UserFormData } from '../types/user';

export const userSchema = z.object({
    name: z.string().min(2, 'Name should have at least 2 characters').max(50, 'Maximum length is 50 characters'),

    username: z.string().min(2, 'Username should have at least 2 characters').max(30, 'Maximum length is 30 characters'),

    email: z.string().email('Enter a valid email address'),

    phone: z.string().regex(
        /^\d{1}-\d{3}-\d{3}-\d{4}( x\d+)?$/,
        'Phone number must be in format: 1-770-736-8031 x56442'
    ),

    website: z.string().min(1, 'Website is required').regex(
            /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$|^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/,
            'Enter a valid website format e.g. example.com'
        ),

    address: z.object({
        street: z.string().min(1, 'Street is required'),
        suite: z.string().min(1, 'Apartment number is required'),
        city: z.string().min(1, 'City is required'),
        zipcode: z.string().regex(
            /^\d{5}-\d{4}$/,
            'Postal code must be in format: 92998-3874'
        ),

        geo: z.object({
            lat: z.string(),
            lng: z.string(),
        }),
    }),

    company: z.object({
        name: z.string().min(1, 'Company name is required'),
        catchPhrase: z.string().min(1, 'Company slogan is required'),
        bs: z.string().min(1, 'Business description is required'),
    }),
}) satisfies z.ZodType<UserFormData>;

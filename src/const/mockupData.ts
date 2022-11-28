import { User } from '../store/types';

export const users: User[] = [
    {
        id: '1',
        fullname: 'Joseph Joestar',
        password: 'test',
        email: 'test',
        profession: 'web developer',
        favouritePizza: 'Margerita',
        consent: false,
    },

    {
        id: '2',
        fullname: 'Ralph Buda',
        password: 'abcde',
        email: 'Ralph@gmail.com',
        profession: 'professional room cleaner',
        favouritePizza: 'Margerita',
        consent: true,
    },

    {
        id: '3',
        fullname: 'Martha Byczek',
        password: 'efghij',
        email: 'Byczek@gmail.com',
        profession: 'professional broom rider',
        favouritePizza: 'Margerita',
        consent: true,
    },
];

export const JWT_TOKEN = 'some-random-jwt-token';

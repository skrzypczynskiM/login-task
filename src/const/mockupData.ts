import { Pizza, Sex, User } from '../shared/types';

export const USERS: User[] = [
    {
        id: '1',
        fullname: 'Joseph Joestar',
        password: 'test',
        email: 'test@example.com',
        profession: 'web developer',
        favouritePizza: Pizza.Buffalo,
        sex: Sex.Male,
        consent: false,
    },

    {
        id: '2',
        fullname: 'Ralph Buda',
        password: 'abcde',
        email: 'Ralph@gmail.com',
        profession: 'professional room cleaner',
        favouritePizza: Pizza.Margherita,
        sex: Sex.Male,
        consent: true,
    },

    {
        id: '3',
        fullname: 'Martha Byczek',
        password: 'efghij',
        email: 'Byczek@gmail.com',
        profession: 'professional broom rider',
        favouritePizza: Pizza.Hawaiian,
        sex: Sex.Female,
        consent: true,
    },
];

export const JWT_TOKEN = 'some-random-jwt-token';

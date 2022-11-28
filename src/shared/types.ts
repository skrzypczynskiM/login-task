export type User = {
    id: string;
    fullname: string;
    password: string;
    email: string;
    profession: string;
    favouritePizza: PizzaType;
    sex: Sex;
    consent: boolean;
};

export enum Pizza {
    Margherita = 'Margherita',
    Pepperoni = 'Pepperoni',
    Hawaiian = 'Hawaiian',
    Buffalo = 'Buffalo',
}

export enum Sex {
    Male = 'Male',
    Female = 'Female',
}

export type PizzaType = 'Margherita' | 'Pepperoni' | 'Hawaiian' | 'Buffalo';

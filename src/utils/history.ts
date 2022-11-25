import { Location, NavigateFunction } from 'react-router-dom';

// custom history object to allow navigation outside react components
type History = {
    navigate: NavigateFunction | null;
    location: Location | null;
};

export const history: History = {
    navigate: null,
    location: null,
};

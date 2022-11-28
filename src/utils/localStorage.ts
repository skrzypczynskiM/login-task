export function lsSave<T>(key: string, value: T) {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}

export function lsRead<T>(key: string, defaultValue?: T) {
    if (typeof window !== 'undefined') {
        const data = window.localStorage.getItem(key);

        return data ? JSON.parse(data) : defaultValue;
    }
}

export function lsDelete(key: string) {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
    }
}

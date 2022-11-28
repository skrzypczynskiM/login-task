export type ExtendedHeaders = HeadersInit & {
    ['Content-Type']?: string;
    Authorization?: string;
};

export type RequestOptions = Omit<RequestInit, 'headers'> & {
    headers: ExtendedHeaders;
};

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

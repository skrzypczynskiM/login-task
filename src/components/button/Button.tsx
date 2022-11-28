import { Spinner } from '../spinner';

type Props = JSX.IntrinsicElements['button'] & {
    className?: string;
    children: React.ReactNode;
    loading: boolean;
};

export function Button({ children, className, loading }: Props) {
    return (
        <button
            type="submit"
            className={`${className} flex justify-center items-center relative px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full`}
            disabled={loading}
        >
            {loading && <Spinner />}
            {children}
        </button>
    );
}

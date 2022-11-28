type Props = { children: JSX.Element; className?: string };

export function Alert({ children, className }: Props) {
    return (
        <div
            className={`bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3 ${className}`}
            role="alert"
        >
            {children}
        </div>
    );
}

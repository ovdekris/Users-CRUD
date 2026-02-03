interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <div className="text-red-500 text-center p-4">
        {message}
    </div>
);
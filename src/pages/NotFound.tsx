import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-light">
            <div className="text-center">
                {/* 404 Heading */}
                <h1 className="text-9xl font-bold text-dark">404</h1>
                <p className="text-2xl font-semibold text-dark-lighter mt-4">Oops! Page Not Found</p>
                <p className="text-lg text-muted mt-2">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
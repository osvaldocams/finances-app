import { Link } from "react-router-dom";

type PageHeaderProps = {
    title: string
    description?: string
    backTo?: string
    backLabel?: string
}

export default function PageHeader({title,description,backTo,backLabel = 'Volver'}: PageHeaderProps) {
    return (
        <>
        <h1 className="text-5xl font-black">{title}</h1>

        {description && (
            <p className="text-2xl font-light text-gray-500 mt-5">
            {description}
            </p>
        )}

        {backTo && (
            <nav className="my-5">
                <Link
                    to={backTo}
                    className="bg-gray-400 hover:bg-gray-500 px-10 py-3 text-white text-xl font-bold transition-colors rounded-lg"
                >
                {backLabel}
                </Link>
        </nav>
        )}
        </>
    );
}
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
        <h1 className="text-5xl font-black text-obsidian">{title}</h1>

        {description && (
            <p className="text-2xl font-light text-obsidian mt-5">
            {description}
            </p>
        )}

        {backTo && (
            <nav className="my-5">
                <Link
                    to={backTo}
                    className="bg-green-balance hover:bg-sage px-10 py-3 text-linen-light hover:text-white text-xl font-bold transition-colors rounded-lg"
                >
                {backLabel}
                </Link>
        </nav>
        )}
        </>
    );
}
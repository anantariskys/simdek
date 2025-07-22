import { router } from '@inertiajs/react';

type Link = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationProps = {
    links: Link[];
};

export default function Pagination({ links }: PaginationProps) {
    if (!links || links.length === 0) return null;

    const getButtonStyles = (link: Link, index: number, isFirst: boolean, isLast: boolean) => {
        const baseStyles = "relative inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200";
        const disabledStyles = "cursor-not-allowed opacity-50";
        
        // Border radius for first and last buttons
        let borderStyles = "";
        if (isFirst) borderStyles += "rounded-l-lg ";
        if (isLast) borderStyles += "rounded-r-lg ";
        
        if (!link.url) {
            return `${baseStyles} ${borderStyles} ${disabledStyles} border border-gray-300 bg-gray-100 text-gray-400`;
        }
        
        if (link.active) {
            return `${baseStyles} ${borderStyles} border border-green-600 bg-green-600 text-white shadow-lg z-10`;
        }
        
        return `${baseStyles} ${borderStyles} border border-gray-300 bg-white text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-500`;
    };

    const renderButtonContent = (label: string) => {
        // Handle arrow symbols for better visual appeal
        if (label.includes('&laquo;')) {
            return (
                <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                </div>
            );
        }
        
        if (label.includes('&raquo;')) {
            return (
                <div className="flex items-center space-x-1">
                    <span className="hidden sm:inline">Next</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            );
        }
        
        // Handle ellipsis
        if (label === '...') {
            return (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                </svg>
            );
        }
        
        return <span dangerouslySetInnerHTML={{ __html: label }} />;
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {/* Mobile pagination - show only prev/next */}
                {links[0] && (
                    <button
                        disabled={!links[0].url}
                        onClick={() => {
                            if (links[0].url) {
                                router.visit(links[0].url, {
                                    preserveScroll: true,
                                    preserveState: true,
                                });
                            }
                        }}
                        className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                            links[0].url 
                                ? 'border border-gray-300 bg-white text-gray-700 hover:bg-green-50' 
                                : 'cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-400'
                        }`}
                    >
                        {renderButtonContent(links[0].label)}
                    </button>
                )}
                {links[links.length - 1] && (
                    <button
                        disabled={!links[links.length - 1].url}
                        onClick={() => {
                            if (links[links.length - 1].url) {
                                router.visit(links[links.length - 1].url!, {
                                    preserveScroll: true,
                                    preserveState: true,
                                });
                            }
                        }}
                        className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                            links[links.length - 1].url 
                                ? 'border border-gray-300 bg-white text-gray-700 hover:bg-green-50' 
                                : 'cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-400'
                        }`}
                    >
                        {renderButtonContent(links[links.length - 1].label)}
                    </button>
                )}
            </div>
            
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm" aria-label="Pagination">
                    {links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => {
                                if (link.url) {
                                    router.visit(link.url, {
                                        preserveScroll: true,
                                        preserveState: true,
                                    });
                                }
                            }}
                            className={getButtonStyles(link, index, index === 0, index === links.length - 1)}
                            aria-current={link.active ? 'page' : undefined}
                        >
                            {renderButtonContent(link.label)}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
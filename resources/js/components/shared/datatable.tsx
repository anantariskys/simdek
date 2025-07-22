import Pagination from './pagination';
import SearchInput from './search-input';

type Column<T> = {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
    title?: string;
    data: {
        data: T[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    columns: Column<T>[];
};

export default function DataTable<T>({ title, data, columns }: DataTableProps<T>) {
    return (
        <div className="space-y-6">
            {/* {title && (
                <div className="border-l-4 border-green-600 bg-gradient-to-r from-green-50 to-transparent pl-4">
                    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                </div>
            )} */}
            <div className="overflow-hidden  pt-4 px-4 ">
                <SearchInput />
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-green-600 to-green-700">
                            <tr>
                                <th className="border-r border-green-500 px-6 py-4 text-left text-sm font-semibold text-white">
                                    #
                                </th>
                                {columns.map((col, index) => (
                                    <th 
                                        key={col.key} 
                                        className={`px-6 py-4 text-left text-sm font-semibold text-white ${
                                            index < columns.length - 1 ? 'border-r border-green-500' : ''
                                        }`}
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.data.map((item, index) => (
                                <tr 
                                    key={(item as any).id ?? index} 
                                    className="transition-colors duration-200 hover:bg-green-50"
                                >
                                    <td className="border-r border-gray-200 px-6 py-4 text-sm font-medium text-gray-700">
                                        {index + 1}
                                    </td>
                                    {columns.map((col, colIndex) => (
                                        <td 
                                            key={col.key} 
                                            className={`px-6 py-4 text-sm text-gray-700 ${
                                                colIndex < columns.length - 1 ? 'border-r border-gray-200' : ''
                                            }`}
                                        >
                                            {col.render ? col.render(item) : ((item as any)[col.key] ?? '-')}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {data.data.length === 0 && (
                                <tr>
                                    <td 
                                        colSpan={columns.length + 1} 
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        <div className="flex flex-col items-center space-y-2">
                                            <div className="rounded-full bg-gray-100 p-3">
                                                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-lg font-medium">No data available</p>
                                            <p className="text-sm">There are no records to display at the moment.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            <Pagination links={data.links} />
            </div>
            
        </div>
    );
}
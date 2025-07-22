export type InertiaPagination<T> = {
    data: T[];
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    per_page: number;
    to: number;
    total: number;
};

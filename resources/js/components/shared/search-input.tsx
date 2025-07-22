import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type SearchInputProps = {
  searchKey?: string;
};

export default function SearchInput({ searchKey = 'search' }: SearchInputProps) {
  const {  url } = usePage();
  const searchParams = new URLSearchParams(url.split('?')[1]);
  const defaultValue = searchParams.get(searchKey) || '';
  const [search, setSearch] = useState(defaultValue);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(
        route(route().current() || ''),
        { [searchKey]: search },
        { preserveState: true, replace: true }
      );
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <input
      type="text"
      className="border border-gray-300 px-2 py-1 rounded  mb-4"
      placeholder="Cari..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

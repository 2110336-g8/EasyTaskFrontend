import { SearchIcon } from 'lucide-react';
import { useState } from 'react'; // Import useState hook

export default function SearchBar({
    updateSearchName,
}: {
    updateSearchName: (name: string) => void;
}) {
    const [searchInput, setSearchInput] = useState<string>('');

    const handleSearch = () => {
        updateSearchName(searchInput);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    return (
        <div className='flex justify-center items-center h-[60px] w-full px-[40px] laptop:px-0 laptop:w-[1000px] '>
            <input
                type='text'
                className='h-full inner-border-[1.7px] border-slate-400 rounded-l-[8px] w-full pl-[16px] pr-[56px] py-[16px] text-slate-900 font-h4 tracking-h4 text-h4 placeholder:text-slate-400 focus-visible:outline-none'
                placeholder='Find Interested Job or Location'
                value={searchInput}
                onChange={e => {
                    handleInputChange(e);
                }}
                onKeyDown={e => {
                    if (e.key === 'Enter') handleSearch();
                }}
            />
            <button
                className='h-full rounded-r-[8px] text-white text-button tracking-button font-button inline-flex items-center justify-center bg-primary-500 hover:opacity-80 px-[24px] py-[12px] gap-[6px]'
                onClick={handleSearch}
            >
                <div className='hidden laptop:flex'>Search</div>
                <SearchIcon className='w-[28px] h-[28px]' />
            </button>
        </div>
    );
}

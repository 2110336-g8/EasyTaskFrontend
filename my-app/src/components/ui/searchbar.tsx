import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export default function SearchBar() {
    return (
        <div className='flex justify-center items-center h-[60px] w-full px-[40px] laptop:px-0 laptop:w-[1000px] '>
            <input
                type='text'
                className=' h-full inner-border border-slate-400 rounded-l-[8px] w-full pl-[16px] pr-[56px] py-[16px] text-slate-900 font-h4 tracking-h4 text-h4 placeholder:text-slate-400 focus-visible:outline-none focus-visible:inner-border-2'
                placeholder='Find Interested Job or Location'
            />
            <button className='h-full rounded-r-[8px] text-white text-button tracking-btton font-button inline-flex items-center justify-center bg-primary-500 hover:opacity-80 px-[24px] py-[12px] gap-[6px]'>
                <div className='hidden laptop:flex'>Search</div>
                <SearchIcon className='w-[28px] h-[28px]' />
            </button>
        </div>
    );
}

'use client';

import { WageRange } from '@/app/(main)/task/page';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const mockCategory: string[] = [
    'Graphic Design',
    'Marketing',
    'Translation',
    'Images and Sound',
    'Programming and Tech',
    'Consultant',
    'Management',
    'General',
];

const mockWageRange: WageRange[] = [
    [0, 1000],
    [1000, 5000],
    [5000, 10000],
    [10000, 50000],
    [50000, 100000],
    [100000, -1],
];

const formatWageRange = (range: WageRange): string => {
    let formattedRange: string;

    if (range[0] === -1 && range[1] !== -1) {
        formattedRange = `${range[1]?.toLocaleString() ?? 'N/A'}-`;
    } else if (range[0] !== -1 && range[1] === -1) {
        formattedRange = `${range[0]?.toLocaleString() ?? 'N/A'}+`;
    } else {
        formattedRange = `${range[0]?.toLocaleString() ?? 'N/A'}-${range[1]?.toLocaleString() ?? 'N/A'}`;
    }

    return formattedRange;
};

export default function FilterTaskList({
    updateCategoryFilters,
    updateIndividualFilter,
    updateWageRangeFilters,
}: {
    updateCategoryFilters: (category: string) => void;
    updateIndividualFilter: (isIndividual: boolean) => void;
    updateWageRangeFilters: (range: WageRange) => void;
}) {
    return (
        <div className='flex flex-col gap-[16px]'>
            <ToggleGroup type='multiple'>
                {mockCategory.map((category, index) => (
                    <ToggleGroupItem
                        onClick={() => updateCategoryFilters(category)}
                        value={category}
                        key={index}
                    >
                        <p className='text-slate-400'>{category}</p>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>

            <div className='inline-flex gap-[24px] text-slate-500'>
                <ToggleGroup type='single'>
                    Work as
                    <ToggleGroupItem
                        onClick={() => updateIndividualFilter(true)}
                        value='Individual'
                    >
                        <p className='text-slate-400'>Individual</p>
                    </ToggleGroupItem>
                    /
                    <ToggleGroupItem
                        onClick={() => updateIndividualFilter(false)}
                        value='Team'
                    >
                        <p className='text-slate-400'>Team</p>
                    </ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type='multiple'>
                    Wages
                    {mockWageRange.map((range, index) => {
                        const formattedRange = formatWageRange(range);
                        const key = `range-${index}`;
                        return (
                            <ToggleGroupItem
                                onClick={() => updateWageRangeFilters(range)}
                                value={formattedRange}
                                key={key}
                            >
                                <p className='text-slate-400'>
                                    {formattedRange}
                                </p>
                            </ToggleGroupItem>
                        );
                    })}
                </ToggleGroup>
            </div>
        </div>
    );
}

'use client';

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { toast } from '../ui/use-toast';
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/getAllTasks';
import { GetCategoriesResponse } from '@/types/task';
import { WageRange } from '@/app/(main)/(protected)/task/page';

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
    const [categories, setCategories] = useState<string[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            getCategories()
                .then((categoriesData: GetCategoriesResponse) => {
                    setCategories(categoriesData.categories);
                })
                .catch(e => {
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                    });
                    console.error('Cannot fetch data. Error: ', e);
                });
        };
        fetchData();
    }, []);

    return (
        <div className='flex flex-col gap-[16px]'>
            <ToggleGroup size={'sm'} type='multiple'>
                {categories.map((category, index) => (
                    <ToggleGroupItem
                        onClick={() => updateCategoryFilters(category)}
                        value={category}
                        key={`categoryFilter${index}`}
                        className=''
                        aria-label='Toggle bold'
                        active={false}
                    >
                        {category}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>

            <div className='inline-flex items-center gap-[24px]'>
                <ToggleGroup size={'sm'} type='single'>
                    <div className='flex items-center gap-[8px]'>
                        <div>Work as</div>
                        <ToggleGroupItem
                            onClick={() => updateIndividualFilter(true)}
                            value='Individual'
                            key={'IndividualFilter'}
                            className=''
                            aria-label='Toggle bold'
                            active={false}
                        >
                            Individual
                        </ToggleGroupItem>
                        <div>/</div>
                        <ToggleGroupItem
                            onClick={() => updateIndividualFilter(false)}
                            value='Team'
                            key={'TeamFilter'}
                            className=''
                            aria-label='Toggle bold'
                            active={false}
                        >
                            Team
                        </ToggleGroupItem>
                    </div>
                </ToggleGroup>

                <ToggleGroup size={'sm'} type='multiple'>
                    <div className='flex items-center gap-[8px]'>
                        <div>Wages</div>
                        {mockWageRange.map((range, index) => {
                            const formattedRange = formatWageRange(range);
                            const key = `range-${index}`;
                            return (
                                <ToggleGroupItem
                                    onClick={() =>
                                        updateWageRangeFilters(range)
                                    }
                                    value={formattedRange}
                                    key={key}
                                    className=''
                                    aria-label='Toggle bold'
                                    active={false}
                                >
                                    {formattedRange}
                                </ToggleGroupItem>
                            );
                        })}
                    </div>
                </ToggleGroup>
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { AdsCardProps } from '@/types/task';
import AdsCard from '@/components/adsList/adsCard';
import { ChevronDownIcon, ChevronRightIcon, AlertTriangleIcon } from 'lucide-react';

export default function AdsToggleList({
    type,
    adsList,
    managing,
    onAddToCancelList,
    onRemoveFromCancelList,
}: {
    type: keyof typeof names;
    adsList: AdsCardProps[];
    managing: boolean;
    onAddToCancelList: (taskId: string) => void;
    onRemoveFromCancelList: (taskId: string) => void;
}) {
    const names = {
        inprogress: 'In Progress',
        open: 'Open for Apply',
        completed: 'Completed',
        closed: 'Dismissed',
    };

    const [isShow, setIsShow] = useState<boolean>(false);
    const [buttonFuncType, setButtonFuncType] = useState<string>(type);

    useEffect(() => {
        if (managing) {
            setButtonFuncType('managing');
        } else {
            setButtonFuncType(type);
        }
    }, [managing, type]);

    return (
        <div className='w-full flex flex-col gap-[20px]'>
            <div
                className='group flex w-full gap-[8px] cursor-pointer'
                onClick={() => setIsShow(!isShow)}
            >
                <button>
                    {isShow ? (
                        <ChevronDownIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px] group-hover:stroke-primary-500' />
                    ) : (
                        <ChevronRightIcon className='stroke-slate-500 stroke-2 w-[28px] h-[28px] group-hover:stroke-primary-500' />
                    )}
                </button>
                <h4 className='text-slate-500 group-hover:text-primary-500 group-hover:font-medium'>
                    {names[type]}
                </h4>
            </div>
            {isShow ? (
                adsList.length > 0 ? (
                    <div className='w-fit'>
                        <div className='flex flex-col gap-[24px] tablet:grid-cols-2 laptop:grid-cols-3 desktop-l:grid-cols-4 w-full gap-y-[24px] justify-between'>
                        {type === 'open' && (
                            <div className="bg-error-100 gap-[8px] px-[8px] py-[10px] rounded-[6px] flex">
                                <AlertTriangleIcon className='w-[24px] h-[24px] text-error-500' /><p className='text-error-500'>Please select candidate before the job start date. If not, it will be automatically closed after the job start within 1 week.</p>
                            </div>
                        )}
                            {adsList.map((task, index) => (
                                <AdsCard
                                    key={index}
                                    props={task}
                                    buttonFunc={buttonFuncType}
                                    onAddToCancelList={onAddToCancelList}
                                    onRemoveFromCancelList={
                                        onRemoveFromCancelList
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ) : null
            ) : null}
        </div>
    );
}

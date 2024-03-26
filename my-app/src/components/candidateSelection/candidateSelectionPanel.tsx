'use client';

import CandidateCard from '@/components/candidateSelection/candidateCard';
import { CandidateInfo, CandidatesOfTask } from '@/types/task';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { dateNow } from '@/utils/datetime';
import { instance } from '@/utils/axiosInstance';

export default function CandidateSelectionPanel(props: {
    candidates: CandidatesOfTask;
}) {
    const candidateInfos: Array<CandidateInfo> =
        props.candidates?.candidates?.pending;
    const maxSelectable = props.candidates ? props.candidates.vacancy : 0;

    const router = useRouter();
    const [enabled, setEnabled] = useState<Array<number>>([]);

    const selectedMax = () => enabled.length >= maxSelectable;

    const updateCounter = (index: number) => {
        const pos = enabled.indexOf(index);
        if (pos !== -1) {
            // Is currently selected
            // Remove the index
            setEnabled(enabled.filter(i => i !== index));
        } else if (!selectedMax()) {
            // Is not selected yet and total does not exceed
            // Add the index
            setEnabled(enabled.concat([index]));
        }
    };

    const getCurrentCount = (index: number) => {
        const pos = enabled.indexOf(index);
        return pos === -1 ? 0 : pos + 1;
    };

    const isAllowedToUpdate = (index: number) => {
        if (!selectedMax()) {
            return true;
        } else {
            return enabled.indexOf(index) !== -1;
        }
    };

    const getChosenCandidates = (): { selectedCandidates: string[] } => {
        return {
            selectedCandidates: candidateInfos
                .filter((_e, i) => enabled.indexOf(i) !== -1)
                .map(e => e.userId),
        };
    };

    const goBack = () => {
        router.push(`/task/${props.candidates.taskId}`);
    };

    const handleSave = () => {
        const allIds = getChosenCandidates();

        if (allIds.selectedCandidates.length > 0) {
            instance
                .post(`/v1/tasks/${props.candidates.taskId}/candidates`, allIds)
                .then(() => {
                    console.log(allIds);
                });
        }

        goBack();
    };

    const handleCancel = () => {
        console.log('Candidate selection is canceled!');
        goBack();
    };

    return candidateInfos.length > 0 ? (
        <main className='flex justify-center items-center'>
            <section className='flex flex-col w-[1000px] gap-[40px]'>
                {/* Header */}
                <header className='flex flex-row items-end'>
                    <h1 className='text-slate-900 flex-grow'>
                        {'Select Employees'}
                    </h1>
                    <p
                        className={`font-medium text-[16pt] flex-shrink-0 ${!selectedMax() ? 'text-slate-600' : 'text-error-500'}`}
                    >
                        {`${enabled.length}/${maxSelectable}`}
                    </p>
                </header>

                {/* Employee cards */}
                <div className='grid grid-cols-2 gap-[12px]'>
                    {candidateInfos.map((e, i) => (
                        <CandidateCard
                            employeeInfo={e}
                            index={getCurrentCount(i)}
                            allowUpdate={isAllowedToUpdate(i)}
                            onClick={() => updateCounter(i)}
                            key={i}
                        />
                    ))}
                </div>

                {/* Confirmation and Cancellations */}
                <div className='flex flex-row gap-[12px]'>
                    <div>
                        <Button
                            className='w-[494px] text-primary-500'
                            variant='outline'
                            size='m'
                            font='m'
                            onClick={handleCancel}
                        >
                            {'Cancel'}
                        </Button>
                    </div>
                    <div>
                        <Button
                            className='w-[494px] text-white'
                            variant='default'
                            size='m'
                            font='m'
                            onClick={handleSave}
                        >
                            {'Save'}
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    ) : (
        <main className='flex justify-center items-center'>
            <section className='flex flex-col gap-[40px]'>
                <h1>{"There's no candidates applying at this time..."}</h1>
                <div>
                    <Button
                        className='w-full text-primary-500'
                        variant='outline'
                        size='m'
                        font='m'
                        onClick={handleCancel}
                    >
                        {'Go back to task details'}
                    </Button>
                </div>
            </section>
        </main>
    );
}

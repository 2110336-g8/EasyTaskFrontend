'use client';

import React, { useEffect, useState } from 'react';
import ViewTask from '@/components/task/taskDetail/detailTask';
import { clientStorage } from '@/utils/storageService';
import { getTaskDetail } from '@/lib/getTaskDetail';
import {
    AdsDetailResponse,
    Applicant,
    CandidatesOfTask,
    JobDetailResponse,
    Task,
    ViewAdsProps,
    ViewJobProps,
    ViewTaskProps,
    Worker,
} from '@/types/task';
import dayjs from 'dayjs';
import { dateNow, formatDateDuration } from '@/utils/datetime';
import { formatPhoneNumber } from '@/utils/utils';
import { User } from '@/types/user';
import { toast } from '@/components/ui/use-toast';
import CandidateSelectionPanel from '@/components/candidateSelection/candidateSelectionPanel';
import { getCandidatesOfTask } from '@/lib/getCandidatesOfTask';

export default function CandidateSelectionPage({
    params,
}: {
    params: { taskId: string };
}) {
    const taskId = params.taskId;

    const [candidates, setCandidates] = useState<CandidatesOfTask>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            getCandidatesOfTask(params.taskId)
                .then((candidatesData: CandidatesOfTask) => {
                    setCandidates(candidatesData);
                    setIsLoading(false);
                })
                .catch(e => {
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                    });
                    setError(e);
                    setIsLoading(false);
                    console.error('Cannot fetch data. Error: ', e);
                });
        };
        fetchData().then(() => {
            console.log('Data is successfully fetched!');
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {candidates ? (
                <CandidateSelectionPanel candidates={candidates} />
            ) : null}
        </div>
    );
}

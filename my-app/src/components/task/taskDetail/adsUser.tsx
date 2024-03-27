'use client';

import {
    ApplicantProps,
    TaskStateOptions,
    ViewAdsProps,
    WorkerProps,
    WorkerStatusOptions,
} from '@/types/task';
import FullWidthBar from '@/components/ui/hbar';
import UserProfile, {
    AvatarProfile,
    WorkerProfile,
} from '@/components/ui/userProfile';
import { Button } from '@/components/ui/button';

export default function AdsUser({
    props,
    setCheckWorker,
    setSideState,
}: {
    props: ViewAdsProps;
    setCheckWorker: React.Dispatch<React.SetStateAction<WorkerProps | null>>;
    setSideState: React.Dispatch<React.SetStateAction<'general' | 'submitted'>>;
}) {
    switch (props.status) {
        //=============OPEN=============//
        case TaskStateOptions.OPEN:
            const havePending = (props.pendingApplicants?.length || 0) > 0;
            const haveOffering = (props.offeringApplicants?.length || 0) > 0;
            return (
                <div className='flex flex-col gap-[24px]'>
                    <PendingApplicants
                        applicants={props.pendingApplicants || []}
                    />
                    {/* {havePending || haveOffering ? ( */}
                    <>
                        <FullWidthBar />
                        <AcceptApplicants
                            isPending={haveOffering}
                            applicants={props.acceptApplicants || []}
                        />
                    </>
                    {/* ) : null} */}
                    {haveOffering ? (
                        <>
                            <FullWidthBar />
                            <OfferingApplicants
                                applicants={props.offeringApplicants || []}
                            />
                        </>
                    ) : null}
                </div>
            );

        //=============INPROGRESS=============//
        case TaskStateOptions.INPROGRESS:
        //=============COMPLETE=============//
        case TaskStateOptions.COMPLETED:
        //=============DISMISSED=============//
        case TaskStateOptions.DISMISSED:
            return (
                <Workers
                    workers={props.hiredWorkers || []}
                    setCheckWorker={setCheckWorker}
                    setSideState={setSideState}
                />
            );
        default:
            return null;
    }
}

const PendingApplicants = ({
    applicants,
}: {
    applicants: ApplicantProps[];
}) => {
    return (
        <div className='flex flex-col gap-[16px]'>
            {textAndCount('Canidate Application', applicants.length)}
            {applicants.length > 0 ? (
                <div className='grid grid-cols-5 gap-4'>
                    {applicants.map(applicant => (
                        <AvatarProfile {...applicant} />
                    ))}
                </div>
            ) : (
                <p className='text-slate-400'>
                    No job applications have been received. Please wait
                    patiently.
                </p>
            )}
        </div>
    );
};

const AcceptApplicants = ({
    applicants,
    isPending,
}: {
    applicants: ApplicantProps[];
    isPending: boolean;
}) => {
    return (
        <div className='flex flex-col gap-[16px]'>
            {textAndCount('Employees', applicants.length)}
            {applicants?.length > 0 ? (
                <div className='flex flex-col gap-[16px]'>
                    {applicants?.map(applicant => (
                        <UserProfile {...applicant} />
                    ))}
                </div>
            ) : (
                <p className='text-slate-400'>
                    {isPending ? (
                        <>
                            No job acceptances have been received from any
                            preferred employees yet. <br />
                            Please wait patiently.
                        </>
                    ) : (
                        'No candidates have been selected yet. Please select your preferred employees.'
                    )}
                </p>
            )}
        </div>
    );
};

const OfferingApplicants = ({
    applicants,
}: {
    applicants: ApplicantProps[];
}) => {
    return (
        <div>
            <div className='flex flex-col gap-[16px]'>
                {textAndCount('Pending for Response', applicants.length)}
                <div className='flex flex-col gap-[16px]'>
                    {applicants?.map(applicant => (
                        <UserProfile {...applicant} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Workers = ({
    workers,
    setCheckWorker,
    setSideState,
}: {
    workers: WorkerProps[];
    setCheckWorker: React.Dispatch<React.SetStateAction<WorkerProps | null>>;
    setSideState: React.Dispatch<React.SetStateAction<'general' | 'submitted'>>;
}) => {
    return (
        <div>
            <div className='flex flex-col gap-[16px]'>
                {textAndCount('Employees', workers.length)}
                <div className='flex flex-col gap-[16px]'>
                    {workers?.map(worker => (
                        <div className='flex flex-col gap-[2px]'>
                            <WorkerProfile
                                props={worker}
                                setCheckWorker={setCheckWorker}
                                setSideState={setSideState}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const textAndCount = (text: string, count: number) => {
    return (
        <div className='flex flex-row items-center gap-[12px]'>
            <h4>{text}</h4>
            <p className='text-primary-500 border-primary-500 border-[1px] px-[4px] rounded-[4px] min-w-[24px] h-[26px] text-center'>
                {count}
            </p>
        </div>
    );
};

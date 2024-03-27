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

export default function AdsUser(props: ViewAdsProps) {
    switch (props.status) {
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
        case TaskStateOptions.INPROGRESS:
            return <Workers workers={props.hiredWorkers || []} />;
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
            <h4>Candidate Application ({applicants?.length})</h4>
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
            <h4>Employees ({applicants?.length})</h4>
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
                <h4>Pending for Response ({applicants?.length})</h4>
                <div className='flex flex-col gap-[16px]'>
                    {applicants?.map(applicant => (
                        <UserProfile {...applicant} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Workers = ({ workers }: { workers: WorkerProps[] }) => {
    return (
        <div>
            <div className='flex flex-col gap-[16px]'>
                <h4>Employees ({workers?.length})</h4>
                <div className='flex flex-col gap-[16px]'>
                    {workers?.map(worker => (
                        <div className='flex flex-col gap-[2px]'>
                            <WorkerProfile {...worker} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

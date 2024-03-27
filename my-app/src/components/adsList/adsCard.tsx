'use client';

import { AdsCardProps, Applicant, TaskStateOptions } from '@/types/task';
import Link from 'next/link';
import {
    ClockIcon,
    InboxIcon,
    MapPinIcon,
    CalendarDaysIcon,
} from 'lucide-react';
// import { Button } from 'react-day-picker';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { toast } from '../ui/use-toast';
import { startTask } from '@/lib/taskManagement';
import { PrefixPathnameNormalizer } from 'next/dist/server/future/normalizers/request/prefix';

export default function AdsCard({ props }: { props: AdsCardProps }) {
    // Assuming you have a functional component
    const router = useRouter();

    const handleViewTask = () => {
        router.push('/task/' + props.taskId);
    };

    const handleGoToMessage = () => {
        router.push(`/messages/${props.taskId}`);
    };

    const hadleSelectEmp = () => {
        router.push(`/task/${props.taskId}/select`);
    };

    const startHandler = () => {
        startTask(props.taskId)
            .then(response => {
                toast({
                    variant: 'default',
                    title: 'Task Started Successfully',
                    description: 'You have successfully started the task.',
                });
            })
            .catch(error => {
                console.error('Error Starting for task:', error);
                toast({
                    variant: 'destructive',
                    title: 'Task Start Error',
                    description:
                        typeof error === 'string'
                            ? error
                            : 'An unexpected error occurred. Please try again.',
                });
            });
    };
    // const [isCanceled, setIsCanceled] = useState(false);

    // const handleCancelTask = (
    //     event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    // ) => {
    //     const eventObject = event as unknown as Event;
    //     eventObject.stopPropagation();
    //     if (!isCanceled) {
    //         onAddToCancelList(props.taskId);
    //         setIsCanceled(true);
    //     } else {
    //         onRemoveFromCancelList(props.taskId);
    //         setIsCanceled(false);
    //     }
    // };
    function isStartable(applicants: Applicant[]): boolean {
        for (const applicant of applicants) {
            if (applicant.status === 'Accepted') {
                return true;
            }
        }
        return false;
    }

    function FunctionalButton() {
        // Dynamically set buttonText based on status prop
        let buttonText;
        if (props.status === 'Open') {
            if (isStartable(props.applications)) {
                return (
                    <Dialog>
                        <DialogTrigger type='button'>
                            <Button className='w-full'>Start Job Now</Button>
                        </DialogTrigger>
                        <DialogContent className='rounded-[6px] border-slate-300'>
                            <DialogHeader className='flex flex-col text-left'>
                                <DialogTitle>
                                    <h3 className='text-slate-900'>
                                        Are you absolutely sure to start job?
                                    </h3>
                                </DialogTitle>
                                <DialogDescription>
                                    <p className='text-slate-500'>
                                        'This action will be notice all
                                        employees to start working on this job.'
                                    </p>
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter className='w-full flex flex-row justify-end items-center self-stretch gap-[8px]'>
                                <DialogClose asChild>
                                    <Button
                                        className='w-full border-[1px]'
                                        variant='outlineslate'
                                        size='s'
                                        font='s'
                                        type='button'
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        className='w-full'
                                        size='s'
                                        font='s'
                                        onClick={startHandler}
                                    >
                                        Confirm
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                );
            }
            return (
                <Button onClick={hadleSelectEmp} size='m' font='m'>
                    Select Employees
                </Button>
            );
        } else if (props.status == 'InProgress') {
            buttonText = 'Go to Messages';
            return (
                <Button onClick={handleGoToMessage} size='m' font='m'>
                    {buttonText}
                </Button>
            );
        } else {
            return <div></div>;
        }

        // return (
        //     <Button size='m' font='m'>
        //         {buttonText}
        //     </Button>
        // );
    }

    return (
        <div
            className='rounded-lg bg-card items-center flex justify-between text-card-foreground hover:shadow-md inner-border w-[1328px] h-auto overflow-hidden'
            // onClick={handleViewTask}
            style={{ cursor: 'pointer' }}
        >
            <div onClick={handleViewTask} className='flex flex-row w-[70%]'>
                <div className=''>
                    <img
                        className='w-[320px] h-[180px] object-cover'
                        src={props.imageUrl || '/mocktask.png'}
                        alt={''}
                    />
                </div>
                <div className='flex flex-row w-full p-[16px]'>
                    <div className='flex flex-col  h-auto w-full p-[16px] gap-[8px]'>
                        <div className='max-w-[600px]'>
                            <h3 className='text-slate-900 line-clamp-1 break-words'>
                                {props.title}
                            </h3>
                        </div>
                        {/* <div className='flex items-center gap-[4px]'>
                        <Button>hi</Button>
                    </div> */}
                        <div className='flex flex-row gap-[24px] '>
                            <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                                <CalendarDaysIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                                {props.startDate} - {props.endDate}
                            </small>
                            {props.location ? (
                                <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                                    <MapPinIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                                    {props.location}
                                </small>
                            ) : null}
                            {props.applications.length ? (
                                <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                                    <InboxIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                                    {props.applications.length} Applications
                                </small>
                            ) : (
                                <small className='inline-block whitespace-nowrap gap-[4px] flex items-center text-slate-500'>
                                    <InboxIcon className='stroke-slate-500 stroke-2 w-[16px] h-[16px]' />
                                    {0} Applications
                                </small>
                            )}
                        </div>
                        <div className='w-full flex flex-row gap-[24px]'>
                            {props.category ? (
                                <p className='px-[12px] py-[4px] rounded-[6px] border-[1px] border-primary-500 text-primary-500'>
                                    {props.category}
                                </p>
                            ) : (
                                <div />
                            )}
                            <div className='font-extrabold text-[24px]/[32px] tracking-[.006em] text-slate-700'>
                                ฿ {props.wages}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex item-centers justify-between p-[38px] mr-[5px]'>
                {FunctionalButton()}
            </div>
        </div>
    );
}

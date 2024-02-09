'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/ui/range-date-picker';

interface Task {
    title: string;
    description: string;
    duration: Date;
    location: string;
    category: string;
    teamSize: number;
    wages: number;
}

export default function ViewTask() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Card className='w-[640px]'>
                <CardHeader className='flex justify-between'>
                    <div className='flex justify-between'>
                        <div className='flex items-left'>
                            <CardTitle className='text-4xl break-words'>
                                Design task carddddddddddddddd
                            </CardTitle>
                        </div>
                        <div className='flex items-right'>
                            <Button>Apply Now</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-2'>
                    <Card className='h-[360px] relative'>
                        <div className='relative w-full h-full '>
                            <Image
                                src='/cyberpunk.png'
                                alt='Cyberpunk Image'
                                layout='fill'
                                objectFit='cover'
                                className='rounded-lg overflow-hidden'
                            />
                        </div>
                    </Card>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col items-start'>
                            <h1 className='font-inter text-16 text-gray-900 leading-24'>
                                Category
                            </h1>
                            <Button className='rounded-md border border-primary-500 bg-background-bg-background text-primary-500 hover:bg-primary-500 hover:text-white'>
                                Graphics
                            </Button>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-inter text-16 text-gray-900 leading-24'>
                                Team
                            </h1>
                            <p>2</p>
                        </div>
                        <div className='flex flex-col items-end'>
                            <h1 className='font-inter text-16 text-gray-900 leading-24'>
                                All Wages
                            </h1>
                            <h2 className='font-inter font-bold text-slate-700 text-30 leading-36 tracking-tighter text-42'>
                                ฿ 2000
                            </h2>
                        </div>
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='description'>Description</Label>
                        <Input
                            type='text'
                            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                            className='block w-full whitespace-pre-line break-words'
                        />
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='duration'>Duration</Label>
                        <CardDescription className='break-all'>
                            <DateRangePicker
                                align='center'
                                locale='en-GB'
                                showCompare={false}
                            />
                        </CardDescription>
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='duration'>Location</Label>
                        <Input
                            type='text'
                            placeholder='gg map?'
                            className='block w-full whitespace-pre-line break-words'
                        />
                    </div>
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <Button className='w-full'>Apply Now</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

// Sample Task data
const sampleTask: Task = {
    title: 'Design task carddddddddddddddd',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    duration: new Date(), // You can initialize with an actual date
    location: 'Some location',
    category: 'Graphics',
    teamSize: 2,
    wages: 2000,
};

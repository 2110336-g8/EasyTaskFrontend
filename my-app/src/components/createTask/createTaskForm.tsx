'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import React, { useState } from 'react';
import { userLogIn } from '@/lib/userLogIn';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';
import { Textarea } from '../ui/textarea';
import { Categories } from './category';
import { DateRange } from './dateRange';
import { Slider } from '@/components/ui/slider';
// import { SliderWorker } from './sliderWorker';
import Map from './mapBox';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { addDays } from 'date-fns';
import { createTask } from '@/lib/createTask';

const formSchema = z.object({
    title: z.string(),
    picture: z.string().refine(value => {
        // List of accepted image file extensions
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

        // Extract file extension
        const fileExtension = value.split('.').pop()?.toLowerCase();

        // Check if the file extension is undefined or not in the accepted list
        if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
            throw new Error(
                'Please upload an image file (jpg, jpeg, png, gif, bmp)',
            );
        }

        return true;
    }),
    description: z.string().optional(),
    category: z.string(),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }),
    wages: z.number(),
    sizeOfTeam: z.number(),
    locationName: z.string(),
});

export default function CreateTaskForm() {
    const router = useRouter();

    const {
        setError,
        formState: { errors },
    } = useForm();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            picture: '',
            description: '',
            category: 'General',
            dateRange: {
                // Set default value for dateRange
                from: new Date(2024, 2, 20),
                to: addDays(new Date(2024, 2, 21), 20),
            },
            wages: 20000,
            sizeOfTeam: 5,
            locationName: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(
            values.title,
            values.description,
            values.dateRange.from,
            values.dateRange.to,
            values.sizeOfTeam,
            values.wages,
            values.category,
            {
                name: values.locationName,
                latitude:
                    pinnedLocation.latitude !== null
                        ? pinnedLocation.latitude
                        : 0,
                longitude:
                    pinnedLocation.longitude !== null
                        ? pinnedLocation.longitude
                        : 0,
            },
        );
        try {
            const result = await createTask(
                values.title,
                values.description ?? "",
                values.dateRange.from,
                values.dateRange.to,
                values.sizeOfTeam,
                values.wages,
                'General',
                {
                    name: values.locationName,
                    latitude:
                        pinnedLocation.latitude !== null
                            ? pinnedLocation.latitude
                            : 0,
                    longitude:
                        pinnedLocation.longitude !== null
                            ? pinnedLocation.longitude
                            : 0,
                },
            );
            if (result?.error) {
                console.error('Create task failed:', result.error);
                if (result.error == "Task validation failed: category: Invalid category"){
                    setError('invalidText', {
                        type: 'manual',
                        message: 'Invalid category',
                    });
                }
                else if (result.error == "Task validation failed: title: Title is required"){
                    setError('invalidText', {
                        type: 'manual',
                        message: 'Please fill the title',
                    });    
                }
                else if (result.error == "Internal Server Error") {
                    setError('invalidText', {
                        type: 'manual',
                        message: 'Internal Server Error',
                    });
                }
            } else {
                console.log('success');
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
            });
            console.error('Unexpected error during authentication:', error);
        }
    };

    const [pinnedLocation, setPinnedLocation] = useState<{
        latitude: number | null;
        longitude: number | null;
    }>({ latitude: null, longitude: null });

    const handlePinLocation = (lng: number, lat: number) => {
        setPinnedLocation({ longitude: lng, latitude: lat });
    };

    // const [sliderValue, setSliderValue] = React.useState(11);

    // const handleSliderChange = (value: number) => {
    //     setSliderValue(value);
    // };

    const [date, setDate] = React.useState<Date>();

    return (
        <div className='flex flex-col h-screen font-sans ml-20'>
            <h1 className='w-[1000px] h-[80px]'>Create Job Advertisement</h1>
            <div>
                <div className='flex flex-row justify-end'>
                    <p className='text-error-500'>*</p>
                    <p>Require Data</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card className='w-[1000px] p-10'>
                            <CardContent>
                                <div className='grid w-full items-center gap-4'>
                                    <div className='flex flex-col space-y-1.5'>
                                        <FormField
                                            control={form.control}
                                            name='title'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-black font-p text-p tracking-p'>
                                                        <div className='flex flex-row'>
                                                            <h4 className='font-sans'>
                                                                Title
                                                            </h4>
                                                            <h4 className='text-error-500'>
                                                                *
                                                            </h4>
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Easy task'
                                                            className='font-small text-p tracking-small'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                                        <FormField
                                            control={form.control}
                                            name='picture'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-black font-p text-p tracking-p'>
                                                        <div className='flex flex-row'>
                                                            <h4 className='font-sans'>
                                                                Task Picture
                                                            </h4>
                                                            <h4 className='text-error-500'>
                                                                *
                                                            </h4>
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Easy task'
                                                            className='font-small text-p tracking-small'
                                                            type='file'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <div className='flex flex-row'>
                                            <h4>Task Picture</h4>
                                            <h4 className='text-error-500'>
                                                *
                                            </h4>
                                        </div>
                                        <Input id='picture' type='file' /> */}
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name='description'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-black font-p text-p tracking-p'>
                                                    <div className='flex flex-row'>
                                                        <h4 className='font-sans'>
                                                            Description
                                                        </h4>
                                                    </div>
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder='Enter brief task description here...'
                                                        className='font-small text-p tracking-small'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* <h4>Description</h4>
                                    <Textarea placeholder='Enter brief task description here...' /> */}

                                    <div className='flex'>
                                        <div className='w-1/3 flex flex-col'>
                                            <FormField
                                                control={form.control}
                                                name='category'
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-col'>
                                                        <FormLabel className='text-black font-p text-p tracking-p'>
                                                            <div className='flex flex-row'>
                                                                <h4>
                                                                    Category
                                                                </h4>
                                                                <h4 className='text-error-500'>
                                                                    *
                                                                </h4>
                                                            </div>
                                                        </FormLabel>
                                                        <FormControl className='flex flex-row'>
                                                            <div>
                                                                <Categories />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className='flex flex-col space-y-1.5'>
                                                <FormField
                                                    control={form.control}
                                                    name='wages'
                                                    render={({ field }) => (
                                                        <FormItem className='flex flex-col'>
                                                            <FormLabel className='text-black font-p text-p tracking-p'>
                                                                <div className='flex flex-row mt-2'>
                                                                    <h4>
                                                                        Wages
                                                                    </h4>
                                                                    <h4 className='text-error-500'>
                                                                        *
                                                                    </h4>
                                                                </div>
                                                            </FormLabel>
                                                            <FormControl className='flex flex-row'>
                                                                <div>
                                                                    <Input
                                                                        placeholder='20,000'
                                                                        className='font-small text-p tracking-small'
                                                                        {...field}
                                                                    />
                                                                    <p className='mt-2 ml-2'>
                                                                        Baht/Person
                                                                    </p>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='w-2/3'>
                                            <FormField
                                                control={form.control}
                                                name='dateRange'
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-col'>
                                                        <FormLabel className='text-black font-p text-p tracking-p'>
                                                            <div className='flex flex-row'>
                                                                <h4>
                                                                    Date Range
                                                                </h4>
                                                                <h4 className='text-error-500'>
                                                                    *
                                                                </h4>
                                                            </div>
                                                        </FormLabel>
                                                        <FormControl className='flex flex-row'>
                                                            <div className='font-small text-p tracking-small'>
                                                                <DateRange />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {/* <div className='flex flex-row'>
                                                <h4>Date Range</h4>
                                                <h4 className='text-error-500'>
                                                    *
                                                </h4>
                                            </div>
                                            <DateRange /> */}
                                        </div>
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='sizeOfTeam'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-col'>
                                                    <FormLabel className='text-black font-p text-p tracking-p'>
                                                        <div className='flex flex-row mt-2'>
                                                            <h4>
                                                                Size of Team
                                                            </h4>
                                                            <h4 className='text-error-500'>
                                                                *
                                                            </h4>
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl className='flex flex-row'>
                                                        <div>
                                                            <Input
                                                                placeholder='5'
                                                                className='font-small text-p tracking-small w-2/7'
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <div className='flex flex-row mt-2'>
                                            <h4>Size of Team</h4>
                                            <h4 className='text-error-500'>
                                                *
                                            </h4>
                                        </div>
                                        <Slider
                                            defaultValue={[5]}
                                            max={20}
                                            step={1}
                                            className='mt-2'
                                        /> */}
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='locationName'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-col'>
                                                    <FormLabel className='text-black font-p text-p tracking-p'>
                                                        <div className='flex flex-row mt-2'>
                                                            <h4>Location</h4>
                                                            <h4 className='text-error-500'>
                                                                *
                                                            </h4>
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl className='flex flex-row'>
                                                        <div>
                                                            <Input
                                                                placeholder='Enter brief location description'
                                                                className='font-small text-p tracking-small'
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Map
                                            onPinLocation={handlePinLocation}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div>
                            {errors.invalidText ? (
                                <FormMessage className='text-error-500 text-[16px]'>{`${errors.invalidText.message}`}</FormMessage>
                            ) : (
                                <FormMessage>
                                    <br></br>
                                </FormMessage>
                            )}
                            <div className='flex flex-row mb-5'>
                                <Button className='w-full bg-white mr-3 text-p font-extra-bold tracking-p text-primary-500 border border-primary-500 hover:text-white'>
                                    Preview
                                </Button>
                                <Button className='w-full bg-primary-500 text-p font-extra-bold tracking-p text-white'>
                                    Publish Now
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

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
import React, { useEffect, useState } from 'react';
import { userLogIn } from '@/lib/userLogIn';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';
import { Textarea } from '../ui/textarea';
import { Categories } from './category';
import { DateRangePicker } from './dateRange';
import { DateRange } from 'react-day-picker';
import { Slider } from '@/components/ui/slider';
// import { SliderWorker } from './sliderWorker';
import Map from './mapBox';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { createTask, uploadTaskImage } from '@/lib/createTask';

// changed: picture: z.instanceof(FileList) -> z.any(): enable rendering on client
const formSchema = z.object({
    title: z.string(),
    picture: z.any(),
    // .refine(file => file?.length == 1, 'Picture is required.')
    // .refine(file => {
    //     const fileType = file?.item(0)?.type;
    //     return fileType && /(jpg|jpeg|png)$/i.test(fileType);
    // }, 'Invalid file type. Only JPG, JPEG, and PNG files are allowed.')
    // .refine(file => {
    //     const firstFile = file?.item(0);
    //     return firstFile && firstFile.size <= 20 * 1024 * 1024;
    // }, 'File size exceeds 20MB limit'),
    description: z.string().optional(),
    category: z.string(),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }),
    wages: z.number().optional(),
    sizeOfTeam: z.number().optional(),
    locationName: z.string(),
});

export default function CreateTaskForm() {
    const router = useRouter();

    const defaultDate: DateRange = {
        from: new Date(),
        to: addDays(new Date(), 1),
    };
    const [selectedCategory, setSelectedCategory] = useState('');
    const [date, setDate] = useState<DateRange | undefined>(defaultDate);
    const [days, setDays] = useState(0);
    useEffect(() => {
        if (date && date.from && date.to) {
            const dayCount = differenceInCalendarDays(date.to, date.from);
            setDays(dayCount);
        }
    }, [date]);

    //   const [date, setDate] = useState<DateRange>(defaultDate);
    const handleCategoryToggle = (category: React.SetStateAction<string>) => {
        setSelectedCategory(category);
    };

    const {
        setError,
        formState: { errors },
    } = useForm();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            picture: undefined,
            description: '',
            category: '',
            dateRange: {
                // Set default value for dateRange
                from: new Date(),
                to: addDays(new Date(), 1),
            },
            locationName: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const fileType = values.picture?.item(0)?.type;
        const firstFile = values.picture?.item(0);
        if (
            !(date && date.from && date.to) ||
            !values.picture ||
            selectedCategory == '' ||
            values.wages == undefined ||
            values.sizeOfTeam == undefined ||
            values.locationName == ''
        ) {
            setError('invalidText', {
                type: 'manual',
                message: 'Please complete the required fill(s).',
            });
            return;
        } else if (fileType && /(jpg|jpeg|png)$/i.test(fileType) !== true) {
            setError('invalidText', {
                type: 'manual',
                message: 'Invalid image file type.',
            });
            return;
        } else if (firstFile && firstFile.size > 20 * 1024 * 1024) {
            setError('invalidText', {
                type: 'manual',
                message: 'Image size exceeds the limit.(maximum 20 MB)',
            });
            return;
        }

        console.log(
            values.title,
            values.description,
            date?.from,
            date?.to,
            values.sizeOfTeam,
            values.wages,
            selectedCategory,
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
                values.description ?? '',
                date?.from,
                date?.to,
                values.sizeOfTeam ?? 0,
                values.wages ?? 0,
                selectedCategory,
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
                if (
                    result.error ==
                    'Task validation failed: category: Invalid category'
                ) {
                    setError('invalidText', {
                        type: 'manual',
                        message: 'Invalid category',
                    });
                } else if (
                    result.error ==
                    'Task validation failed: title: Title is required'
                ) {
                    setError('invalidText', {
                        type: 'manual',
                        message: 'Please fill the title',
                    });
                } else if (result.error == 'Internal Server Error') {
                    setError('invalidText', {
                        type: 'manual',
                        message: 'Internal Server Error',
                    });
                }
            } else {
                if (result.task) {
                    console.log(result.task);
                    const imageUploadRes = await uploadTaskImage(
                        result.task._id,
                        0,
                        values.picture,
                    );
                    if (
                        imageUploadRes.message ==
                        'Task image uploaded successfully'
                    ) {
                        console.log('image upload success');
                        router.push('/ads');
                    } else {
                        console.log(imageUploadRes);
                    }
                }
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
            });
            console.error('Unexpected error during creating ads:', error);
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

    return (
        <div className='flex flex-col font-sans ml-20'>
            <h1 className='w-[1000px] h-[80px]'>Create Job Advertisement</h1>
            <div>
                <div className='flex flex-row justify-end'>
                    <p className='text-error-500'>*</p>
                    <p>Required Data</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card className='w-[1000px] p-10'>
                            <CardContent>
                                <div className='grid w-full items-center gap-10'>
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
                                                        <div className='flex flex-row gap-2 items-center'>
                                                            <Input
                                                                className='w-[400px] font-small text-p tracking-small'
                                                                type='file'
                                                                {...form.register(
                                                                    'picture',
                                                                )}
                                                            />
                                                            <div className='flex flex-none text-slate-500'>
                                                                {' '}
                                                                <p>
                                                                    JPG/ JPEG/
                                                                    PNG only
                                                                </p>{' '}
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className='text-[16px]' />
                                                </FormItem>
                                            )}
                                        />
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
                                        <div className='w-1/2 flex flex-col'>
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
                                                                <Categories
                                                                    selectedCategory={
                                                                        selectedCategory
                                                                    }
                                                                    handleCategoryToggle={
                                                                        handleCategoryToggle
                                                                    }
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='w-1/2'>
                                        <div className='flex flex-col gap-[24px]'>
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
                                                                        type='text'
                                                                        onChange={e => {
                                                                            const value =
                                                                                parseFloat(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                );
                                                                            if (
                                                                                !isNaN(
                                                                                    value,
                                                                                )
                                                                            ) {
                                                                                field.onChange(
                                                                                    value,
                                                                                ); // If the value is a valid number, update the field value
                                                                            } else {
                                                                                field.onChange(
                                                                                    '',
                                                                                ); // If the value is not a valid number, clear the field value
                                                                            }
                                                                        }}
                                                                    />
                                                                    <p className='mt-2 ml-2 mr-[80px]'>
                                                                        Baht/Person
                                                                    </p>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                              
                                            
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name='sizeOfTeam'
                                                    render={({ field }) => (
                                                        <FormItem className='flex flex-col'>
                                                            <FormLabel className='text-black font-p text-p tracking-p'>
                                                                <div className='flex flex-row mt-2'>
                                                                    <h4>
                                                                        Size of
                                                                        Team
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
                                                                        type='text'
                                                                        onChange={e => {
                                                                            const value =
                                                                                parseFloat(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                );
                                                                            if (
                                                                                !isNaN(
                                                                                    value,
                                                                                )
                                                                            ) {
                                                                                field.onChange(
                                                                                    value,
                                                                                ); // If the value is a valid number, update the field value
                                                                            } else {
                                                                                field.onChange(
                                                                                    '',
                                                                                ); // If the value is not a valid number, clear the field value
                                                                            }
                                                                        }}
                                                                    />
                                                                    <p className='mt-2 ml-2'>
                                                                        Person(s)
                                                                    </p>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            
                                            </div>
                                            
                                            <FormField
                                                control={form.control}
                                                name='dateRange'
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-col'>
                                                        <FormLabel className='text-black font-p text-p tracking-p'>
                                                            <div className='flex flex-row'>
                                                                <h4>
                                                                    Application Date Range
                                                                </h4>
                                                                <h4 className='text-error-500'>
                                                                    *
                                                                </h4>
                                                            </div>
                                                        </FormLabel>
                                                        <FormControl className='flex flex-row'>
                                                            <div className='font-small text-p tracking-small'>
                                                                <DateRangePicker
                                                                    date={date}
                                                                    setDate={
                                                                        setDate
                                                                    }
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        <div className='w-1/2 flex flex-col'>
                                            {/* <div className='flex flex-col space-y-1.5'>
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
                                                                        type='text'
                                                                        onChange={e => {
                                                                            const value =
                                                                                parseFloat(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                );
                                                                            if (
                                                                                !isNaN(
                                                                                    value,
                                                                                )
                                                                            ) {
                                                                                field.onChange(
                                                                                    value,
                                                                                ); // If the value is a valid number, update the field value
                                                                            } else {
                                                                                field.onChange(
                                                                                    '',
                                                                                ); // If the value is not a valid number, clear the field value
                                                                            }
                                                                        }}
                                                                    />
                                                                    <p className='mt-2 ml-2 mr-[80px]'>
                                                                        Baht/Person
                                                                    </p>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div> */}
                                        </div>

                                        <div className='w-1/2 flex flex-col'>
                                            
                                        </div>
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
                            <div className=' mb-5 mt-5'>
                                {/* <Button className='w-full bg-white mr-3 text-p font-extra-bold tracking-p text-primary-500 border border-primary-500 hover:text-white'>
                                    Preview
                                </Button> */}
                                {errors.invalidText ? (
                                    <FormMessage className='text-error-500 text-[16px] mb-2'>{`${errors.invalidText.message}`}</FormMessage>
                                ) : (
                                    <FormMessage className='text-error-500 text-[16px] mb-2'>
                                        <br></br>
                                    </FormMessage>
                                )}
                                <Button size='m' className='w-full'>
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

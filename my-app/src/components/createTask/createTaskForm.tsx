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
import MapComponent from '../google/map';


const formSchema = z.object({
    title: z.string(),
    wages: z.string(),
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
            wages: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       
    };

    const [position, setPosition] = useState({ lat: 0, lng: 0 });

    const handlePositionChange = (newPosition: {
        lat: number;
        lng: number;
    }) => {
        setPosition(newPosition);
    };

    return (
        <div className='flex flex-col h-screen font-sans ml-20'>
            <h1 className='w-[1000px] h-[80px]'>Create Job Advertisement</h1>
            <div>
            <div className='flex flex-row justify-end'>
                <p className='text-error-500'>*</p><p>Require Data</p>
            </div>
            <Card className='w-[1000px] p-10'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                                        <h4>Title</h4>
                                                        <h4 className='text-error-500'>*</h4>    
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

                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <div className='flex flex-row'>
                                        <h4>Task Picture</h4>
                                        <h4 className='text-error-500'>*</h4>    
                                    </div>
                                    <Input id="picture" type="file" />
                                </div>

                                <h4>Description</h4>
                                <Textarea placeholder='Enter brief task description here...' />
                                
                                <div className="flex">
                                    <div className="w-1/3 flex flex-col">
                                        <div className='flex flex-row mb-5'>
                                            <h4>Category</h4>
                                            <h4 className='text-error-500'>*</h4>    
                                        </div>
                                        <Categories />
                                        
                                        <div className='flex flex-col space-y-1.5'>
                                            <FormField
                                                control={form.control}
                                                name='wages'
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-col'>
                                                        <FormLabel className='text-black font-p text-p tracking-p'>
                                                            <div className='flex flex-row'>
                                                                <h4>Wages</h4>
                                                                <h4 className='text-error-500'>*</h4>    
                                                            </div>
                                                        </FormLabel>
                                                        <FormControl className='flex flex-row'>
                                                            <div>
                                                                <Input
                                                                    placeholder='20,000'
                                                                    className='font-small text-p tracking-small'
                                                                    {...field}
                                                                />
                                                                <p className='my-2'>Baht/Person</p>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                </div>

                                    </div>
                                    <div className="w-2/3">
                                        <div className='flex flex-row'>
                                            <h4>Date Range</h4>
                                            <h4 className='text-error-500'>*</h4>    
                                        </div>
                                        <DateRange />
                                    </div>
                                </div>

                                <div>
                                    <MapComponent onPositionChange={handlePositionChange} />
                                    <p>Latitude: {position.lat}</p>
                                    <p>Longitude: {position.lng}</p>
                                </div>
                                
                                

                            </div>
                        </CardContent>


                        <CardFooter className='grid w-full items-center gap-3'>
                            {errors.invalidText ? (
                                <FormMessage className='text-error-500 text-[16px]'>{`${errors.invalidText.message}`}</FormMessage>
                            ) : (
                                <FormMessage>
                                    <br></br>
                                </FormMessage>
                            )}
                            <Button className='w-full bg-primary-900 text-p font-extra-bold tracking-p text-white'>
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            </div>
        </div>
    );
}
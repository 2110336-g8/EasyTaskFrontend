'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
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
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

import { SignupContext } from '../../context/signupInfoContext';
import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { SignupContextType } from '@/types/auth';

type props = {
    setAuthType: Dispatch<SetStateAction<string>>;
};

const formSchema = z.object({
    firstName: z.string().max(64, {
        message: 'user',
    }),
    lastName: z.string().max(64, {
        message: 'easytask',
    }),
    phoneNumber: z.string().max(64, {
        message: '098-765-4321',
    }),
});

export default function ProfileSetupForm({ setAuthType }: props) {
    const router = useRouter();
    const {
        setError,
        formState: { errors },
    } = useForm();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
    });

    // 2. Define a submit handler.
    const { updateSignupInfo, signupInfo } = React.useContext(
        SignupContext,
    ) as SignupContextType;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // const result = await setupProfile(values.email);
            if (
                values.firstName.trim() === '' ||
                values.lastName.trim() === '' ||
                values.phoneNumber.trim() === ''
            ) {
                setError('invalidText', {
                    type: 'manual',
                    message: 'Please complete the fill.',
                });
            } else if (values.phoneNumber.length < 12) {
                setError('invalidText', {
                    type: 'manual',
                    message: 'Please enter valid phonenumber.',
                });
                return;
            } else {
                console.log('success1');
                updateSignupInfo({
                    email: signupInfo.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: signupInfo.password,
                    phoneNumber: values.phoneNumber.replace(/-/g, ''),
                    bankId: '',
                    bankAccName: '',
                    bankAccNo: '',
                });
                setAuthType('bankAccount');
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

    return (
        <div className='flex flex-col items-center justify-center h-screen font-sans'>
            <img
                        src='/logoEasyTask.jpg'
                        alt='Image'
                        className='image object-cover w-[303px] m-[20px]'
                />
            <Card className='w-[640px] h-[704px] p-10 m-[20px]'>
                <CardHeader className='text-center m-[20px]'>
                    <CardTitle className='font-h1 text-h1 tracking-h1'>Set up your profile</CardTitle>
                    <CardDescription className='font-p text-p tracking-p text-slate-400'>
                        Setting up your profile can gain more opportunities
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className='grid w-full items-center gap-4 m-[20px]'>
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='firstName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-p text-p tracking-p'>
                                                    First name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='font-small text-p tracking-small'
                                                        placeholder='user'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='lastName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-p text-p tracking-p'>Last name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                    className='font-small text-p tracking-small'
                                                        placeholder='easytask'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='phoneNumber'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-p text-p tracking-p'>
                                                    Phone number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='font-small text-p tracking-small'
                                                        placeholder='098-765-4321'
                                                        {...field}
                                                        onChange={e => {
                                                            let rawValue =
                                                                e.target.value;
                                                            // Remove non-digit characters
                                                            rawValue =
                                                                rawValue.replace(
                                                                    /\D/g,
                                                                    '',
                                                                );

                                                            // Limit the maximum length to 10 characters
                                                            rawValue =
                                                                rawValue.slice(
                                                                    0,
                                                                    10,
                                                                );

                                                            // Apply the desired format
                                                            const formattedValue =
                                                                rawValue.replace(
                                                                    /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
                                                                    (
                                                                        _,
                                                                        p1,
                                                                        p2,
                                                                        p3,
                                                                    ) =>
                                                                        [
                                                                            p1,
                                                                            p2,
                                                                            p3,
                                                                        ]
                                                                            .filter(
                                                                                Boolean,
                                                                            )
                                                                            .join(
                                                                                '-',
                                                                            ),
                                                                );

                                                            field.onChange(
                                                                formattedValue,
                                                            );
                                                        }}
                                                        maxLength={12}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className='grid w-full items-center gap-3 m-[20px]'>
                            {errors.invalidText ? (
                                <FormMessage className='text-error-500 text-[16px]'>{`${errors.invalidText.message}`}</FormMessage>
                            ) : (
                                <FormMessage>
                                    <br></br>
                                </FormMessage>
                            )}
                            <Button className='w-full bg-primary-500 text-p font-extra-bold tracking-p text-white'>Next</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}

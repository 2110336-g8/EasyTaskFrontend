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
import { toast } from '../ui/use-toast';
import { SignupContext } from '../../context/signupInfoContext';
import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { SignupContextType } from '@/types/auth';

type props = {
    setAuthType: Dispatch<SetStateAction<string>>;
};

const formSchema = z.object({
    password: z.string(),
    confirmedPassword: z.string(),
});

export default function PasswordForm({ setAuthType }: props) {
    // 1. Define your form.
    const { updateSignupInfo, signupInfo } = React.useContext(
        SignupContext,
    ) as SignupContextType;
    const {
        setError,
        formState: { errors },
    } = useForm();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmedPassword: '',
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const result = values.password === values.confirmedPassword;
            if (!result) {
                setError('invalidText', {
                    type: 'manual',
                    message: 'Your password is not match',
                });
            } else if (values.password.length < 8) {
                setError('invalidText', {
                    type: 'manual',
                    message: 'Password must be at least 8 characters',
                });
            } else {
                console.log('success1');
                updateSignupInfo({
                    email: signupInfo.email,
                    firstName: '',
                    lastName: '',
                    password: values.password,
                    phoneNumber: '',
                    bankId: '',
                    bankAccName: '',
                    bankAccNo: '',
                });
                setAuthType('profileSetup');
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
        <div className='flex items-center justify-center h-screen font-sans'>
            <Card className='w-[640px] p-10'>
                <CardHeader className='text-center'>
                    <CardTitle className='font-h1 text-h1 tracking-h1'>
                        Password
                    </CardTitle>
                    <CardDescription className='font-p text-p tracking-p text-slate-400'>
                        You can log in again with this password
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className='grid w-full items-center gap-4'>
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-p text-p tracking-p'>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='font-small text-p tracking-small'
                                                        type='password'
                                                        placeholder='Enter your password'
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
                                        name='confirmedPassword'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-p text-p tracking-p'>
                                                    Confirm your password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='font-small text-p tracking-small'
                                                        type='password'
                                                        placeholder='Enter your password again'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
                                Next
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}

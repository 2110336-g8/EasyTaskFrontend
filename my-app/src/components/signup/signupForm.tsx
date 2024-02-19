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
import { emailVerification } from '@/lib/signupEmail';

import { SignupContext } from '../../context/signupInfoContext';
import React from 'react';

import { Dispatch, SetStateAction } from 'react';
import { SignupContextType } from '@/types/auth';

type SignupFormProps = {
    setAuthType: Dispatch<SetStateAction<string>>;
};

const formSchema = z.object({
    email: z.string(),
});
export default function SignupForm({ setAuthType }: SignupFormProps) {
    const router = useRouter();
    const {
        setError,
        formState: { errors },
    } = useForm();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    const { updateSignupInfo } = React.useContext(
        SignupContext,
    ) as SignupContextType;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const result = await emailVerification(values.email);
            if (result?.error) {
                console.error('Authentication failed:', result.error);
                if (result.error === 'Cannot Create OTP Error') {
                    setError('invalidText', {
                        type: 'manual',
                        message: result.details,
                    });
                } else if (result.error === 'Validation Error') {
                    setError('invalidText', {
                        type: 'manual',
                        message: 'Please enter valid email',
                    });
                }
            } else {
                console.log('success1');
                updateSignupInfo({
                    email: values.email,
                    firstName: '',
                    lastName: '',
                    password: '',
                    phoneNumber: '',
                    bankId: '',
                    bankAccName: '',
                    bankAccNo: '',
                });
                setAuthType('verification');
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
        <div className='flex'>
            <div className='left-side w-1/2 h-full'>
                <div className='flex flex-col items-center justify-center h-screen font-sans'>
                <img
                        src='/logoEasyTask.jpg'
                        alt='Image'
                        className='image object-cover w-[303px] m-[20px]'
                />
                    <Card className='w-[640px] h-[600px] p-10 m-[20px]'>
                        <CardHeader className='text-center m-[20px]'>
                            <CardTitle className='font-h1 text-h1 tracking-h1'>Sign up</CardTitle>
                            <CardDescription className='font-p text-p tracking-p text-slate-400'>Welcome to Easy Task</CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent>
                                    <div className='grid w-full items-center gap-4 m-[20px]'>
                                        <div className='flex flex-col space-y-1.5'>
                                            <FormField
                                                control={form.control}
                                                name='email'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className='font-p text-p tracking-p'>Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className='font-small text-p tracking-small'
                                                                placeholder='user.easytask@email.com'
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
                                <CardFooter className='grid w-full items-center gap-3 m-[20px]'>
                                    {errors.invalidText ? (
                                        <FormMessage className='text-error-500 text-[16px]'>{`${errors.invalidText.message}`}</FormMessage>
                                    ) : (
                                        <FormMessage>
                                            <br></br>
                                        </FormMessage>
                                    )}
                                    <Button className='w-full bg-primary-500 text-p font-extra-bold tracking-p text-white'>
                                        Verify your email
                                    </Button>
                                    <CardDescription className='text-slate-500 text-[16px]'>
                                        Already have an account?{' '}
                                        <a
                                            href='/login'
                                            className='text-primary-700 font-bold hover:text-originalColor'
                                        >
                                            Log in
                                        </a>
                                    </CardDescription>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
            </div>
            <div className='right-side w-1/2 h-full'>
                <img
                        src='/signupPic.jpg'
                        alt='Image'
                        className='image object-cover h-full w-full'
                />
            </div>
        </div>
    );
}

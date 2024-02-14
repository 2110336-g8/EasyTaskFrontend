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
import { Label } from '@/components/ui/label';

import { useRouter } from 'next/navigation';
import { SignupContextType, ISignupInfo } from '@/types/signup';
import { SignupContext } from '../../context/signupInfoContext';
import { emailVerification } from '@/lib/signupEmail';
import React from 'react';
import { toast } from '../ui/use-toast';
import { Dispatch, SetStateAction } from 'react';
import { otpVerification } from '@/lib/OTPVerification';

type SignupFormProps = {
    setAuthType: Dispatch<SetStateAction<string>>;
};

const formSchema = z.object({
    otp1: z.string().max(1, {
        message: '',
    }),
    otp2: z.string().max(1, {
        message: '',
    }),
    otp3: z.string().max(1, {
        message: '',
    }),
    otp4: z.string().max(1, {
        message: '',
    }),
    otp5: z.string().max(1, {
        message: '',
    }),

    otp6: z.string().max(1, {
        message: '',
    }),
});

export default function VerificationForm({ setAuthType }: SignupFormProps) {
    const {
        setError,
        formState: { errors },
    } = useForm();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
            otp5: '',
            otp6: '',
        },
    });
    const { signupInfo } = React.useContext(SignupContext) as SignupContextType;
    console.log(signupInfo);

    // const email = useGlobalState();
    // 2. Define a submit handler.

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const combinedOTP = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}${values.otp5}${values.otp6}`;
            console.log(combinedOTP);
            const result = await otpVerification(signupInfo.email, combinedOTP);
            if (result?.error) {
                console.error('Authentication failed:', result.error);
                if (result.error === 'Failed to verify OTP') {
                    setError('invalidText', {
                        type: 'manual',
                        message: 'Failed to verify OTP, Please try again',
                    });
                }
            } else {
                console.log('success1');
                setAuthType('password');
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

    async function handleResendCode() {
        // Logic for the second button (Resend code)
        console.log('Resending code...');
        try {
            const result = await emailVerification(signupInfo.email);
            if (result?.error) {
                console.error('Authentication failed:', result.error);
                if (result.error === 'Cannot Create OTP Error') {
                    setError('invalidText', {
                        type: 'manual',
                        message: result.details,
                    });
                }
            } else {
                console.log('success1');

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
    }

    return (
        <div className='flex items-center justify-center h-screen font-sans'>
            <Card className='w-[500px] p-10'>
                <CardHeader className='text-center'>
                    <CardTitle className='font-h1 text-h1 tracking-h1'>Verification</CardTitle>
                    <CardDescription className='font-p text-p tracking-p text-slate-400'>
                        Please enter code in your email for verification
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className='flex space-x-4'>
                                {/* First Field */}
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='otp1'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p'
                                                        maxLength={1}
                                                        placeholder=''
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Second Field */}
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='otp2'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p'
                                                        type='text'
                                                        pattern='[0-9]'
                                                        maxLength={1}
                                                        placeholder=''
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Third Field */}
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='otp3'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p'
                                                        type='text'
                                                        pattern='[0-9]'
                                                        maxLength={1}
                                                        placeholder=''
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Fourth Field */}
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='otp4'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p'
                                                        maxLength={1}
                                                        placeholder=''
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Fifth Field */}
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='otp5'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p'
                                                        maxLength={1}
                                                        placeholder=''
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Sixth Field */}
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='otp6'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p'
                                                        maxLength={1}
                                                        placeholder=''
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
                            <Button type='submit' className='w-full bg-primary-900 text-p font-extra-bold tracking-p text-white'>
                                Done
                            </Button>
                            <Button
                                type='button'
                                onClick={handleResendCode}
                                className='w-full bg-color-white border border-primary-300 text-primary-300 hover:bg-primary-500 hover:text-white'
                            >
                                Resend code
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}

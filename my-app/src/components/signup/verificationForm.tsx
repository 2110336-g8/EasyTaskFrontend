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

import { SignupContext } from '../../context/signupInfoContext';
import { emailVerification } from '@/lib/signupEmail';
import { toast } from '../ui/use-toast';
import { Dispatch, SetStateAction } from 'react';
import { otpVerification } from '@/lib/OTPVerification';
import { SignupContextType } from '@/types/auth';
import React, { useState , useEffect} from 'react';

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
        handleSubmit
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

    const [showButtonA, setShowButtonA] = useState(true);
    const [showCountdown, setShowCountdown] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [prevOTP,setPrevOTP] = useState('');
    const [countdownStarted, setCountdownStarted] = useState(false);
    const [started, setStarted] = useState(false);

    // useEffect(() => {
    //     console.log("countdownStarted value:", countdownStarted);
    //     if (!countdownStarted) {
    //         // setCountdownStarted(true);
    //         startCountdown();
    //         console.log('start');
    //     }
    // },[]);

    if (!countdownStarted) {
        startCountdown();
        setCountdownStarted(true);
        console.log('start');
    }
    
    useEffect(() => {

        const isAllFieldsFilled = Object.values(form.getValues()).every(value => value !== '');
        const allValues = Object.values(form.getValues());
        const combinedValues = allValues.join('');
        const isNewOTP = prevOTP != combinedValues;

        console.log(combinedValues);
        console.log(isAllFieldsFilled);
        if (isAllFieldsFilled && isNewOTP) {
            setPrevOTP(combinedValues);
            form.handleSubmit(onSubmit)();
        }
    }, [form.watch()]);
    
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

    async function startCountdown() {
        setShowButtonA(true);
        setShowCountdown(true);
        setIsButtonDisabled(true);
        setCountdownStarted(true);
;       setSeconds(60);
    
        const countdownInterval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    clearInterval(countdownInterval);
                    setShowButtonA(true);
                    setShowCountdown(false);
                    setIsButtonDisabled(false);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);
    }

    async function handleResendCode() {
        // Logic for the second button (Resend code)
        console.log('Resending code...');
        try {
            const result = await emailVerification(signupInfo.email);
            startCountdown();
            if (result?.error) {
                console.error('Authentication failed:', result.error);
                if (result.details === 'This email alredy generated otp less than 1 min, Please try again later') {
                    setError('invalidText', {
                        type: 'manual',
                        message: result.details,
                    });
                }
            } else {
                console.log('success1');
                
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
        <div className='flex flex-col items-center justify-center h-screen font-sans'>
            <img
                        src='/logoEasyTask.jpg'
                        alt='Image'
                        className='image object-cover w-[303px] m-[20px]'
                />
            <Card className='w-[640px] h-[600px] p-10'>
                <CardHeader className='text-center m-[20px]'>
                    <CardTitle className='font-h1 text-h1 tracking-h1'>Verification</CardTitle>
                    <CardDescription className='font-p text-p tracking-p text-slate-400'>
                        Please enter code in your email for verification
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className='flex flex-row gap-[30px] h-[56px]'>
                                {/* First Field */}
                                    <FormField
                                        control={form.control}
                                        name='otp1'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p h-full w-[56px] text-center align-middle'
                                                        maxLength={1}
                                                        placeholder=''
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                {/* Second Field */}
                                    <FormField
                                        control={form.control}
                                        name='otp2'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p h-full w-[56px] text-center align-middle'
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

                                {/* Third Field */}
                                    <FormField
                                        control={form.control}
                                        name='otp3'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p h-full w-[56px] text-center align-middle'
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

                                {/* Fourth Field */}
                                    <FormField
                                        control={form.control}
                                        name='otp4'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p h-full w-[56px] text-center align-middle'
                                                        maxLength={1}
                                                        placeholder=''
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                {/* Fifth Field */}
                                    <FormField
                                        control={form.control}
                                        name='otp5'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p h-full w-[56px] text-center align-middle'
                                                        maxLength={1}
                                                        placeholder=''
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                {/* Sixth Field */}
                                    <FormField
                                        control={form.control}
                                        name='otp6'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='text-p h-full w-[56px] text-center align-middle'
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
                        </CardContent>

                        <CardFooter className='grid w-full items-center gap-3 mt-[40px]'>
                            {errors.invalidText ? (
                                <FormMessage className='text-error-500 text-[16px]'>{`${errors.invalidText.message}`}</FormMessage>
                            ) : (
                                <FormMessage>
                                    <br></br>
                                </FormMessage>
                            )}
                            {showCountdown && (
                                <div >
                                <p className="text-error-500 text-right">{seconds} s</p>
                                </div> 
                            )}
                            {showButtonA && (
                                <Button
                                onClick={handleResendCode}
                                className={`w-full bg-primary-500 text-p font-extra-bold tracking-p text-white ${showCountdown ? 'w-full bg-slate-400 text-p font-extra-bold tracking-p text-cursor-not-allowed' : ''}`}
                                disabled={isButtonDisabled}
                                >
                                Resend code
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}

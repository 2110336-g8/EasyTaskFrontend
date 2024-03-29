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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from '../ui/use-toast';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SignupContext } from '@/context/signupInfoContext';
import React from 'react';
import { setupProfile } from '@/lib/setupProfile';
import { useRouter } from 'next/navigation';
import { getAllBanks } from '@/lib/getAllBanks';
import { Bank } from '@/types/bank';
import { SignupContextType } from '@/types/auth';

type props = {
    setAuthType: Dispatch<SetStateAction<string>>;
};

const formSchema = z.object({
    bankId: z.string(),
    accountName: z.string(),
    accountNumber: z.string(),
});

export default function BankAccountForm({ setAuthType }: props) {
    // 1. Define your form.
    const router = useRouter();

    const [banks, setBanks] = useState<Bank[]>([]);
    console.log(banks);

    useEffect(() => {
        // Fetch banks when component mounts
        getAllBanks()
            .then(response => {
                setBanks(response.banks);
            })
            .catch(error => {
                console.error('Error fetching banks:', error);
            });
    }, []);

    const {
        setError,
        formState: { errors },
    } = useForm();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bankId: '',
            accountName: '',
            accountNumber: '',
        },
    });

    const { updateSignupInfo, signupInfo } = React.useContext(
        SignupContext,
    ) as SignupContextType;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            if (
                values.bankId.trim() === '' ||
                values.accountName.trim() === '' ||
                values.accountNumber.trim() === ''
            ) {
                setError('invalidText', {
                    type: 'manual',
                    message: 'Please complete the fill.',
                });
                return;
            } else if (values.accountNumber.length < 13) {
                setError('invalidText', {
                    type: 'manual',
                    message: 'Please enter valid account number.',
                });
                return;
            }
            const result = await setupProfile(
                signupInfo.email,
                signupInfo.firstName,
                signupInfo.lastName,
                signupInfo.password,
                signupInfo.phoneNumber,
                values.bankId,
                values.accountName,
                values.accountNumber.replace(/-/g, ''),
            );
            if (result?.error) {
                console.error('Registration failed:', result.details);
                if (result.details === 'Email is not verified') {
                    setError('restartText', {
                        type: 'manual',
                        message: 'Email verification has expired, please ',
                    });
                } else {
                    setError('invalidText', {
                        type: 'manual',
                        message: result.details,
                    });
                }
            } else {
                console.log('success1');
                updateSignupInfo({
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    phoneNumber: '',
                    bankId: '',
                    bankAccName: '',
                    bankAccNo: '',
                });
                router.push('/');
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

    async function handleSkipForNow() {
        try {
            const result = await setupProfile(
                signupInfo.email,
                signupInfo.firstName,
                signupInfo.lastName,
                signupInfo.password,
                signupInfo.phoneNumber,
            );
            if (result?.error) {
                console.error('Registration failed:', result.details);
                if (result.details === 'Email is not verified') {
                    setError('restartText', {
                        type: 'manual',
                        message: 'Email verification has expired, please ',
                    });
                } else {
                    setError('invalidText', {
                        type: 'manual',
                        message: result.details,
                    });
                }
            } else {
                updateSignupInfo({
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    phoneNumber: '',
                    bankId: '',
                    bankAccName: '',
                    bankAccNo: '',
                });
                router.push('/');
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

    async function handleTryAgain() {
        setAuthType('email');
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen font-sans'>
            <img
                src='/logoEasyTask.jpg'
                alt='Image'
                className='image object-cover w-[303px] m-[20px]'
            />
            <Card className='w-[640px] h-[600px] p-10 m-[20px]'>
                <CardHeader className='text-center m-[20px]'>
                    <CardTitle className='font-h1 text-h1 tracking-h1'>
                        Bank account
                    </CardTitle>
                    <CardDescription className='font-p text-p tracking-p text-slate-400'>
                        You will receive work wages cia this bank account
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className='grid w-full items-center gap-4'>
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='bankId'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-p text-p tracking-p'>
                                                    Bank name
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder='Please select bank name' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {banks.map(bank => (
                                                            <SelectItem
                                                                key={bank.id}
                                                                value={bank.id}
                                                            >
                                                                <img
                                                                    src={
                                                                        bank.url
                                                                    }
                                                                    alt={
                                                                        bank.name
                                                                    }
                                                                    className='w-6 h-6 mr-2 inline-block'
                                                                />
                                                                {bank.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className='text-xs' />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='accountName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-p text-p tracking-p'>
                                                    Account name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='font-small text-p tracking-small'
                                                        placeholder='User Easytask'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className='text-xs' />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='accountNumber'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-p text-p tracking-p'>
                                                    Account number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='font-small text-p tracking-small'
                                                        placeholder='012-3-45678-9'
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
                                                                    /^(\d{0,3})(\d{0,1})(\d{0,5})(\d{0,5})$/,
                                                                    (
                                                                        _,
                                                                        p1,
                                                                        p2,
                                                                        p3,
                                                                        p4,
                                                                    ) =>
                                                                        [
                                                                            p1,
                                                                            p2,
                                                                            p3,
                                                                            p4,
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
                                                        maxLength={13} // Set maxLength to 12 to account for the hyphens in the format
                                                    />
                                                </FormControl>
                                                <FormMessage className='text-xs' />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className='grid w-full items-center gap-3'>
                            {errors.invalidText ? (
                                <FormMessage className='text-error-500 text-[16px]'>{`${errors.invalidText.message}`}</FormMessage>
                            ) : errors.restartText ? (
                                <FormMessage>
                                    {`${errors.restartText.message}`}
                                    <a
                                        className='text-error-500 text-[16px] underline cursor-pointer hover:text-originalColor'
                                        onClick={handleTryAgain}
                                    >
                                        try again
                                    </a>
                                </FormMessage>
                            ) : (
                                <FormMessage>
                                    <br></br>
                                </FormMessage>
                            )}
                            <Button className='w-full bg-primary-500 text-p font-extra-bold tracking-p text-white'>
                                Done
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            <a
                className='underline cursor-pointer hover:text-originalColor font-p text-p tracking-p text-slate-400'
                onClick={handleSkipForNow}
            >
                Skip for now
            </a>
        </div>
    );
}

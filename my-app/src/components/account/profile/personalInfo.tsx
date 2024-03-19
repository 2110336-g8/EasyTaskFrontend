'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { instance } from '@/utils/axiosInstance';
import { clientStorage } from '@/utils/storageService';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientRequest } from 'http';
import { Pencil, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

interface PersonalData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export default function PersonalInfo() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [isEditing, setEditing] = useState(false);

    const schema: ZodType<PersonalData> = z
        .object({
            firstName: z.string().max(64, {
                message: 'First name cannot be longer than 64 characters',
            }),
            lastName: z.string().max(64, {
                message: 'Last name cannot be longer than 64 characters',
            }),
            phoneNumber: z.string(),
        })
        .refine(data => [0, 12].includes(data.phoneNumber.length), {
            message: 'Please fill a valid phone number',
            path: ['phoneNumber'],
        });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
    });

    useEffect(() => {
        const user = clientStorage.get().user;
        if (!user) {
            return;
        }
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhoneNumber(user.phoneNumber ?? '');
    }, []);

    useEffect(() => {
        form.reset();
    }, [isEditing]);

    const submitData = async (values: z.infer<typeof schema>) => {
        const data = form.getValues();
        const toUpdate = {
            firstName,
            lastName,
            phoneNumber,
        };
        if (data.firstName.trim()) {
            toUpdate.firstName = data.firstName.trim();
        }
        if (data.lastName.trim()) {
            toUpdate.lastName = data.lastName.trim();
        }
        if (data.phoneNumber.trim()) {
            toUpdate.phoneNumber = data.phoneNumber.replace(/-/g, '');
        }
        try {
            const user = clientStorage.get().user;
            const res = await instance.patch(`v1/users/${user?._id}`, toUpdate);
            clientStorage.set({
                user: res.data.user,
                token: clientStorage.get().token,
            });
            window.location.reload();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: `${(error as any).response.data.error}`,
            });
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(submitData)}
            className='w-full flex flex-col gap-y-[16px]'
        >
            <div className='w-full flex flex-row justify-between'>
                <h3>Personal Information</h3>
                {isEditing ? (
                    <div className='flex flex-row gap-x-[8px]'>
                        <Button
                            type='button'
                            onClick={() => {
                                setEditing(false);
                            }}
                            className='size-[36px] p-0'
                            variant='gray'
                        >
                            <X className='size-[24px]'></X>
                        </Button>
                        <Button
                            type='submit'
                            className='size-[36px] p-0'
                            variant='default'
                        >
                            <Save className='size-[24px]'></Save>
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            type='button'
                            onClick={() => {
                                setEditing(true);
                            }}
                            className='size-[36px] p-0'
                            variant='default'
                        >
                            <Pencil className='size-[24px]'></Pencil>
                        </Button>
                    </div>
                )}
            </div>
            <div className='w-full'>
                {isEditing ? (
                    <Form {...form}>
                        <div className='w-full flex flex-col gap-y-[8px]'>
                            <FormField
                                control={form.control}
                                name='firstName'
                                render={({ field }) => (
                                    <FormItem className='w-full grid grid-cols-3 gap-[16px] items-center'>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl className='col-span-2'>
                                            <Input
                                                placeholder={firstName}
                                                disabled={!isEditing}
                                                {...form.register('firstName')}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.firstName && (
                                <p className='text-error-500'>
                                    {form.formState.errors.firstName.message}
                                </p>
                            )}
                            <FormField
                                control={form.control}
                                name='lastName'
                                render={({ field }) => (
                                    <FormItem className='w-full grid grid-cols-3 gap-[16px] items-center'>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl className='col-span-2'>
                                            <Input
                                                placeholder={lastName}
                                                disabled={!isEditing}
                                                {...form.register('lastName')}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.lastName && (
                                <p className='text-error-500'>
                                    {form.formState.errors.lastName.message}
                                </p>
                            )}
                            <FormField
                                control={form.control}
                                name='phoneNumber'
                                render={({ field }) => (
                                    <FormItem className='w-full grid grid-cols-3 gap-[16px] items-center'>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl className='col-span-2'>
                                            <Input
                                                placeholder={phoneNumber.replace(
                                                    /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
                                                    (_, p1, p2, p3) =>
                                                        [p1, p2, p3]
                                                            .filter(Boolean)
                                                            .join('-'),
                                                )}
                                                disabled={!isEditing}
                                                {...form.register(
                                                    'phoneNumber',
                                                )}
                                                {...field}
                                                onChange={e => {
                                                    let rawValue =
                                                        e.target.value;
                                                    // Remove non-digit characters
                                                    rawValue = rawValue.replace(
                                                        /\D/g,
                                                        '',
                                                    );

                                                    // Limit the maximum length to 10 characters
                                                    rawValue = rawValue.slice(
                                                        0,
                                                        10,
                                                    );

                                                    // Apply the desired format
                                                    const formattedValue =
                                                        rawValue.replace(
                                                            /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
                                                            (_, p1, p2, p3) =>
                                                                [p1, p2, p3]
                                                                    .filter(
                                                                        Boolean,
                                                                    )
                                                                    .join('-'),
                                                        );
                                                    field.onChange(
                                                        formattedValue,
                                                    );
                                                }}
                                                maxLength={12}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.phoneNumber && (
                                <p className='text-error-500'>
                                    {form.formState.errors.phoneNumber.message}
                                </p>
                            )}
                        </div>
                    </Form>
                ) : (
                    <div className='w-full grid grid-cols-3 gap-x-[16px] gap-y-[24px] pt-[12px] item-center'>
                        <p>First Name</p>
                        <p className='col-span-2 text-slate-500'>{firstName}</p>
                        <p>Last Name</p>
                        <p className='col-span-2 text-slate-500'>{lastName}</p>
                        <p>Phone Number</p>
                        <p className='col-span-2 text-slate-500'>
                            {phoneNumber.replace(
                                /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
                                (_, p1, p2, p3) =>
                                    [p1, p2, p3].filter(Boolean).join('-'),
                            )}
                        </p>
                    </div>
                )}
            </div>
        </form>
    );
}

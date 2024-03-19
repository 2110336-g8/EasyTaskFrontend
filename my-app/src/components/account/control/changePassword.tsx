'use client';

import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { instance } from '@/utils/axiosInstance';
import { clientStorage } from '@/utils/storageService';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export default function ChangePasssword() {
    const schema: ZodType<ChangePasswordData> = z
        .object({
            currentPassword: z.string().min(1, 'Please complete the fill'),
            newPassword: z
                .string()
                .min(1, 'Please complete the fill')
                .min(8, 'Password must be long at least 8 characters'),
            confirmNewPassword: z.string().min(1, 'Please complete the fill'),
        })
        .refine(data => data.newPassword === data.confirmNewPassword, {
            message: 'Password confirmation does not match',
            path: ['confirmNewPassword'],
        });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const submitData = async (values: z.infer<typeof schema>) => {
        try {
            const user = clientStorage.get().user;
            if (!user) {
                throw Error('Current User Not Found');
            }
            const passwords = {
                currentPassword: form.getValues('currentPassword'),
                newPassword: form.getValues('newPassword'),
            };
            await instance.patch(
                `v1/users/${user._id}/change-password`,
                passwords,
            );
            toast({
                variant: 'default',
                title: 'User data updated!',
                description: 'Your password has been updated',
            });
            form.reset();
        } catch (error) {
            if ((error as any).response.data.error == 'Unauthorized') {
                form.setError('currentPassword', {
                    type: 'custom',
                    message: 'Wrong current password',
                });
                return;
            }
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: `${(error as any).response.data.error}`,
            });
        }
    };

    const getError = (): ReactNode => {
        const errors = form.formState.errors;
        if (errors.currentPassword) {
            return (
                <p className='text-error-500'>
                    {errors.currentPassword.message}
                </p>
            );
        } else if (errors.newPassword) {
            return (
                <p className='text-error-500'>{errors.newPassword.message}</p>
            );
        } else if (errors.confirmNewPassword) {
            return (
                <p className='text-error-500'>
                    {errors.confirmNewPassword.message}
                </p>
            );
        }
        return <></>;
    };

    return (
        <form
            onSubmit={form.handleSubmit(submitData)}
            className='w-full flex flex-col gap-y-[16px]'
        >
            <h2>Reset your password</h2>
            <Form {...form}>
                <div className='w-full flex flex-col gap-y-[8px]'>
                    <FormField
                        control={form.control}
                        name='currentPassword'
                        render={({ field }) => (
                            <FormItem className='w-full grid grid-cols-3 gap-[16px] items-center'>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl className='col-span-2'>
                                    <Input
                                        type='password'
                                        {...form.register('currentPassword')}
                                    ></Input>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='newPassword'
                        render={({ field }) => (
                            <FormItem className='w-full grid grid-cols-3 gap-[16px] items-center'>
                                <FormLabel>New Password</FormLabel>
                                <FormControl className='col-span-2'>
                                    <Input
                                        type='password'
                                        {...form.register('newPassword')}
                                    ></Input>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmNewPassword'
                        render={({ field }) => (
                            <FormItem className='w-full grid grid-cols-3 gap-[16px] items-center'>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl className='col-span-2'>
                                    <Input
                                        type='password'
                                        {...form.register('confirmNewPassword')}
                                    ></Input>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
            <Button
                type='submit'
                size='sm'
                className='w-[168px] text-slate-50 bg-primary-500'
            >
                Update password
            </Button>
            {getError()}
        </form>
    );
}

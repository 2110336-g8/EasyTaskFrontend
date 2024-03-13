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
import { zodResolver } from '@hookform/resolvers/zod';
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
            currentPassword: z.string(),
            newPassword: z
                .string()
                .min(8, 'Password must be long at least 8 characters'),
            confirmNewPassword: z.string(),
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

    const submitData = async (values: z.infer<typeof schema>) => {};

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
                    {form.formState.errors.currentPassword && (
                        <p className='text-error-500'>
                            {form.formState.errors.currentPassword.message}
                        </p>
                    )}
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
                    {form.formState.errors.newPassword && (
                        <p className='text-error-500'>
                            {form.formState.errors.newPassword.message}
                        </p>
                    )}
                    <FormField
                        control={form.control}
                        name='newPassword'
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
                    {form.formState.errors.confirmNewPassword && (
                        <p className='text-error-500'>
                            {form.formState.errors.confirmNewPassword.message}
                        </p>
                    )}
                </div>
            </Form>
            <Button className='w-[168px] text-button font-button text-slate-50 bg-primary-500'>
                Update password
            </Button>
        </form>
    );
}

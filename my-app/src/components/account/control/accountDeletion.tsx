'use client';

import { Button } from '@/components/ui/button';
import {
    DialogHeader,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

interface DeleteAccountData {
    password: string;
}

export default function AccountDeletion() {
    const schema: ZodType<DeleteAccountData> = z.object({
        password: z.string().min(1, 'Please enter the password'),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: '',
        },
    });

    const submitData = async (values: z.infer<typeof schema>) => {};

    return (
        <form
            onSubmit={form.handleSubmit(submitData)}
            className='w-full flex flex-col gap-y-[16px]'
        >
            <h2>Account Deletion</h2>
            <p className='text-slate-500'>
                Your account will be permanently deleted and CANNOT be undone
            </p>
            <Dialog>
                <DialogTrigger type='button' className='w-[168px]'>
                    <Button variant='destructive' className='w-full'>
                        Delete Account
                    </Button>
                </DialogTrigger>
                <DialogContent className='rounded-[8px]  border-slate-300'>
                    <DialogHeader className='flex flex-col text-left'>
                        <DialogTitle className='text-h3'>
                            Are you absolutely sure?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className='text-error-500'>
                        After this action your account will be permanently
                        deleted and CANNOT be undone.
                    </DialogDescription>
                    <Form {...form}>
                        <div className='w-full flex flex-col gap-y-[8px]'>
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem className='w-full gap-[16px] items-center'>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='Enter your password to delete account'
                                                {...form.register('password')}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </Form>
                    <DialogFooter className='flex flex-row justify-end gap-[8px]'>
                        <DialogClose asChild>
                            <Button variant='secondary'>Cancel</Button>
                        </DialogClose>
                        <Button variant='destructive'>Delete Account</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    );
}

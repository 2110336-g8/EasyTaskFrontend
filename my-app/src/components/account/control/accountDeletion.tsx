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
import { toast } from '@/components/ui/use-toast';
import { instance } from '@/utils/axiosInstance';
import { clientStorage } from '@/utils/storageService';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

interface DeleteAccountData {
    password: string;
}

export default function AccountDeletion() {
    const schema: ZodType<DeleteAccountData> = z.object({
        password: z.string(),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: '',
        },
    });

    const submitData = async (values: z.infer<typeof schema>) => {
        try {
            const userId = clientStorage.get().user._id;
            if (!userId) {
                throw Error('Current user not found');
            }
            await instance.delete(`v1/users/${userId}`, {
                data: { password: form.getValues('password') },
            });
            clientStorage.remove();
            window.location.reload();
        } catch (error) {
            console.log(error);
            if ((error as any).response.data.error == 'Unauthorized') {
                form.setError('password', {
                    type: 'custom',
                    message: 'Wrong password',
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

    return (
        <form
            onSubmit={form.handleSubmit(submitData)}
            className='w-full flex flex-col gap-y-[16px]'
            id='my-form'
        >
            <h2>Account Deletion</h2>
            <p className='text-slate-500'>
                Your account will be permanently deleted and CANNOT be undone
            </p>
            <Dialog>
                <DialogTrigger type='button' className='w-[168px]'>
                    <Button
                        variant='destructive'
                        className='w-full'
                        size='sm'
                        type='button'
                    >
                        Delete Account
                    </Button>
                </DialogTrigger>
                <DialogContent className='rounded-[8px]  border-slate-300'>
                    <DialogHeader className='flex flex-col text-left'>
                        <DialogTitle className='text-h3'>
                            Are you absolutely sure?
                        </DialogTitle>
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
                                                    {...form.register(
                                                        'password',
                                                    )}
                                                ></Input>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {form.formState.errors.password && (
                                    <p className='text-error-500'>
                                        {form.formState.errors.password.message}
                                    </p>
                                )}
                            </div>
                        </Form>
                    </DialogHeader>
                    <DialogFooter className='flex flex-row justify-end gap-[8px]'>
                        <DialogClose asChild>
                            <Button variant='secondary' size='sm' type='button'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant='destructive'
                            size='sm'
                            type='submit'
                            form='my-form'
                        >
                            Delete Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    );
}

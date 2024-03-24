'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
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
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { User } from '@/types/user';
import { instance, instanceBinary } from '@/utils/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, RefreshCcw, Save, Trash, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { clientStorage } from '@/utils/storageService';

interface UserImage {
    file: FileList;
}

function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach(image =>
        dataTransfer.items.add(image),
    );

    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return displayUrl;
}

export default function ProfilePicture() {
    const [currentimageURL, setCurrentImageURL] = useState('');
    const [preview, setPreview] = useState('');

    const [isEditing, setEditing] = useState(false);

    const schema: ZodType<UserImage> = z.object({
        file: z
            .instanceof(FileList)
            .refine(file => file?.length == 1, 'File is required.')
            .refine(file => {
                const fileType = file?.item(0)?.type;
                return fileType && /(jpg|jpeg|png)$/i.test(fileType);
            }, 'Invalid file type. Only JPG, JPEG, and PNG files are allowed.')
            .refine(file => {
                const firstFile = file?.item(0);
                return firstFile && firstFile.size <= 5 * 1024 * 1024;
            }, 'File size exceeds 5MB limit'),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            file: undefined,
        },
    });

    useEffect(() => {
        const fetchUser = async () => {
            const user = clientStorage.get().user;
            if (!user) {
                return;
            }
            try {
                const res = await instance.get(
                    `v1/users/${user._id}/profile-image`,
                );
                setCurrentImageURL(res.data);
            } catch (error) {
                setCurrentImageURL('');
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        form.reset();
        setPreview('');
    }, [isEditing]);

    const submitData = async (values: z.infer<typeof schema>) => {
        try {
            const user = clientStorage.get().user;
            if (!user) {
                return;
            }
            const file = form.getValues().file[0];
            console.log(file.type);
            const fileData = Buffer.from(await file.arrayBuffer());
            await instanceBinary.post(
                `v1/users/${user._id}/profile-image`,
                fileData,
                {
                    headers: { 'Content-Type': file.type },
                    maxBodyLength: Infinity,
                    maxContentLength: Infinity,
                    responseType: 'json',
                },
            );
            window.location.reload();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: `${(error as any).response.data.error}`,
            });
        }
    };

    const deletePicture = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const user = clientStorage.get().user;
            if (!user) {
                return;
            }
            await instance.delete(`/v1/users/${user._id}/profile-image`);
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
                <h3>Profile Picture</h3>
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
            <div className='w-full flex flex-col items-center justify-center gap-y-[16px]'>
                {isEditing ? (
                    <>
                        <Image
                            className='size-[160px] rounded-[80px] object-cover'
                            src={
                                preview === ''
                                    ? currentimageURL === ''
                                        ? '/ProfilePicEmpty.png'
                                        : currentimageURL
                                    : preview
                            }
                            alt=''
                            width={160}
                            height={160}
                            priority
                        ></Image>
                        <Form {...form}>
                            <div className='flex flex-row gap-x-[8px] items-center'>
                                {preview != '' && (
                                    <Button
                                        type='button'
                                        onClick={() => {
                                            form.reset();
                                            setPreview('');
                                        }}
                                        className='h-[36px] px-[8px] gap-[8px]'
                                        variant='gray'
                                    >
                                        <RefreshCcw className='size-[24px]'></RefreshCcw>
                                    </Button>
                                )}
                                {preview == '' && currentimageURL != '' && (
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button
                                                type='button'
                                                className='h-[36px] px-[8px] gap-[8px]'
                                                variant='gray'
                                            >
                                                <Trash className='size-[24px]'></Trash>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className='rounded-[8px]  border-slate-300'>
                                            <DialogHeader className='flex flex-col text-left'>
                                                <DialogTitle className='text-h3'>
                                                    Are you sure to delete
                                                    profile image?
                                                </DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription className='text-error-500'>
                                                This action cannot be undone.
                                                This will permanently delete
                                                your profile image information
                                                from our servers.
                                            </DialogDescription>
                                            <DialogFooter className='flex flex-row justify-end gap-[8px]'>
                                                <DialogClose asChild>
                                                    <Button variant='secondary'>
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button
                                                    variant='destructive'
                                                    onClick={deletePicture}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                )}
                                <FormField
                                    control={form.control}
                                    name='file'
                                    render={({ field }) => (
                                        <FormItem className='space-y-0'>
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='self-center'
                                                    type='file'
                                                    {...form.register('file')}
                                                    onChange={event => {
                                                        const displayUrl =
                                                            getImageData(event);
                                                        setPreview(displayUrl);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {form.formState.errors.file && (
                                <p className='text-p text-error-500'>
                                    {form.formState.errors.file.message}
                                </p>
                            )}
                        </Form>
                    </>
                ) : (
                    <Image
                        className='size-[160px] rounded-[80px] object-cover'
                        src={
                            currentimageURL === ''
                                ? '/ProfilePicEmpty.png'
                                : currentimageURL
                        }
                        width={160}
                        height={160}
                        alt=''
                        priority
                    ></Image>
                )}
            </div>
        </form>
    );
}

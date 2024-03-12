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
import { getSelfUser } from '@/lib/getUser';
import { User } from '@/types/user';
import { instance, instanceBinary } from '@/utils/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, RefreshCcw, Save, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

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
            const user: User | null = await getSelfUser();
            if (!user) {
                return;
            }
            const res = await instance.get(
                `v1/users/${user._id}/profile-image`,
            );
            setCurrentImageURL(res.data ?? '');
        };
        fetchUser();
    }, []);

    useEffect(() => {
        form.reset();
        setPreview('');
    }, [isEditing]);

    const submitData = async (values: z.infer<typeof schema>) => {
        try {
            const user = await getSelfUser();
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
                            className='size-[36px] p-0 bg-slate-500'
                        >
                            <X className='size-[24px]'></X>
                        </Button>
                        <Button
                            type='submit'
                            className='size-[36px] p-0 bg-primary-500'
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
                            className='size-[36px] p-0 bg-primary-500'
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
                            className='size-[160px] rounded-[80px]'
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
                                        className='h-[36px] px-[8px] gap-[8px] bg-slate-500'
                                    >
                                        <RefreshCcw className='size-[24px]'></RefreshCcw>
                                        <p className='text-'>Reset</p>
                                    </Button>
                                )}
                                {
                                    // preview == '' && currentimageURL != '' &&
                                    // <Button type="button" className="h-[36px] px-[8px] gap-[8px] bg-slate-500">
                                    //     <Trash className="size-[24px]"></Trash>
                                    //     <p className="text-">Delete</p>
                                    // </Button>
                                }
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
                        className='size-[160px] rounded-[80px]'
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

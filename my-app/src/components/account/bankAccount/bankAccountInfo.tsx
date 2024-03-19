'use client';

import { Button } from '@/components/ui/button';
import { CommandList } from '@/components/ui/command';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { getAllBanks } from '@/lib/getAllBanks';
import { Bank } from '@/types/bank';
import { instance } from '@/utils/axiosInstance';
import { clientStorage } from '@/utils/storageService';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@radix-ui/react-popover';
import { Command, CommandGroup, CommandItem } from 'cmdk';
import { px } from 'framer-motion';
import { ChevronDown, Pencil, Save, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

interface BankInfoData {
    bankId: string;
    bankAccName: string;
    bankAccNo: string;
}

export default function BankAccountInfo() {
    const [banks, setBanks] = useState<Bank[]>([]);

    const [bankId, setBankId] = useState('');
    const [bankAccName, setBankAccName] = useState('');
    const [bankAccNo, setbankAccNo] = useState('');

    const [isEditing, setEditing] = useState(false);
    const [open, setOpen] = useState(false);

    const schema: ZodType<BankInfoData> = z
        .object({
            bankId: z.string(),
            bankAccName: z.string().max(64, {
                message:
                    'Bank account name cannot be longer than 64 characters',
            }),
            bankAccNo: z.string(),
        })
        .refine(data => [0, 13].includes(data.bankAccNo.length), {
            message: 'Please fill a valid bank account number',
            path: ['bankAccNo'],
        });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            bankId: '',
            bankAccName: '',
            bankAccNo: '',
        },
    });

    useEffect(() => {
        const fetchBanks = async () => {
            const fetchedBanks = (await getAllBanks()).banks;
            setBanks(fetchedBanks);
        };
        fetchBanks();
    }, []);

    useEffect(() => {
        const user = clientStorage.get().user;
        setBankId(user.bankId ?? '');
        setBankAccName(user.bankAccName ?? '');
        setbankAccNo(user.bankAccNo ?? '');
    }, []);

    useEffect(() => {
        form.reset();
    }, [isEditing]);

    const submitData = async (values: z.infer<typeof schema>) => {
        const data = form.getValues();
        const toUpdate = {
            bankId,
            bankAccName,
            bankAccNo,
        };
        if (data.bankId.trim()) {
            toUpdate.bankId = data.bankId.trim();
        }
        if (data.bankAccName.trim()) {
            toUpdate.bankAccName = data.bankAccName.trim();
        }
        if (data.bankAccNo.trim()) {
            toUpdate.bankAccNo = data.bankAccNo.replace(/-/g, '');
        }
        try {
            console.log(toUpdate);
            const user = clientStorage.get().user;
            await instance.patch(`v1/users/${user?._id}`, toUpdate);
            window.location.reload();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: `${(error as any).response.data.error}`,
            });
        }
    };

    const getSelectedBank = (value: string): ReactNode => {
        const bank = banks.find(
            bank => bank.id === (value === '' ? bankId : value),
        );
        if (bank) {
            return (
                <div className='flex flex-row gap-x-[16px]'>
                    <Image src={bank.url} alt='' width={24} height={24} />
                    <p>{bank.name}</p>
                </div>
            );
        } else {
            return <p>Select a bank...</p>;
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(submitData)}
            className='w-full flex flex-col gap-y-[16px]'
        >
            <div className='w-full flex flex-row justify-between'>
                <h2>Your Bank Account</h2>
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
                                name='bankId'
                                render={({ field }) => (
                                    <FormItem className='w-full grid grid-cols-3 gap-[16px] items-center'>
                                        <FormLabel>Bank Name</FormLabel>
                                        <FormControl>
                                            <Popover
                                                open={open}
                                                onOpenChange={setOpen}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        role='combobox'
                                                        aria-expanded={open}
                                                        className='w-full h-[40px] px-[12px] py-[8px] text-p font-p flex flew-row justify-between col-span-2'
                                                    >
                                                        {getSelectedBank(
                                                            field.value,
                                                        )}
                                                        <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='bg-slate-50 desktop:w-[422px] tablet:w-[47vw] w-[64vw] rounded-[16px] z-50'>
                                                    <Command>
                                                        <CommandList className='max-h-[50vh] p-[8px]'>
                                                            <CommandGroup>
                                                                {banks.map(
                                                                    bank => (
                                                                        <CommandItem
                                                                            key={parseInt(
                                                                                bank.id,
                                                                            )}
                                                                            value={
                                                                                bank.id
                                                                            }
                                                                            onSelect={value => {
                                                                                form.setValue(
                                                                                    'bankId',
                                                                                    value,
                                                                                );
                                                                                setOpen(
                                                                                    false,
                                                                                );
                                                                            }}
                                                                            className='py-[8px]'
                                                                        >
                                                                            <div className='flex flex-row gap-x-[16px]'>
                                                                                <Image
                                                                                    src={
                                                                                        bank.url
                                                                                    }
                                                                                    alt=''
                                                                                    width={
                                                                                        24
                                                                                    }
                                                                                    height={
                                                                                        24
                                                                                    }
                                                                                />
                                                                                <p>
                                                                                    {
                                                                                        bank.name
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </CommandItem>
                                                                    ),
                                                                )}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.bankId && (
                                <p className='text-error-500'>
                                    {form.formState.errors.bankId.message}
                                </p>
                            )}
                            <FormField
                                control={form.control}
                                name='bankAccName'
                                render={({ field }) => (
                                    <FormItem className='w-full grid grid-cols-3 gap-[16px] items-center'>
                                        <FormLabel>Account Name</FormLabel>
                                        <FormControl className='col-span-2'>
                                            <Input
                                                placeholder={bankAccName}
                                                disabled={!isEditing}
                                                {...form.register(
                                                    'bankAccName',
                                                )}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.bankAccName && (
                                <p className='text-error-500'>
                                    {form.formState.errors.bankAccName.message}
                                </p>
                            )}
                            <FormField
                                control={form.control}
                                name='bankAccNo'
                                render={({ field }) => (
                                    <FormItem className='w-full grid grid-cols-3 gap-[16px] items-center'>
                                        <FormLabel>Account Number</FormLabel>
                                        <FormControl className='col-span-2'>
                                            <Input
                                                placeholder={bankAccNo.replace(
                                                    /^(\d{0,3})(\d{0,1})(\d{0,5})(\d{0,1})$/,
                                                    (_, p1, p2, p3, p4) =>
                                                        [p1, p2, p3, p4]
                                                            .filter(Boolean)
                                                            .join('-'),
                                                )}
                                                disabled={!isEditing}
                                                {...form.register('bankAccNo')}
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
                                                            /^(\d{0,3})(\d{0,1})(\d{0,5})(\d{0,1})$/,
                                                            (
                                                                _,
                                                                p1,
                                                                p2,
                                                                p3,
                                                                p4,
                                                            ) =>
                                                                [p1, p2, p3, p4]
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
                            {form.formState.errors.bankAccNo && (
                                <p className='text-error-500'>
                                    {form.formState.errors.bankAccNo.message}
                                </p>
                            )}
                        </div>
                    </Form>
                ) : (
                    <div className='w-full grid grid-cols-3 gap-x-[16px] gap-y-[24px] pt-[12px] item-center'>
                        <p>Bank Name</p>
                        <div className='flex flex-row gap-x-[8px] col-span-2'>
                            {bankId != '' && (
                                <Image
                                    src={banks.at(parseInt(bankId))?.url ?? ''}
                                    alt=''
                                    width={24}
                                    height={24}
                                />
                            )}
                            <p className='text-slate-500'>
                                {bankId === ''
                                    ? '-'
                                    : banks.at(parseInt(bankId))?.name ?? '-'}
                            </p>
                        </div>
                        <p>Account Name</p>
                        <p className='col-span-2 text-slate-500'>
                            {bankAccName === '' ? '-' : bankAccName}
                        </p>
                        <p>Account Number</p>
                        <p className='col-span-2 text-slate-500'>
                            {bankAccNo === ''
                                ? '-'
                                : bankAccNo.replace(
                                      /^(\d{0,3})(\d{0,1})(\d{0,5})(\d{0,1})$/,
                                      (_, p1, p2, p3, p4) =>
                                          [p1, p2, p3, p4]
                                              .filter(Boolean)
                                              .join('-'),
                                  )}
                        </p>
                    </div>
                )}
            </div>
        </form>
    );
}

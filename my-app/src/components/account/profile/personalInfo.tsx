'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSelfUser } from "@/lib/getUser"
import { User } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Pencil, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

interface PersonalData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export default function PersonalInfo() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            const user: User | null = await getSelfUser();
            if (!user) {
                return;
            }
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPhoneNumber(user.phoneNumber ?? '');
        }
        fetchUser();
    }, [])

    const [isEditing, setEditing] = useState(false)

    useEffect(() => {
        form.resetField('firstName')
        form.resetField('lastName')
        form.resetField('phoneNumber')
    }, [isEditing])

    const schema: ZodType<PersonalData> = z.object({
        firstName: z.string().max(64, { message: "First name cannot be longer than 64 characters" }),
        lastName: z.string().max(64, { message: "Last name cannot be longer than 64 characters" }),
        phoneNumber: z.string(),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
    });

    const router = useRouter();

    const submitData = async (values: z.infer<typeof schema>) => {
        console.log("Submitting data")
        const data = form.getValues();
        const toUpdate = {
            firstName, lastName, phoneNumber
        }
        if (data.firstName.trim()) {
            toUpdate.firstName = data.firstName.trim()
        }
        if (data.lastName.trim()) {
            toUpdate.firstName = data.firstName.trim()
        }
        if (data.phoneNumber.trim()) {
            toUpdate.firstName = data.phoneNumber.replace(/-/g, '')
        }
        {
            /* CALL UPDATE API */
        }
        window.location.reload()
    }

    return (
        <form onSubmit={form.handleSubmit(submitData)} className='w-full flex flex-col gap-y-[16px]'>
            <div className='w-full flex flex-row justify-between'>
                <h3>Personal Information</h3>
                {
                    isEditing ?
                        <div className="flex flex-row gap-x-[8px]">
                            <Button type='button' onClick={() => { setEditing(false) }} className="size-[36px] p-0 bg-slate-500">
                                <X className="size-[24px]"></X>
                            </Button>
                            <Button type='submit' className="size-[36px] p-0 bg-primary-500">
                                <Save className="size-[24px]"></Save>
                            </Button>
                        </div> :
                        <div>
                            <Button type='button' onClick={() => { setEditing(true) }} className="size-[36px] p-0 bg-primary-500">
                                <Pencil className="size-[24px]"></Pencil>
                            </Button>
                        </div>
                }
            </div>
            <div className="w-full">
                {isEditing ?
                    <Form {...form}>
                        <div className="w-full gap-y-[16px]">
                            <FormField control={form.control}
                                name='firstName'
                                render={({ field }) => (
                                    <FormItem className="w-full grid grid-cols-3 gap-[16px] items-center">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl className="col-span-2">
                                            <Input placeholder={firstName} disabled={!isEditing} {...form.register("firstName")}></Input>
                                        </FormControl>
                                    </FormItem>
                                )} />
                            <FormField control={form.control}
                                name='lastName'
                                render={({ field }) => (
                                    <FormItem className="w-full grid grid-cols-3 gap-[16px] items-center">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl className="col-span-2">
                                            <Input placeholder={lastName} disabled={!isEditing} {...form.register("lastName")}></Input>
                                        </FormControl>
                                    </FormItem>
                                )} />
                            <FormField control={form.control}
                                name='phoneNumber'
                                render={({ field }) => (
                                    <FormItem className="w-full grid grid-cols-3 gap-[16px] items-center">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl className="col-span-2">
                                            <Input
                                                placeholder={phoneNumber.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/, (_, p1, p2, p3) => [p1, p2, p3,].filter(Boolean,).join('-',))}
                                                disabled={!isEditing}
                                                {...form.register("phoneNumber")}
                                                {...field}
                                                onChange={e => {
                                                    let rawValue = e.target.value;
                                                    // Remove non-digit characters
                                                    rawValue = rawValue.replace(/\D/g, '');

                                                    // Limit the maximum length to 10 characters
                                                    rawValue = rawValue.slice(0, 10,);

                                                    // Apply the desired format
                                                    const formattedValue =
                                                        rawValue.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/, (_, p1, p2, p3) => [p1, p2, p3,].filter(Boolean,).join('-',));
                                                    field.onChange(formattedValue);
                                                }}
                                                maxLength={12}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )} />
                        </div>
                    </Form> :
                    <div className="w-full grid grid-cols-3 gap-x-[16px] gap-y-[24px] pt-[12px] item-center">
                        <p>First Name</p>
                        <p className="col-span-2 text-slate-500">{firstName}</p>
                        <p>Last Name</p>
                        <p className="col-span-2 text-slate-500">{lastName}</p>
                        <p>Phone Number</p>
                        <p className="col-span-2 text-slate-500">
                            {phoneNumber.replace(
                                /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
                                (_, p1, p2, p3,) => [p1, p2, p3,].filter(Boolean,).join('-'),
                            )}</p>
                    </div>}
            </div >
        </form >
    );
}
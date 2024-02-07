"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"

import { SignupContextType, ISignupInfo } from "@/types/signup"
import { SignupContext } from "../../context/signupInfoContext"
import React from "react";
import { Dispatch, SetStateAction } from 'react';

type props = {
  setAuthType: Dispatch<SetStateAction<string>>;
};

const formSchema = z.object({
  firstName: z.string().max(64, {
    message: "user",
  }),
  lastName: z.string().max(64, {
    message: "easytask",
  }),
  phoneNumber: z.string().max(64, {
    message: "098-765-4321",
  }),
});

export default function ProfileSetupForm({ setAuthType }: props) {

  const router = useRouter();
  const {
    setError,
    formState: { errors },
  } = useForm();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: ""
    },
  });


  // 2. Define a submit handler.
  const { updateSignupInfo , signupInfo} = React.useContext(SignupContext) as SignupContextType;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values.phoneNumber.replace(/-/g, ''))
    try {
      // const result = await setupProfile(values.email);
      if (values.firstName.trim() === "" || values.lastName.trim() === "" || values.phoneNumber.trim() === "") {
        setError('invalidText', {
          type: 'manual',
          message: 'Please complete the fill.',
        });
      }
      else {
        console.log('success1');
        updateSignupInfo({
          email: signupInfo.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: signupInfo.password,
          bankName: "",
          bankAccName: "",
          bankAccNo: "",
        })
        setAuthType('bankAccount');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      console.error('Unexpected error during authentication:', error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="text-center" >
          <CardTitle>Set up your profile</CardTitle>
          <CardDescription>Setting up your profile can gain more opportunities</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="user" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="easytask"  {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input placeholder="098-765-4321" {...field}
                          onChange={(e) => {
                            let rawValue = e.target.value;
                            // Remove non-digit characters
                            rawValue = rawValue.replace(/\D/g, '');
                        
                            // Limit the maximum length to 10 characters
                            rawValue = rawValue.slice(0, 10);
                        
                            // Apply the desired format
                            const formattedValue = rawValue.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/, (_, p1, p2, p3) =>
                              [p1, p2, p3].filter(Boolean).join('-')
                            );
                        
                            field.onChange(formattedValue);
                          }}
                          maxLength={12}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid w-full items-center gap-1">
              <Button className="w-full">Next</Button>
              {errors.invalidText ? (
                                <FormMessage>{`${errors.invalidText.message}`}</FormMessage>
                            ):<FormMessage><br></br></FormMessage>}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
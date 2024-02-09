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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@radix-ui/react-select"
import { toast } from "../ui/use-toast"

import { Dispatch, SetStateAction } from 'react';
import { SignupContext } from "@/context/signupInfoContext"
import React from "react"
import { SignupContextType } from "@/types/signup"
import { setupProfile } from "@/lib/setupProfile"
import { useRouter } from "next/navigation"

type props = {
  setAuthType: Dispatch<SetStateAction<string>>;
};

const formSchema = z.object({
  bankName: z.string().min(1,{
    message: "Please select bank name.",
  }),
  accountName: z.string().min(1, {
    message: "Please enter account name.",
  }),
  accountNumber: z.string().min(1, {
    message: "Please enter account number.",
  }),
});


export default function BankAccountForm({ setAuthType }: props) {
  // 1. Define your form.
  const router = useRouter();

  const {
    setError,
    formState: { errors },
  } = useForm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        bankName: "",
        accountName: "",
        accountNumber: "",
    },
  });

  const { updateSignupInfo,signupInfo } = React.useContext(SignupContext) as SignupContextType;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await setupProfile(signupInfo.email,
        signupInfo.firstName,
        signupInfo.lastName,
        signupInfo.password,
        signupInfo.phoneNumber,
        values.bankName,
        values.accountName,
        values.accountNumber
        );
      if (result?.error) {
        console.error('Registration failed:', result.error);
        if (result.details === "Email is already used") {
          setError('invalidText', {
            type: 'manual',
            message: result.details,
          });
        }
        else if (result.error === "Email is not verified") {
          setError('invalidText', {
            type: 'manual',
            message: result.details,
          });
        }
      } else {
        console.log('success1');
        updateSignupInfo({
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          phoneNumber:"",
          bankName: "",
          bankAccName: "",
          bankAccNo: "",
        })
        router.push('/');
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

  async function handleSkipForNow() {
    try {
      const result = await setupProfile(signupInfo.email,
        signupInfo.firstName,
        signupInfo.lastName,
        signupInfo.password,
        signupInfo.phoneNumber,
        "",
        "",
        ""
        );
        if (result?.error) {
          console.error('Registration failed:', result.error);
          if (result.details === "Email is already used") {
            setError('invalidText', {
              type: 'manual',
              message: result.details,
            });
          }
          else if (result.error === "Email is not verified") {
            setError('invalidText', {
              type: 'manual',
              message: result.details,
            });
          }
        }else {
        updateSignupInfo({
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          phoneNumber:"",
          bankName: "",
          bankAccName: "",
          bankAccNo: "",
        })
        router.push('/');
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
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle>Bank account</CardTitle>
          <CardDescription>You will receive work wages cia this bank account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Bank name</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Easytaskbank" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="KBank">KBank</SelectItem>
                                <SelectItem value="SCB">SCB</SelectItem>
                                <SelectItem value="KTB">KTB</SelectItem>
                                <SelectItem value="KrungSri">KrungSri</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Account name</FormLabel>
                        <FormControl>
                          <Input placeholder="User Easytask" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Account number</FormLabel>
                        <FormControl>
                          <Input placeholder="012-3-45678-9" {...field}
                          onChange={(e) => {
                            let rawValue = e.target.value;
                            // Remove non-digit characters
                            rawValue = rawValue.replace(/\D/g, '');
                        
                            // Limit the maximum length to 10 characters
                            rawValue = rawValue.slice(0, 10);
                        
                            // Apply the desired format
                            const formattedValue = rawValue.replace(/^(\d{0,3})(\d{0,1})(\d{0,5})(\d{0,5})$/, (_, p1, p2, p3, p4) =>
                              [p1, p2, p3, p4].filter(Boolean).join('-')
                            );
                        
                            field.onChange(formattedValue);
                          }}
                          maxLength={13} // Set maxLength to 12 to account for the hyphens in the format
                        />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid w-full items-center gap-4">
              <Button className="w-full">Done</Button>
              {errors.invalidText ? (
                                <FormMessage>{`${errors.invalidText.message}`}</FormMessage>
                            ):<FormMessage><br></br></FormMessage>}
              <CardDescription>
                <a className="underline text-black hover:text-originalColor" onClick={handleSkipForNow}>Skip for now</a>
              </CardDescription>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
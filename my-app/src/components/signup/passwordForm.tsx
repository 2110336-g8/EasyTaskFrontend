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
import { toast } from "../ui/use-toast"
import { SignupContextType, ISignupInfo } from "@/types/signup"
import { SignupContext } from "../../context/signupInfoContext"
import React from "react"
import { Dispatch, SetStateAction } from 'react';

type props = {
  setAuthType: Dispatch<SetStateAction<string>>;
};

const formSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
        }),
    confirmedPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.", 
    }),
});

export default function PasswordForm({ setAuthType }: props) {
  // 1. Define your form.
  const { updateSignupInfo , signupInfo} = React.useContext(SignupContext) as SignupContextType;
  const {
    setError,
    formState: { errors },
  } = useForm();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmedPassword: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = values.password === values.confirmedPassword;
      if (!result) {
        setError('invalidText', {
          type: 'manual',
          message: 'Your password is not match',
        });
        
      } else {
        console.log('success1');
        updateSignupInfo({
          email: signupInfo.email,
          firstName: "",
          lastName: "",
          password: values.password,
          bankName: "",
          bankAccName: "",
          bankAccNo: "",
        })
        setAuthType('profileSetup');
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
          <CardTitle>Password</CardTitle>
          <CardDescription>You can log in again with this password</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="confirmedPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm your password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password again" {...field} />
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
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

import { SignupContextType, ISignupInfo } from "@/types/signup"
import { SignupContext } from "../../context/signupInfoContext"
import React from "react"

const formSchema = z.object({
  otp1: z.string().max(1, {
    message: "",
  }),
  otp2: z.string().max(1, {
    message: "",
  }),
  otp3: z.string().max(1, {
    message: "",
  }),
  otp4: z.string().max(1, {
    message: "",
  }),
  otp5: z.string().max(1, {
    message: "",
  }),

  otp6: z.string().max(1, {
    message: "",
  }),
});

export default function VerificationForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: ""
    },
  });

  // const email = useGlobalState();
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const combinedOTP = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}${values.otp5}${values.otp6}`;
    console.log(combinedOTP);
   
  }

  function handleResendCode() {
    // Logic for the second button (Resend code)
    console.log("Resending code...");
    // router.push({
    //   pathname: '/signup/verification',
    //   query: { email: 'sth' },
    // } as any);    
    // ... additional logic for the second button
  }
  
  const { signupInfo } = React.useContext(SignupContext) as SignupContextType;
  console.log(signupInfo);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="text-center" >
          <CardTitle>Verification</CardTitle>
          <CardDescription>Please enter code in your email for verification</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex space-x-4">
              {/* First Field */}
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="otp1"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input maxLength={1} placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Second Field */}
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="otp2"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" pattern="[0-9]" maxLength={1} placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Third Field */}
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="otp3"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" pattern="[0-9]" maxLength={1} placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Fourth Field */}
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="otp4"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input  maxLength={1} placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Fifth Field */}
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="otp5"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input maxLength={1} placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sixth Field */}
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="otp6"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input  maxLength={1} placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </div>

            
          </CardContent>

            <CardFooter className="grid w-full items-center gap-1">
              <Button type="submit" className="w-full">Done</Button>
              <Button type="button" onClick={handleResendCode} className="w-full bg-color-white border border-blue-300 text-blue-300 hover:bg-blue-500 hover:text-white">Resend code</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
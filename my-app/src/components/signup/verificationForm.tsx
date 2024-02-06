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
  // otp2: z.number().int().max(1, {
  //   message: "",
  // }),
  // otp3: z.number().int().max(1, {
  //   message: "",
  // }),
  // otp4: z.number().int().max(1, {
  //   message: "",
  // }),
  // otp5: z.number().int().max(1, {
  //   message: "",
  // }),
  // otp6: z.number().int().max(1, {
  //   message: "",
  // }),
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // try {
    //   const result = await signIn('credentials', {
    //     redirect: false,
    //     email,
    //     password,
    //   });

    //   if (result?.error) {
    //     // Handle specific error cases
    //     alert(result.error)
    //     console.error('Authentication failed:', result.error);
    //   } else {
    //     // Authentication successful
    //     router.push('/home');
    //   }
    // } catch (error) {
    //   // Handle unexpected errors (e.g., network issues)
    //   console.error('Unexpected error during authentication:', error);
    //   // Show a user-friendly error message
    // }
  }
  const { signupInfo } = React.useContext(SignupContext) as SignupContextType;
  console.log(signupInfo);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="text-center" >
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormLabel>OTP</FormLabel>
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
              <Button className="w-full">Login</Button>
              <CardDescription>
                Doesn't have any account? <a href="/signup" className="underline text-black hover:text-originalColor">Sign up</a>
              </CardDescription>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
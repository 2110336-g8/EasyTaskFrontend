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


export default function BankAccountForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        bankName: "",
        accountName: "",
        accountNumber: "",
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
                          <Input placeholder="012-3-45678-9" {...field} />
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
              <CardDescription>
                <a href="/login" className="underline text-black hover:text-originalColor">Skip for now</a>
              </CardDescription>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
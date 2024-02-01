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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
      <Card className="w-[350px]">
        <CardHeader className="text-center" >
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="user.easytask@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your password" type="password" {...field} />
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
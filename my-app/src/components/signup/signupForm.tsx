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
});

export default function SignupForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const apiUrl = 'http://api.easytask.vt.in.th/auth/sendOtp';

      // Prepare the request payload
      const data = {
        email: values.email,
      };

      // Make a POST request to the API
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        // Handle success response
      } else if (response.status === 400) {
        const errorData = await response.json();
        // Handle 400 Bad Request
        console.error(errorData.details || 'Bad Request');
        form.setError('email', {
          type: 'manual',
          message: errorData.details || 'Bad Request',
        });
      } else if (response.status === 403) {
        const errorData = await response.json();
        // Handle 403 Forbidden
        console.error(errorData.details || 'Forbidden');
        form.setError('email', {
          type: 'manual',
          message: errorData.details || 'Forbidden',
        });
      } else {
        // Handle other error cases
        console.error('An error occurred');
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      // You may want to set an error state in your form here
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Welcome to Easy Task</CardDescription>
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
              </div>
            </CardContent>
            <CardFooter className="grid w-full items-center gap-1">
              <Button className="w-full">Verify your email</Button>
              <CardDescription>
                Already have an account? <a href="/login" className="underline text-black hover:text-originalColor">Log in</a>
              </CardDescription>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
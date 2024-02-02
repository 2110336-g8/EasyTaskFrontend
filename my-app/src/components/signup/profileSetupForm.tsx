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
  firstName: z.string().max(64, {
    message: "user",
  }),
  lastName: z.string().max(64, {
    message: "easytask",
  }),
});

export default function ProfileSetupForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const apiUrl = 'http://api.easytask.vt.in.th/auth/sendOtp';

      // Prepare the request payload
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
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
      } else if (response.status === 204) {
        const errorData = await response.json();
        // Handle 400 Bad Request
        console.error(errorData.details || 'Bad Request');
        form.setError('firstName', {
          type: 'manual',
          message: errorData.details || 'Bad Request',
        });
      } 
        else {
        // Handle other error cases
        console.error('An error occurred');
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      // You may want to set an error state in your form here
    }
  }

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     const apiUrl = 'http://api.easytask.vt.in.th/auth/sendOtp';

  //     const response = await axios.post(apiUrl, {
  //       email: values.email,
  //     });

  //     if (response.status === 200) {
  //       const responseData = response.data;
  //       console.log(responseData);
  //       // Handle success response
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const axiosError = error as axios.AxiosError;
  //       if (axiosError.response?.status === 400) {
  //         const errorData = axiosError.response.data;
  //         console.error(errorData.details || 'Bad Request');
  //         form.setError('email', {
  //           type: 'manual',
  //           message: errorData.details || 'Bad Request',
  //         });
  //       } else if (axiosError.response?.status === 403) {
  //         const errorData = axiosError.response.data;
  //         console.error(errorData.details || 'Forbidden');
  //         form.setError('email', {
  //           type: 'manual',
  //           message: errorData.details || 'Forbidden',
  //         });
  //       } else {
  //         console.error('An error occurred');
  //       }
  //     } else {
  //       // Handle network or other errors
  //       console.error(error);
  //     }
  //   }

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
              </div>
            </CardContent>
            <CardFooter className="grid w-full items-center gap-1">
              <Button className="w-full">Next</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
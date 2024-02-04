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
import { emailVerification } from "@/lib/signupEmail"


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function SignupForm() {
  const router = useRouter();
  const {
    setError,
    formState: { errors },
  } = useForm();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await emailVerification(values.email);
      if (result?.error) {
        console.error('Authentication failed:', result.error);
        if (result.error === "Validation Error") {
          setError('invalidText', {
            type: 'manual',
            message: 'This email or password is not correct.',
          });
        }
      } else {
        console.log('success1');
        router.push('/signup/verification');
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
              {errors.invalidText && <FormMessage>{`${errors.invalidText.message}`}</FormMessage>}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
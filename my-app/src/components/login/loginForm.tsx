'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { userLogIn } from '@/lib/userLogIn';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

const formSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export default function LoginForm() {
    const router = useRouter();
    const {
        setError,
        formState: { errors },
    } = useForm();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const result = await userLogIn(values.email, values.password);
            if (result?.error) {
                console.error('Authentication failed:', result.error);
                if (result.error === 'Unauthorized') {
                    setError('invalidText', {
                        type: 'manual',
                        message: 'This email or password is not correct.',
                    });
                }
            } else {
                router.push('/');
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
            });
            console.error('Unexpected error during authentication:', error);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <Card className='w-[350px]'>
                <CardHeader className='text-center'>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className='grid w-full items-center gap-4'>
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-base text-black'>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='user.easytask@email.com'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex flex-col space-y-1.5'>
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-base text-black'>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter your password'
                                                        type='password'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className='grid w-full items-center gap-1'>
                            {errors.invalidText ? (
                                <FormMessage>{`${errors.invalidText.message}`}</FormMessage>
                            ):<FormMessage><br></br></FormMessage>}
                            <Button className='w-full'>Login</Button>
                            <CardDescription>
                                Doesn't have any account?{' '}
                                <a
                                    href='/signup'
                                    className='underline text-black hover:text-originalColor'
                                >
                                    Sign up
                                </a>
                            </CardDescription>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}

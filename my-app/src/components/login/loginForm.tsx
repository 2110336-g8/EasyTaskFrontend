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
        <div className='flex'>
            <div className='left-side w-1/2 h-full'>
                <img
                        src='/signupPic.jpg'
                        alt='Image'
                        className='image object-cover h-full w-full'
                />
            </div>
            <div className='right-side w-1/2 h-full'>
                <div className='flex flex-col items-center justify-center h-screen font-sans'>
                    <img
                            src='/logoEasyTask.jpg'
                            alt='Image'
                            className='image object-cover w-[303px] m-[20px]'
                    />
                    <Card className='w-[640px] h-[600px] p-10 m-[20px]'>
                        <CardHeader className='text-center m-[20px]'>
                            <CardTitle className='font-bold text-[40px] tracking-[-0.01em]'>Login</CardTitle>
                        </CardHeader>
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent>
                                    <div className='grid w-full items-center gap-4 m-[20px]'>
                                        <div className='flex flex-col space-y-1.5'>
                                            <FormField
                                                control={form.control}
                                                name='email'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className='text-black font-p text-p tracking-p'>
                                                            Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder='user.easytask@email.com'
                                                                className='font-small text-p tracking-small'
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
                                                        <FormLabel className='text-black font-p text-p tracking-p'>
                                                            Password
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className='font-small text-p tracking-small'
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
                                <CardFooter className='grid w-full items-center gap-3 m-[20px]'>
                                    {errors.invalidText ? (
                                        <FormMessage className='text-error-500 text-[16px]'>{`${errors.invalidText.message}`}</FormMessage>
                                    ) : (
                                        <FormMessage>
                                            <br></br>
                                        </FormMessage>
                                    )}
                                    <Button className='w-full bg-primary-500 text-p font-extra-bold tracking-p text-white'>Login</Button>
                                    <CardDescription className='text-slate-500 text-[16px]'>
                                        Doesn't have any account?{' '}
                                        <a
                                            href='/signup'
                                            className='text-primary-700 font-bold hover:text-originalColor'
                                        >
                                            Sign up
                                        </a>
                                    </CardDescription>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

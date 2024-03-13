'use client'
import React from 'react';
import AcceptTask from '@/components/task/acceptTask'; 
import CreateTaskForm from '@/components/createTask/createTaskForm';
import { Button } from 'react-day-picker';
import { Layout } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/homepage/footer';


const TaskCreatePage: React.FC = () => {
    const router = useRouter();
    const handleGoBack = () => {
        router.push('/');
    };
    return (
        <div className='flex flex-col gap-[40px] item-center'>
            <div className='flex flex-row items-start mb-10'> 
            <button onClick={handleGoBack}>
                <img
                    src='/arrow.png'
                    alt='back'
                    className='w-[40px] h-[40px] ms-20'
                />
            </button>
        
            <CreateTaskForm />
            
            </div>
            
        </div>
    );
};

export default TaskCreatePage;


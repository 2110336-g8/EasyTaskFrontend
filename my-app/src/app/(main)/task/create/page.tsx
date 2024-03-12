import React from 'react';
import AcceptTask from '@/components/task/acceptTask'; 
import CreateTaskForm from '@/components/createTask/createTaskForm';
import { Button } from 'react-day-picker';
import { Layout } from 'lucide-react';

const TaskCreatePage: React.FC = () => {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div className='flex flex-row items-start mb-10'>
                <button>
                    <img
                            src='/arrow.png'
                            alt='back'
                            className='w-[40px] h=[40px] ms-20'
                        />
                </button>
            <CreateTaskForm />

            </div>
        </main>
    );
};

export default TaskCreatePage;


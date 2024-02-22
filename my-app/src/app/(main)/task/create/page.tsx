import React from 'react';
import AcceptTask from '@/components/task/acceptTask'; 
import CreateTaskForm from '@/components/createTask/createTaskForm';
import { Button } from 'react-day-picker';

const TaskCreatePage: React.FC = () => {
    return (
        <div className='flex-row'>
            <button>
                <img
                        src='/arrow.png'
                        alt='back'
                        className='w-[40px] h=[40px] ms-20'
                    />
            </button>
        <div className="flex justify-center items-center min-h-screen">
            <CreateTaskForm />
        </div>
        </div>
    );
};

export default TaskCreatePage;


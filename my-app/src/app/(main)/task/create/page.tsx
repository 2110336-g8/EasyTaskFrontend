import React from 'react';
import AcceptTask from '@/components/task/acceptTask'; 
import CreateTaskForm from '@/components/createTask/createTaskForm';

const TaskCreatePage: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <CreateTaskForm />
        </div>
    );
};

export default TaskCreatePage;
import React from 'react';
import Map from '@/components/createTask/openStreetMap';
import MapComponent from '@/components/google/map';
const TaskCreatePage: React.FC = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <MapComponent
                onPositionChange={function (position: {
                    lat: number;
                    lng: number;
                }): void {
                    throw new Error('Function not implemented.');
                }}
            />
        </div>
    );
};

export default TaskCreatePage;

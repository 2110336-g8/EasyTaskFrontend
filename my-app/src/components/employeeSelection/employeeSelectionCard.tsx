'use client';

import { Button } from '../ui/button';
import Image from 'next/image';
import EmployeeCard from '@/components/employeeSelection/employeeCard';
import { EmployeeCardProp } from '@/types/task';
import { useState } from 'react';

export default function EmployeeSelectionCard() {
    const emp: EmployeeCardProp = {
        email: 'hello@mail.com',
        name: 'John Doe',
        tel: '0848844884',
        userId: '12345',
    };
    const emps = [emp, emp, emp, emp];

    const MAX_LEN = 2;
    const [enabled, setEnabled] = useState<Array<number>>([]);

    const updateCounter = (index: number) => {
        const pos = enabled.indexOf(index);
        if (pos !== -1) {
            // Is currently selected
            setEnabled(enabled.filter(i => i !== index));
        } else if (enabled.length < MAX_LEN) {
            // Is not selected yet and total does not exceed
            setEnabled(enabled.concat([index]));
        }
    };

    const getCurrentCount = (index: number) => {
        const pos = enabled.indexOf(index);
        return pos === -1 ? 0 : pos + 1;
    };

    const isAllowedToUpdate = (index: number) => {
        if (enabled.length < MAX_LEN) {
            return true;
        } else {
            return enabled.indexOf(index) !== -1;
        }
    };

    return (
        <div className='grid grid-cols-2 gap-4'>
            {emps.map((e, i) => (
                <EmployeeCard
                    employeeInfo={e}
                    index={getCurrentCount(i)}
                    allowUpdate={isAllowedToUpdate(i)}
                    onClick={() => updateCounter(i)}
                    key={i}
                />
            ))}
        </div>
    );
}

import React, { useState } from 'react';

export default function CheckboxNumber(props: {
    num: number | string;
    onClick?: () => void;
}): React.JSX.Element {
    const [showNum, setShowNum] = useState(false);

    const handleToggle = () => {
        if (props.onClick) {
            setShowNum(!showNum);
            props.onClick();
        }
    };

    return (
        <div
            className='w-[24px] h-[24px] border border-gray-300 rounded-[4px] cursor-default hover:cursor-pointer'
            onClick={handleToggle}
        >
            <div className='flex justify-center items-center'>
                <small
                    className={`text-slate-500 translate-y-[2px] ${props.num || showNum ? '' : 'hidden'}`}
                >
                    {props.num}
                </small>
            </div>
        </div>
    );
}

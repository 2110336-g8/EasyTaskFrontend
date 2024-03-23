import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DialogHeader,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';

type ConfirmHandler = () => void;

const ConfirmButton: React.FC<{
    confirmHandler: ConfirmHandler;
    actionText: string;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
}> = ({
    confirmHandler,
    actionText,
    title,
    description,
    confirmText,
    cancelText, // Add children here if you intend to pass them
}) => {
    return (
        <Dialog>
            <DialogTrigger type='button'>
                {/* <Button className='gap-x-[10px] border-[2px] border-primary-500'> */}
                <Button>{actionText}</Button>
            </DialogTrigger>
            <DialogContent className='rounded-[8px] border-slate-300'>
                <DialogHeader className='flex flex-col text-left'>
                    <DialogTitle className='text-h3'>{title}</DialogTitle>
                </DialogHeader>
                <DialogDescription className='text-error-500'>
                    {description}
                </DialogDescription>
                <DialogFooter className='flex flex-row justify-end gap-[8px]'>
                    <DialogClose asChild>
                        <Button variant='secondary' size='sm' type='button'>
                            {cancelText}
                        </Button>
                    </DialogClose>
                    <Button onClick={confirmHandler} size='sm' type='button'>
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmButton;

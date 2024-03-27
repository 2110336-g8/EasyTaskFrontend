import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-[6px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none ',
    {
        variants: {
            variant: {
                default:
                    'bg-primary-500 text-white hover:opacity-95 disabled:bg-primary-300',
                gray: 'bg-slate-500 hover:bg-slate-700 text-white',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border-[1.5px] text-primary-500 border-primary-500 bg-transparent hover:bg-accent',
                outlineslate:
                    'border-[1.5px] text-slate-500 border-slate-500 bg-transparent hover:bg-accent',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                disabled: 'bg-slate-400 pointer-events-none text-white',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-[52px] py-[12px] px-[24px]',
                sm: 'h-[40px] py-[8px] px-[20px]',
                icon: 'h-10 w-10',
                xs: 'py-[4px] px-[12px]',
                s: 'py-[8px] px-[16px]',
                m: 'py-[12px] px-[24px]',
            },
            font: {
                xs: 'text-[14px] leading-[18px] font-button-xs tracking-button-xs',
                s: 'text-[16px] leading-[24px] font-button-s tracking-button-s',
                m: 'text-[20px] leading-[28px] font-button-m tracking-button-m',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'm',
            font: 'm',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, font, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, font, className }),
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };

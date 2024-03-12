import BankAccountInfo from '@/components/account/bankAccount/bankAccountInfo';

export default function BankAccount() {
    return (
        <div className='w-full flex flex-col gap-[24px]'>
            <div className='desktop:w-[640px] w-full'>
                <BankAccountInfo />
            </div>
        </div>
    );
}

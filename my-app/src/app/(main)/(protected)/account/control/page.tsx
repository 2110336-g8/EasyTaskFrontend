import AccountDeletion from '@/components/account/control/accountDeletion';
import ChangePasssword from '@/components/account/control/changePassword';

export default function Control() {
    return (
        <div className='w-full flex flex-col gap-[24px]'>
            <div className='desktop:w-[640px] w-full flex flex-col gap-[80px]'>
                <ChangePasssword />
                <AccountDeletion />
            </div>
        </div>
    );
}

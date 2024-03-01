import {
    EnvelopeClosedIcon,
    BackpackIcon,
    Pencil2Icon,
    PersonIcon,
} from '@radix-ui/react-icons';
import { clientStorage } from '@/utils/storageService';
import LoginNavbar from './LoginNavbar';
import LogoutNavbar from './LogoutNavbar';

export default function NavBar() {
    const isLoggedIn = !!clientStorage.get().token;

    const handleLogout = () => {
        clientStorage.remove();
        window.location.reload();
    };

    return (
        <div>
            {isLoggedIn ? (
                <LoginNavbar handleLogout={handleLogout} />
            ) : (
                <LogoutNavbar />
            )}
        </div>
    );
}

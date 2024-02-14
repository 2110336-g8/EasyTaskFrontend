import { User } from '@/types/user';
import { isString, isUser } from './utils';

export interface StorageKeys {
    token: string;
    user: User;
}

export function isStorageKeys(object: any): object is StorageKeys {
    return (
        object !== null &&
        object !== undefined &&
        object.token !== undefined &&
        isString(object.token) &&
        object.user !== undefined &&
        isUser(object.user)
    );
}

class ClientStorage {
    private static storageKey: string = 'EasyTaskSession';

    static new(values?: StorageKeys): StorageKeys {
        if (typeof values === 'undefined')
            return {
                token: '',
                user: {
                    _id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    photoURL: '',
                    bankId: '',
                    bankAccNo: '',
                },
            };

        return values;
    }

    static get(): StorageKeys {
        const item = this.getCustom(this.storageKey);

        if (isStorageKeys(item)) {
            return item;
        }

        return this.new();
    }

    static set(values: StorageKeys): boolean {
        return this.setCustom(this.storageKey, JSON.stringify(values));
    }

    static remove() {
        this.removeCustom(this.storageKey);
    }

    static getCustom(name: string): any {
        if (typeof window === 'undefined') {
            return null;
        }

        const item = window.localStorage.getItem(name);

        try {
            // Stored value is JSON
            return item ? JSON.parse(item) : null;
        } catch (error) {
            // Stored value is string/other
            return item;
        }
    }

    static setCustom(name: string, value: string): boolean {
        // Client only!!!
        if (typeof window === 'undefined') {
            return false;
        }

        try {
            window.localStorage.setItem(name, value);
            return true;
        } catch (error) {
            return false;
        }
    }

    static removeCustom(name: string) {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.removeItem(name);
    }
}

export const clientStorage = ClientStorage;

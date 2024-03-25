import { User } from '@/types/user';

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isUser(object: any): object is User {
    return (
        object !== null &&
        object !== undefined &&
        object._id !== undefined &&
        isString(object._id) &&
        object.firstName !== undefined &&
        isString(object.firstName) &&
        object.lastName !== undefined &&
        isString(object.lastName) &&
        object.email !== undefined &&
        isString(object.email) &&
        (object.phoneNumber === undefined || isString(object.phoneNumber)) &&
        (object.photoURL === undefined || isString(object.photoURL)) &&
        (object.bankId === undefined || isString(object.bankId)) &&
        (object.bankAccNo === undefined || isString(object.bankAccNo))
    );
}

export const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatPhoneNumber = (phoneNumber: string) => {
    const digits = phoneNumber.replace(/\D/g, ''); // Removes anything that's not a digit
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

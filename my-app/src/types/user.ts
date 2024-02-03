export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    photoURL?: string;
    bankId?: string;
    bankAccNo?: string;
}

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

import { User } from "@/types/user";
import { instance } from "@/utils/axiosInstance";
import { clientStorage } from "@/utils/storageService";

export async function getSelfUser(): Promise<User | null> {
    try {
        const id = clientStorage.get().user._id;
        const user: User = (await instance.get(`/v1/users/${id}`)).data.user
        return user;
    } catch (error) {
        console.error(error)
        return null;
    }
}
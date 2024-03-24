import { CreateTasksResponse, UploadTaskImageResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

export async function createTask(
    title: string,
    description: string,
    startDate: Date | undefined,
    endDate: Date | undefined,
    workers: number,
    wages: number,
    category: string,
    location: {
        name: string;
        latitude: number;
        longitude: number;
    },
): Promise<CreateTasksResponse> {
    return instance
        .post('/v1/tasks', {
            title,
            description,
            startDate,
            endDate,
            workers,
            wages,
            category,
            location,
        })
        .then(res => {
            const result: CreateTasksResponse = res.data;
            console.log('posting task', title);
            if (!result.success) {
                // setToken(result.token);
                console.log(result);
            }
            return result;
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
                return error.response.data;
            } else if (error.response && error.response.status === 500) {
                console.log(error.response.data);
                return error.response.data;
            }

            // console.log(email)
            console.log(error);
            return Promise.reject('Can not fetch user');
        });
}

// type ImageFileType = 'jpg' | 'jpeg' | 'png' | 'gif' | 'bmp';

export async function uploadTaskImage(
    _id: string,
    seq: number,
    imageFile: any,
): Promise<UploadTaskImageResponse> {
    const file = imageFile[0];
    console.log(file.type);
    const fileData = new Blob([Buffer.from(await file.arrayBuffer())]); // Convert Buffer to Blob
    const formData = new FormData(); // Instantiate a new FormData object

    formData.append('file', fileData, file.name); // Append the file data with the file name
    return instance
        .post('/v1/tasks/' + _id + '/task-image', file, {
            headers: { 'Content-Type': file.type },
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            responseType: 'json',
        })
        .then(res => {
            const result: UploadTaskImageResponse = res.data;
            console.log('Uploading Image for task', _id);

            return { message: 'Task image uploaded successfully' };
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
                return error.response.data;
            } else if (error.response && error.response.status === 403) {
                console.log(error.response.data);
                return error.response.data;
            }

            // console.log(email)
            console.log(error);
            return Promise.reject('Can not fetch user');
        });
}

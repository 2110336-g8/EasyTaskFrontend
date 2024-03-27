import { WageRange } from '@/app/(main)/(protected)/task/page';
import { AllTasksResponse, GetCategoriesResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

export const getAllTasks = async function ({
    page = 1,
    limit = 8,
    name,
    categoryFilters,
    isIndividual,
    wageRangeFilters
}: {
    page: number;
    limit: number;
    name?: string;
    categoryFilters?: string[];
    isIndividual?: boolean;
    wageRangeFilters?: WageRange[];
}): Promise<AllTasksResponse> {
    return instance
        .post('/v1/tasks/page', {
            page,
            limit,
            name,
            filter: {
                category: categoryFilters,
                individual: isIndividual,
                wages: wageRangeFilters
            },
        })
        .then(response => {
            return response.data as AllTasksResponse;
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                // Unauthorized
                return error.response.data as AllTasksResponse;
            }
            // Other errors
            return Promise.reject('Can not fetch tasks');
        });
};

export const getCategories = async function (): Promise<GetCategoriesResponse> {
    return instance
        .get('/v1/tasks/categories', {
        })
        .then(response => {
            return response.data as GetCategoriesResponse;
        })
        .catch(error => {
            if (error.response && error.response.status === 500) {
                // Unauthorized
                return error.response.data as GetCategoriesResponse;
            }
            // Other errors
            return Promise.reject('Can not fetch categories');
        });
};

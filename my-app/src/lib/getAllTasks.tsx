import { AllTasksResponse } from '@/types/task';
import { instance } from '@/utils/axiosInstance';

export const getAllTasks = async function ({
    page = 1,
    limit = 8,
    categoryFilters,
    isIndividual,
}: {
    page: number;
    limit: number;
    categoryFilters?: string[];
    isIndividual?: boolean;
    // wageRangeFilters?: ;
}): Promise<AllTasksResponse> {
    return instance
        .post('/v1/tasks/page', {
            page,
            limit,
            filter: {
                category: categoryFilters,
                individual: isIndividual,
                // startingWage,
                // endingWage,
            },
        })
        .then(response => {
            return response.data as AllTasksResponse;
        })
        .catch(error => {
            if (error.response && error.response.status === 500) {
                // Unauthorized
                return error.response.data as AllTasksResponse;
            }
            // Other errors
            return Promise.reject('Can not fetch tasks');
        });
};

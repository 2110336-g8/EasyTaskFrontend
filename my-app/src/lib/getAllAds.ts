'use client';
import { instance } from '@/utils/axiosInstance';
import { AdsDetailKV, AdsDetailResponse } from '@/types/task';

export async function getAllAdsFromUser(userId: string): Promise<AdsDetailKV> {
    return instance
        .get(`/v1/tasks/adsOf/${userId}`)
        .then(res => {
            const pResult: AdsDetailResponse[] = res.data;
            let result: AdsDetailKV = {};
            for (const ads of pResult) {
                result[ads._id] = ads;
            }
            return result;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

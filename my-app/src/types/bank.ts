export interface Bank {
    id: string;
    name: string;
    url: string;
}

export interface AllBanksResponse {
    success: boolean;
    banks: Bank[];
}
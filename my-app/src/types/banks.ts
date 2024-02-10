import { Bank } from "./bank";

export interface AllBanksResponse {
    success: boolean;
    banks: Bank[];
}
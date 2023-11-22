import { PurchaseModel } from "@/modules/purchases/model";
import { savePurchases } from "..";
import { CacheStorage } from "@/db/cache";
 
export class LocalSavePurcheses implements savePurchases {
    // private cacheStorage: CacheStorage;
    constructor (private readonly cacheStorage: CacheStorage) {
        this.cacheStorage = cacheStorage;
    }

    async save (purchases: PurchaseModel[]) {
        this.cacheStorage.delete('purchases');
    };
}
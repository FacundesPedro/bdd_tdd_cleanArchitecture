import { PurchaseModel } from "@/modules/purchases/model";
import { SavePurchases } from "..";
import { CacheStorage } from "@/db/cache";
 
export class LocalSavePurcheses implements SavePurchases {
    // private cacheStorage: CacheStorage;
    constructor (private readonly cacheStorage: CacheStorage) {
        this.cacheStorage = cacheStorage;
    }

    async save (purchases: PurchaseModel[]) {
        const key = 'purchases';

        this.cacheStorage.delete(key);
        this.cacheStorage.insert(key, purchases);
    };
}

export default LocalSavePurcheses;
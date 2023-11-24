import { PurchaseModel } from "@/modules/purchases/model";
import { SavePurchases } from "..";
import { CacheStorage } from "@/db/cache";
 
export class LocalSavePurcheses implements SavePurchases {
    // private cacheStorage: CacheStorage;
    constructor (
        private readonly cacheStorage: CacheStorage<PurchaseModel[]>,
        private readonly when: Date,
    ) {
        this.cacheStorage = cacheStorage;
        this.when = when;
    }

    async save (purchases: PurchaseModel[]) {
        const key = 'purchases';

        this.cacheStorage.delete(key);
        this.cacheStorage.insert(key, {
            when: this.when,
            data: purchases
        });
    };
}

export default LocalSavePurcheses;
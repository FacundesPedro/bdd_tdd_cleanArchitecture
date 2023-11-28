import { LoadPurcheses } from '..';
import { PurchaseModel } from '../../../model';
import { CacheStorage } from '@/db/cache';

export class LocalLoadPurcheses implements LoadPurcheses {
    // private cacheStorage: CacheStorage;
    private key = 'purchases';

    constructor(
        private readonly cacheStorage: CacheStorage<LoadPurcheses.Result>,
        private readonly when: Date,
    ) {
        this.cacheStorage = cacheStorage;
        this.when = when;
    }

    async loadAll(): Promise<LoadPurcheses.Result> {
        try {
            const data = this.cacheStorage.fetch(this.key);
            return data;
        } catch (err) {
            this.cacheStorage.delete(this.key);
            return [];
        }
    };
}

// export {
//     savePurchases,
// }
import { CacheStorage } from "@/modules/cache";
import { savePurchases } from "..";
import { PurchaseModel } from "@/modules/purchases/model";

class LocalSavePurcheses implements savePurchases {
    // private cacheStorage: CacheStorage;
    constructor (private readonly cacheStorage: CacheStorage) {
        this.cacheStorage = cacheStorage;
    }

    async save (purchases: PurchaseModel[]) {
        this.cacheStorage.delete();
    };
}
class CacheStorageMock implements CacheStorage {
    deleteCallCount = 0;

    delete () {
        this.deleteCallCount++;
    };
}

interface ISutTest<T,J> {
    sut: T,
    storage: J,
}

type LocalSaveSut = ISutTest<LocalSavePurcheses, CacheStorageMock>

const makeSut = (): LocalSaveSut => {
    const storage = new CacheStorageMock();

    return {
        storage,
        sut: new LocalSavePurcheses(storage)
    }
}

describe('LocalSavePurchases', () => {
    test('Should not have 0 deletedCalls', () => {
        const {storage, sut} = makeSut();

        expect(storage.deleteCallCount).toBe(0);
    });

    test('Should have a deleted count incresed after save purchases', async () => {
        const {storage, sut} = makeSut();
        
        await sut.save([]);

        expect(storage.deleteCallCount).toBe(1);
    });

    test('Should have a deleted count incresed after save purchases', async () => {
        const {storage, sut} = makeSut();
        
        await sut.save([]);

        expect(storage.deleteCallCount).toBe(1);
    }); 
});
import { CacheStorage } from "@/db/cache"; 
import { savePurchases } from "..";
import { PurchaseModel } from "@/modules/purchases/model";
import { LocalSavePurcheses } from ".";

class CacheStorageMock implements CacheStorage {
    deleteCallCount = 0;
    key = null;
    insertCallCount = 0;

    delete (key: string) {
        this.deleteCallCount++;
        this.key = key;
    };
}

interface ISut<T,J> {
    sut: T,
    storage: J,
}

type LocalSaveSut = ISut<LocalSavePurcheses, CacheStorageMock>;

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

    test("Should delete a specific key ('purchases') after save()", async () => {
        const {storage, sut} = makeSut();
        
        await sut.save([]);

        expect(storage.key).toBe('purchases');
        expect(storage.deleteCallCount).toBe(1);
    }); 

    test("Should not insert new cache in case of delete failure", async () => {
        const {storage, sut} = makeSut();
        
        jest.spyOn(storage, 'delete').mockImplementationOnce(() => { throw new Error() })

        const promise = sut.save([]);

        expect(storage.insertCallCount).toBe(0);
        expect(promise).rejects.toThrow();
    }); 
});
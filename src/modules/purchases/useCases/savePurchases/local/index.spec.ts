import { CacheStorage } from "@/db/cache"; 
import { SavePurchases } from "..";
import { PurchaseModel } from "@/modules/purchases/model";
import { LocalSavePurcheses } from ".";

// mocks :O
class CacheStorageMock implements CacheStorage {
    deleteCallCount = 0;
    deleteKey = null;
    insertKey = null;
    insertCallCount = 0;
    insertValue = null;

    delete (key: string) {
        this.deleteCallCount++;
        this.deleteKey = key;
    };
    insert (key, data: any) {
        this.insertCallCount++;
        this.insertKey = key;
        this.insertValue = data;
    };

    throwDeleteError (): void {
        jest.spyOn(CacheStorageMock.prototype, 'delete').mockImplementationOnce(() => {throw new Error()});
    }
}
// move to indepoendent file
interface ISut<T,J> {
    sut: T,
    storage: J,
}

type LocalSaveSut = ISut<LocalSavePurcheses, CacheStorageMock>;

const mockPurchases = (): SavePurchases.Params => {
    return [
        {id: 1, value: 99, created_at: new Date()},
        {id: 2, value: 20, created_at: new Date()},
        {id: 3, value: 234, created_at: new Date()},
        {id: 4, value: 15, created_at: new Date()}
    ]
}

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

    test('Should have a DELETE count incresed after save purchases', async () => {
        const {storage, sut} = makeSut();
        
        await sut.save([]);

        expect(storage.deleteCallCount).toBe(1);
    });

    test("Should DELETE a specific key ('purchases') after save()", async () => {
        const {storage, sut} = makeSut();
        
        await sut.save([]);

        expect(storage.deleteKey).toBe('purchases');
        expect(storage.deleteCallCount).toBe(1);
    }); 

    test("Should NOT INSERT new cache in case of delete failure", async () => {
        const {storage, sut} = makeSut();
        
        storage.throwDeleteError();

        const promise = sut.save([]);

        expect(storage.insertCallCount).toBe(0);
        expect(promise).rejects.toThrow();
    }); 
    test("Should INSERT new cache in case of delete success", async () => {
        const {storage, sut} = makeSut();
        const purchases = mockPurchases();

        await sut.save( purchases );

        expect(storage.insertCallCount).toBe(1);
        expect(storage.deleteCallCount).toBe(1);
        expect(storage.insertKey).toBe('purchases');  
        expect(storage.insertValue).toBe(purchases);
    }); 
});
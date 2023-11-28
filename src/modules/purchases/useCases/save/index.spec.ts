import { CacheStorage } from "@/db/cache"; 
import { PurchaseModel } from "@/modules/purchases/model";
import { LocalSavePurcheses } from "./local";
import { CacheStorageMock } from "@/db/test/MockCache";
import { SavePurchases } from ".";
import { mockPurchases } from "@/db/test/Purchases";

// move to indepoendent file
interface ISut<T,J> {
    sut: T,
    storage: J,
}

type LocalSaveSut = ISut<LocalSavePurcheses, CacheStorageMock>;

const makeSut = (when = new Date()): LocalSaveSut => {
    const storage = new CacheStorageMock();

    return {
        storage,
        sut: new LocalSavePurcheses(storage, when),
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
        
        storage.mockDeleteError();

        const promise = sut.save([]);

        expect(storage.insertCallCount).toBe(0);
        expect(promise).rejects.toThrow();
    }); 
    test("Should INSERT new cache in case of delete success", async () => {
        const when = new Date();
        const {storage, sut} = makeSut(when);
        const purchases = mockPurchases();

        await sut.save( purchases );

        expect(storage.insertCallCount).toBe(1);
        expect(storage.deleteCallCount).toBe(1);
        expect(storage.insertKey).toBe('purchases');  
        expect(storage.insertValue).toEqual({data: purchases, when});
    }); 
});
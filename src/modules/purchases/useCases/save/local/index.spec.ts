import { CacheStorage } from "@/db/cache";
import { SavePurchases } from "..";
import { PurchaseModel } from "@/modules/purchases/model";
import { LocalSavePurcheses } from ".";
import { mockPurchases } from "@/db/test/Purchases";
import { CacheStorageMock } from "@/db/test/Cache";

// move to independent file
interface ISut<T, J> {
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
        const { storage, sut } = makeSut();

        expect(storage.callList).toEqual([]);
    });

    test('Should have a DELETE count incresed after save purchases', async () => {
        const { storage, sut } = makeSut();

        const purchases = mockPurchases();

        await sut.save(purchases);

        expect(storage.deleteCallCount).toBe(1);
    });

    test("Should DELETE a specific key ('purchases') after save()", async () => {
        const { storage, sut } = makeSut();

        const purchases = mockPurchases();

        await sut.save(purchases);

        expect(storage.deleteKey).toBe('purchases');
        expect(storage.deleteCallCount).toBe(1);
    });

    test("Should NOT INSERT new cache in case of delete failure", async () => {
        const { storage, sut } = makeSut();

        storage.mockDeleteError();
        const purchases = mockPurchases();

        const promise = sut.save(purchases);

        expect(storage.insertCallCount).toBe(0);
        expect(promise).rejects.toThrow();
    });
    test("Should INSERT new cache in case of delete sucess", async () => {
        const when = new Date();
        const { storage, sut } = makeSut(when);

        const purchases = mockPurchases();

        await sut.save(purchases);

        expect(storage.insertCallCount).toBe(1);
        expect(storage.deleteCallCount).toBe(1);
        expect(storage.insertKey).toBe('purchases');
        expect(storage.insertValue).toEqual({data: purchases, when});
    });
    test("Should throw error in case of insert failure", async () => {
        const when = new Date();
        const { storage, sut } = makeSut(when);

        storage.mockInsertError();
        const purchases = mockPurchases();

        const promise = sut.save(purchases);

        expect(promise).rejects.toThrow();
        expect(storage.callList).toEqual([{name: "delete"}, {name: "insert"}])
    });
});
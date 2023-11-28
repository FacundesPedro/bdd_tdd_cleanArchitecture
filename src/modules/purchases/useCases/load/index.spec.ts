
import { mockPurchases } from "@/db/test/Purchases";
import { CacheStorageMock } from "@/db/test/MockCache";
import { LocalLoadPurcheses } from "./local";
import { PurchaseModel } from "../../model";

// move to independent file
interface ISut<T, J> {
    sut: T,
    storage: J,
}

type LocalLoadPurchases = ISut<LocalLoadPurcheses, CacheStorageMock<PurchaseModel[]>>;

const makeSut = ({ when = new Date(),data = mockPurchases() }): LocalLoadPurchases => {
    const storage = new CacheStorageMock<PurchaseModel[]>( data );

    return {
        storage,
        sut: new LocalLoadPurcheses(storage, when),
    }
}

describe('LocalLoadPurchases', () => {
    test('Should not have 0 deletedCalls', async () => {
        const { storage, sut } = makeSut({});

        expect(storage.callList).toEqual([]);
    });

    test('Should call for correct fetch key', async () => {
        const { storage, sut } = makeSut({});
        
        await sut.loadAll();

        expect(storage.fetchKey).toBe('purchases');
        expect(storage.callList).toEqual([CacheStorageMock.CallType.fetch]);
    });

    test('Should return a empty list in case of fetch error', async () => {
        const { storage, sut } = makeSut({});
        
        storage.mockFetchError();
        const data = await sut.loadAll();

        expect(storage.deleteKey).toBe('purchases');
        expect(storage.callList).toEqual([CacheStorageMock.CallType.fetch, CacheStorageMock.CallType.delete]);
        expect(data).toEqual([]);
    });
    test('Should return a list if cache time is less than 3 days', async () => {
        const when = new Date();
        const purchases = mockPurchases();
        const { storage, sut } = makeSut({data: purchases});
        
        await sut.loadAll(); 
        
        expect(storage.callList).toEqual([CacheStorageMock.CallType.fetch]);
        expect(storage.fetchValue).toEqual(purchases);
    });
});
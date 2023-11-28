import { CacheStorage } from "@/db/cache";
import { mockPurchases } from "../Purchases";

export class CacheStorageMock <T = any> implements CacheStorage<T> {
    callList: CacheStorageMock.CallType[] = [];
    deleteCallCount = 0;
    deleteKey = null;
    insertKey = null;
    insertCallCount = 0;
    insertValue:T = null;
    fetchKey = null;
    fetchValue:T = null;
    mockValue = null;

    constructor (mockValue: T = null) {
        this.mockValue = mockValue;
    }

    delete(key: string) {
        this.callList.push(CacheStorageMock.CallType.delete);
        this.deleteCallCount++;
        this.deleteKey = key;
    };
    insert(key, data) {
        this.callList.push(CacheStorageMock.CallType.insert);
        this.insertCallCount++;
        this.insertKey = key;
        this.insertValue = data;
    };
    fetch(key: string) {
        this.callList.push(CacheStorageMock.CallType.fetch);
        this.fetchKey = key;
        this.fetchValue = this.mockValue;

        return this.mockValue;
    };

    mockDeleteError(): void {
        jest.spyOn(CacheStorageMock.prototype, 'delete').mockImplementationOnce(() => { 
            this.callList.push(CacheStorageMock.CallType.delete);
            throw new Error() 
        });
    }
    mockInsertError(): void {
        jest.spyOn(CacheStorageMock.prototype, 'insert').mockImplementationOnce(() => { 
            this.callList.push(CacheStorageMock.CallType.insert);
            throw new Error() 
        });
    }
    mockFetchError(): void {
        jest.spyOn(CacheStorageMock.prototype, 'fetch').mockImplementationOnce(() => { 
            this.callList.push(CacheStorageMock.CallType.fetch);
            throw new Error() 
        });
    }

}

export namespace CacheStorageMock {
    export enum CallType {
        insert = "insert",
        fetch = "fetch",
        delete = "delete"
    }

    export type Call = {
        name: keyof CacheStorageMock,
    }
}
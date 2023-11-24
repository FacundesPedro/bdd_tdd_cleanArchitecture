import { CacheStorage } from "@/db/cache";

export class CacheStorageMock implements CacheStorage {
    callList: CacheStorageMock.Call[] = [];
    deleteCallCount = 0;
    deleteKey = null;
    insertKey = null;
    insertCallCount = 0;
    insertValue = null;

    delete(key: string) {
        this.callList.push({name: 'delete'});
        this.deleteCallCount++;
        this.deleteKey = key;
    };
    insert(key, data: any) {
        this.callList.push({name: 'insert'});
        this.insertCallCount++;
        this.insertKey = key;
        this.insertValue = data;
    };

    mockDeleteError(): void {
        jest.spyOn(CacheStorageMock.prototype, 'delete').mockImplementationOnce(() => { 
            this.callList.push({name: 'delete'});
            throw new Error() 
        });
    }
    mockInsertError(): void {
        jest.spyOn(CacheStorageMock.prototype, 'insert').mockImplementationOnce(() => { 
            this.callList.push({name: 'insert'});
            throw new Error() 
        });
    }
}

namespace CacheStorageMock {
    export type Call = {
        name: keyof CacheStorageMock,
    }
}
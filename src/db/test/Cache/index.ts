import { CacheStorage } from "@/db/cache";

export class CacheStorageMock implements CacheStorage {
    deleteCallCount = 0;
    deleteKey = null;
    insertKey = null;
    insertCallCount = 0;
    insertValue = null;

    delete(key: string) {
        this.deleteCallCount++;
        this.deleteKey = key;
    };
    insert(key, data: any) {
        this.insertCallCount++;
        this.insertKey = key;
        this.insertValue = data;
    };

    throwDeleteError(): void {
        jest.spyOn(CacheStorageMock.prototype, 'delete').mockImplementationOnce(() => { throw new Error() });
    }
    throwInsertError(): void {
        jest.spyOn(CacheStorageMock.prototype, 'insert').mockImplementationOnce(() => { throw new Error() });
    }
}
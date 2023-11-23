export interface CacheStorage {
    delete: (key: string) => void;
    insert: (key: string, data: any) => void;
    // deleteCallCount: number;
}
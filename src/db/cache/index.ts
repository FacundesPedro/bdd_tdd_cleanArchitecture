export interface CacheStorage {
    delete: (key: string) => void;
    // deleteCallCount: number;
}
export interface CacheStorage<T = any , J = { when: Date, data: T }> {
    delete: (key: string) => void;
    insert: (key: string, data: J) => void;
    fetch: (key: string) => T;
    // deleteCallCount: number;
}
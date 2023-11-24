export interface CacheStorage<T = any , J = { when: Date, data: T }> {
    delete: (key: string) => void;
    insert: (key: string, data: J) => void;
    // deleteCallCount: number;
}
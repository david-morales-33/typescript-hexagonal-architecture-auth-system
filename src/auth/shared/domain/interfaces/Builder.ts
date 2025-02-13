
export class Builder<T> {
    private instance: Partial<T> = {};

    public set<K extends keyof T>(key: K, value: T[K]): this {
        this.instance[key] = value;
        return this;
    }

    public build(): T {
        return this.instance as T;
    }
}
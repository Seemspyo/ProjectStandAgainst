export class Indexer<T> {

    private map: Map<number, T> = new Map();

    public add(value: T): number {
        const id = performance.now();

        this.map.set(id, value);

        return id;
    }

    public remove(id: number): boolean {
        if (this.map.has(id)) {
            this.map.delete(id);
            return true;
        }

        return false;
    }

    public get values(): IterableIterator<T> {
        return this.map.values();
    }

}
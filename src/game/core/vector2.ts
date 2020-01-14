import { Vector2Value } from '../@types';


export default class Vector2 {

    public static add(...vectors: Array<Vector2>): Vector2 {
        const vector2 = new Vector2(0, 0);

        for (const v of vectors) vector2.add(v);

        return vector2;
    }

    public static sub(...vectors: Array<Vector2>): Vector2 {
        const vector2 = new Vector2(0, 0);

        for (const v of vectors) vector2.sub(v);

        return vector2;
    }

    public static multiply(vector2: Vector2, scalar: number): Vector2 {
        vector2 = vector2.clone();
        vector2.multiply(scalar);

        return vector2;
    }

    public static divide(vector2: Vector2, scalar: number): Vector2 {
        vector2 = vector2.clone();
        vector2.divide(scalar);

        return vector2;
    }

    constructor(
        public x: number,
        public y: number
    ) {}

    public get size(): number {
        const { x, y } = this;

        return Math.sqrt(x * x + y * y);
    }

    public normalize(): Vector2Value {
        const { x, y, size } = this;

        if (size) {
            this.x = x / size;
            this.y = y / size;
        }

        return this.value;
    }

    public add(vector2: Vector2): Vector2Value {
        this.x += vector2.x;
        this.y += vector2.y;

        return this.value;
    }

    public sub(vector2: Vector2): Vector2Value {
        this.x -= vector2.x;
        this.y -= vector2.y;

        return this.value;
    }

    public multiply(scalar: number): Vector2Value {
        this.x *= scalar;
        this.y *= scalar;

        return this.value;
    }

    public divide(scalar: number): Vector2Value {
        this.x /= scalar;
        this.y /= scalar;

        return this.value;
    }

    public reset(x: number, y: number): Vector2Value {
        this.x = x;
        this.y = y;

        return this.value;
    }

    public get value(): Vector2Value {
        const { x, y } = this;

        return { x, y }
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

}
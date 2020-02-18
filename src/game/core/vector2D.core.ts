/** Types */
import { Raw2D } from '../@types';

/** Custom Modules */
import { radians } from '../core/functions.core';


export class Vector2D {

    public static add(...vectors: Array<Vector2D>): Vector2D {
        const vector2 = new Vector2D(0, 0);

        for (const v of vectors) vector2.add(v);

        return vector2;
    }

    public static sub(...vectors: Array<Vector2D>): Vector2D {
        const vector2 = new Vector2D(0, 0);

        for (const v of vectors) vector2.sub(v);

        return vector2;
    }

    public static multiply(vector2: Vector2D, scalar: number): Vector2D {
        vector2 = vector2.clone();
        vector2.multiply(scalar);

        return vector2;
    }

    public static divide(vector2: Vector2D, scalar: number): Vector2D {
        vector2 = vector2.clone();
        vector2.divide(scalar);

        return vector2;
    }

    public static from(radian: number): Vector2D {
        return new Vector2D(Math.cos(radian), Math.sin(radian));
    }

    constructor(
        public x: number,
        public y: number
    ) {}

    public get size(): number {
        const { x, y } = this;

        return Math.sqrt(x * x + y * y);
    }

    public get heading(): number {
        return Math.atan2(this.y, this.x);
    }

    public normalize(): this {
        const { x, y, size } = this;

        if (size) {
            this.x = x / size;
            this.y = y / size;
        }

        return this;
    }

    public add(vector2: Vector2D): this {
        this.x += vector2.x;
        this.y += vector2.y;

        return this;
    }

    public sub(vector2: Vector2D): this {
        this.x -= vector2.x;
        this.y -= vector2.y;

        return this;
    }

    public multiply(scalar: number): this {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    public divide(scalar: number): this {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }

    public limit(max: number): this {
        if (this.size > max) this.normalize().multiply(max);

        return this;
    }

    public between(v: Vector2D): number {
        let
        bx = this.x - v.x,
        by = this.y - v.y;

        return Math.sqrt(bx * bx + by * by);
    }

    public transform(radian: number): this {
        this.x *= Math.cos(radian);
        this.y *= Math.sin(radian);

        return this;
    }

    public get raw(): Raw2D {
        const { x, y } = this;

        return { x, y }
    }

    public get raws(): [ number, number ] {
        return [ this.x, this.y ]
    }

    public clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

}
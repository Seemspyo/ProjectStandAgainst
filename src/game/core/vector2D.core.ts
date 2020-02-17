/** Types */
import { Raw2D } from '../@types';


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

    constructor(
        public x: number,
        public y: number
    ) {}

    public get size(): number {
        const { x, y } = this;

        return Math.sqrt(x * x + y * y);
    }

    public normalize(): Raw2D {
        const { x, y, size } = this;

        if (size) {
            this.x = x / size;
            this.y = y / size;
        }

        return this.value;
    }

    public add(vector2: Vector2D): Raw2D {
        this.x += vector2.x;
        this.y += vector2.y;

        return this.value;
    }

    public sub(vector2: Vector2D): Raw2D {
        this.x -= vector2.x;
        this.y -= vector2.y;

        return this.value;
    }

    public multiply(scalar: number): Raw2D {
        this.x *= scalar;
        this.y *= scalar;

        return this.value;
    }

    public divide(scalar: number): Raw2D {
        this.x /= scalar;
        this.y /= scalar;

        return this.value;
    }

    public reset(x: number, y: number): Raw2D {
        this.x = x;
        this.y = y;

        return this.value;
    }

    public get value(): Raw2D {
        const { x, y } = this;

        return { x, y }
    }

    public clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

}
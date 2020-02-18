/** Node Modules */
import { Container, Sprite, Ticker } from 'pixi.js';

/** Types */
import { GameBehavior } from '../@types';

/** Custom Modules */
import { Vector2D } from '../core/vector2D.core';


export class Move2D implements GameBehavior {

    private ticker: Ticker;
    private forces: Map<number, Vector2D>;

    public readonly velocity = new Vector2D(0, 0);

    constructor(
        public subject: Container | Sprite,
        public position: Vector2D,
        public mass: number = 1,
        public friction: number = 0,
        public maxSpeed: number = 30
    ) {
        this.init();
    }

    init() {
        this.ticker = new Ticker();
        this.forces = new Map();

        this.ticker.add(() => this.update());
    }

    destroy() {
        this.velocity.multiply(0);
        this.ticker.destroy();

        this.ticker =
        this.forces = void 0;
    }

    run() {
        if (!this.ticker.started) this.ticker.start();
    }

    stop() {
        if (!this.ticker.started) this.ticker.stop();
    }

    public addForce(force: Vector2D): number {
        const id = performance.now();

        this.forces.set(id, force);

        return id;
    }

    public removeForce(id: number): boolean {
        if (this.forces.has(id)) {
            this.forces.delete(id);
            return true;
        }

        return false;
    }

    private get acceleration(): Vector2D {
        const forces = Array.from(this.forces.values()).map(force => Vector2D.divide(force, this.mass));

        return Vector2D.add(...forces);
    }

    private update(): void {
        if (this.friction) {
            const friction = this.velocity.clone().multiply(this.friction);

            this.velocity.sub(friction);
        }

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);

        this.subject.position.set(...this.position.raws);
    }

}
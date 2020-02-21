/** Node Modules */
import { Container, Sprite, Ticker } from 'pixi.js';

/** Types */
import { GameBehavior } from '../@types';

/** Custom Modules */
import { Vector2D } from '../core/vector2D.core';
import { Indexer } from '../core/indexer.core';


export class Move2D implements GameBehavior {

    private ticker: Ticker;
    public force: Indexer<Vector2D>;
    public uniqueForce: Indexer<Vector2D>;

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
        this.force = new Indexer();
        this.uniqueForce = new Indexer();

        this.ticker.add(() => this.update());
    }

    destroy() {
        this.velocity.multiply(0);
        this.ticker.destroy();

        this.ticker =
        this.force =
        this.uniqueForce = void 0;
    }

    run() {
        if (!this.ticker.started) this.ticker.start();
    }

    stop() {
        if (this.ticker.started) this.ticker.stop();
    }

    private get acceleration(): Vector2D {
        const forces: Array<Vector2D> = new Array();
        for (const force of this.force.values) forces.push(force.divide(this.mass));

        return Vector2D.add(...forces);
    }

    private get uniqueAcceleration(): Vector2D {
        return Vector2D.add(...this.uniqueForce.values);
    }

    private update(): void {
        if (this.friction) {
            const friction = this.velocity.clone().multiply(this.friction);

            this.velocity.sub(friction);
        }

        this.velocity.add(this.acceleration).limit(this.maxSpeed).add(this.uniqueAcceleration);
        this.position.add(this.velocity);

        this.subject.position.set(...this.position.raws);
    }

}
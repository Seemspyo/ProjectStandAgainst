/** Types */
import { GameBehavior } from '../@types';

/** Node Modules */
import { Container, Sprite, Ticker } from 'pixi.js';

/** Custom Modules */
import { Vector2D } from '../core/vector2D.core';


export class Stare2D implements GameBehavior {

    private ticker: Ticker;

    constructor(
        public subject: Container | Sprite,
        public position: Vector2D,
        public target: Vector2D
    ) {
        this.init();
    }

    init() {
        this.ticker = new Ticker();

        this.ticker.add(() => this.update());
    }

    destroy() {
        this.ticker.destroy();

        this.ticker = void 0;
    }

    run() {
        if (!this.ticker.started) this.ticker.start();
    }

    stop() {
        if (this.ticker.started) this.ticker.stop();
    }

    private update(): void {
        const between = Vector2D.between(this.position, this.target);

        this.subject.rotation = between.heading;
    }

}
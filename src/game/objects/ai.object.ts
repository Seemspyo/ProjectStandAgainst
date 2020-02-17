/** Node Modules */
import { Container, Graphics } from 'pixi.js';

/** Types */
import { GameObject } from '../@types';


export class AI implements GameObject {

    public container: Container;
    public body: Graphics;
    public eyes: [ Graphics, Graphics ];

    public alive: boolean = false;

    constructor(x?: number, y?: number, scale?: number,  rotation?: number) {
        this.create();

        this.setPosition(x, y);
        this.setScale(scale);
        this.setRotation(rotation);
    }

    create() {
        if (this.alive) return;

        this.container = new Container();
        this.body = this.getCircle(0, 0, 100, 0x333333);
        this.eyes = [
            this.getCircle(-40, -70, 12, 0x777777),
            this.getCircle(40, -70, 12, 0x777777)
        ]

        const clip = this.getCircle(0, 0, 100, 0x000000);

        this.container.mask = clip;
        this.container.addChild(clip, this.body, ...this.eyes);

        this.alive = true;
    }

    kill() {
        if (!this.alive) return;

        this.container.destroy();

        this.alive = false;
    }

    public setPosition(x: number = 0, y: number = 0): void {
        this.container.position.set(x, y);
    }

    public setScale(n: number = 1): void {
        this.container.scale.set(n, n);
    }

    public setRotation(radian: number = 0): void {
        this.container.rotation = radian;
    }

    private getCircle(x: number, y: number, radius: number, color: number): Graphics {
        const circle = new Graphics();

        circle.beginFill(color);
        circle.drawCircle(x, y, radius);
        circle.endFill();

        return circle;
    }

}
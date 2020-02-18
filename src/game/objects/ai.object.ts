/** Node Modules */
import { Container, Graphics } from 'pixi.js';

/** Types */
import { GameObject, AIObjectOption } from '../@types';

/** Custom Modules */
import { assign } from '../core/functions.core';


export class AI implements GameObject {

    public subject: Container;
    public body: Graphics;
    public eyes: [ Graphics, Graphics ];

    public alive: boolean = false;

    private get defaultOption(): AIObjectOption {
        return { x: 0, y: 0, scale: 1, rotation: 0, bodyColor: 0x333333, eyeColorLeft: 0x777777, eyeColorRight: 0x777777 }
    }

    constructor(option?: AIObjectOption) {
        this.create(option);
    }

    create(option: AIObjectOption = {}) {
        if (this.alive) return;

        option = assign(option, this.defaultOption, false);

        this.subject = new Container();
        this.body = this.getCircle(0, 0, 100, option.bodyColor);
        this.eyes = [
            this.getCircle(-40, -70, 12, option.eyeColorLeft),
            this.getCircle(40, -70, 12, option.eyeColorRight)
        ]

        const clip = this.getCircle(0, 0, 100, 0x00000000);

        this.subject.mask = clip;
        this.subject.addChild(clip, this.body, ...this.eyes);

        this.subject.position.set(option.x, option.y);
        this.subject.scale.set(option.scale, option.scale);
        this.subject.rotation = option.rotation;

        this.alive = true;
    }

    kill() {
        if (!this.alive) return;

        this.subject.destroy();

        this.eyes =
        this.body =
        this.subject = void 0;

        this.alive = false;
    }

    private getCircle(x: number, y: number, radius: number, color: number): Graphics {
        const circle = new Graphics();

        circle.beginFill(color);
        circle.drawCircle(x, y, radius);
        circle.endFill();

        return circle;
    }

}
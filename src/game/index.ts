import { Application, Graphics, Rectangle } from 'pixi.js';
import AspectCalculator from './modules/aspect-calculator.module';
import { EventHelper } from './modules/helper.module';
import { Size } from './types';


export default class Game {

    private readonly baseSize: Size = {
        width: 1920,
        height: 1080
    }

    private aspectCalculator = new AspectCalculator(window);
    private game: Application;

    private events: Array<() => void> = []

    constructor(
        private view?: HTMLCanvasElement
    ) {
        if (!this.view) this.view = document.createElement('canvas');

        this.game = new Application({ view: this.view, backgroundColor: 0xcccccc });
    }

    public init(): void {
        this.watchAspect();
        this.addMask();
    }

    public destroy(): void {
        for (const destroy of this.events) destroy();
    }

    private watchAspect(): void {
        this.aspectCalculator.watch();

        const unsubscribe = EventHelper.subscribe(this.aspectCalculator.size, (size: Size) => {
            const { renderer, stage } = this.game;

            renderer.resize(size.width, size.height);

            const scale = this.aspectCalculator.getScale(this.baseSize.width);

            stage.scale.set(scale, scale);
        });

        this.events.push(unsubscribe);
    }

    private addMask(): void {
        const
        { stage } = this.game,
        { width, height } = this.baseSize,
        mask = new Graphics();

        mask.drawRect(0, 0, width, height);

        stage.addChild(mask);
        stage.sortableChildren = true;
        stage.interactive = true;
        stage.hitArea = new Rectangle(0, 0, width, height);
    }

}
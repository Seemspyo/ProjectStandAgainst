import { Application } from 'pixi.js';


export default class Game {

    private game: Application;
    private events: Array<() => void> = []

    constructor(
        private view?: HTMLCanvasElement
    ) {
        if (!this.view) this.view = document.createElement('canvas');

        this.game = new Application({ view: this.view, backgroundColor: 0xcccccc, antialias: true });
    }

    public init(): void {

    }

    public destroy(): void {
        for (const destroy of this.events) destroy();
    }

}
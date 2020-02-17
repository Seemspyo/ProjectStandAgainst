/** Node Modules */
import { Application } from 'pixi.js';

/** Custom Modules */
import { EventBinder } from './core/event-binder.core';
import { ResizeWatcher } from './core/resize-watcher.core';

/** Types */
import { Size } from './@types';

/** Objects */
import { AI } from './objects/ai.object';


export default class Game {

    private game: Application;
    private eventBinder = new EventBinder();
    private resizeWatcher: ResizeWatcher;
    private events: Array<() => void> = []

    private initialized: boolean = false;

    constructor(
        private view: HTMLCanvasElement,
        private container: HTMLElement
    ) {}

    public init(): void {
        if (this.initialized) return;

        this.initialized = true;

        this.game = new Application({ view: this.view, backgroundColor: 0xcccccc, antialias: true });
        this.view.setAttribute('tabindex', '0');

        this.resizeWatcher = new ResizeWatcher(this.container, 1920, 1080, this.eventBinder);
        this.resizeWatcher.watch();

        this.events.push( this.eventBinder.subscribe(this.resizeWatcher.size, size => this.rescale(size)) );
    }

    public destroy(): void {
        if (!this.initialized) return;

        for (const remove of this.events) remove();
        this.events = []

        this.resizeWatcher.destroy();
        this.view.removeAttribute('tabindex');

        this.initialized = false;
    }

    private rescale(size: Size): void {
        const { renderer, stage } = this.game;

        renderer.resize(size?.width || 1920, size?.height || 1080);

        stage.scale.x =
        stage.scale.y = this.resizeWatcher.scale;
    }

}
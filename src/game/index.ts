/** Node Modules */
import { Application, interaction, Rectangle, Container, IPoint, Point, Ticker } from 'pixi.js';

/** Custom Modules */
import { EventBinder } from './core/event-binder.core';
import { ResizeWatcher } from './core/resize-watcher.core';
import { Vector2D } from './core/vector2D.core';
import { radians, degrees } from './core/functions.core';
import { Move2D } from './behaviors/move2D.behavior';
import { Stare2D } from './behaviors/stare2D.behavior';

/** Types */
import { Size, GameSkill, AIObjectOption } from './@types';

/** Objects */
import { AI } from './objects/ai.object';
import { Strike } from './skills/strike.skill';
import { Replicate } from './skills/replicate.skill';


export default class Game {

    private game: Application;
    private eventBinder = new EventBinder();
    private resizeWatcher: ResizeWatcher;
    private events: Array<() => void> = []
    private ticker: Ticker = new Ticker();

    private initialized: boolean = false;

    private player: AI;
    private playerMove2D: Move2D;
    private playerStare2D: Stare2D;

    private keyControlMap: Map<number, { id?: number; degree: number; }> = new Map([
        [ 87, { degree: -90 } ],
        [ 68, { degree: 0 } ],
        [ 83, { degree: 90 } ],
        [ 65, { degree: 180 } ]
    ]);

    public playerObjectOption: AIObjectOption = {
        scale: 0.5
    }

    constructor(
        private view: HTMLCanvasElement,
        private container: HTMLElement
    ) {}

    public init(): void {
        if (this.initialized) return;

        this.initialized = true;

        this.game = new Application({ view: this.view, backgroundColor: 0xcccccc, antialias: true });
        this.game.stage.sortableChildren = true;
        
        this.initResizeWatcher();
        this.initPlayer();
        this.bindEvents();

        this.ticker.start();
    }

    public destroy(): void {
        if (!this.initialized) return;

        for (const remove of this.events) remove();
        this.events = []

        this.ticker.destroy();
        this.resizeWatcher.destroy();
        this.view.removeAttribute('tabindex');

        this.initialized = false;
    }

    public onKey(event: KeyboardEvent): void {
        const control = this.keyControlMap.get(event.keyCode);
        if (!control) return;

        switch (event.type) {
            case 'keydown':
                event.preventDefault();
                if (control.id) return;

                const radian = radians(control.degree);

                control.id = this.playerMove2D.force.add(Vector2D.from(radian).multiply(1));
                break;
            case 'keyup':
                if (!control.id) return;

                this.playerMove2D.force.remove(control.id);

                delete control.id;
                break;
        }
    }

    private rescale(size: Size): void {
        const { renderer, stage } = this.game;

        renderer.resize(size?.width || 1920, size?.height || 1080);

        stage.scale.x =
        stage.scale.y = this.resizeWatcher.scale;
    }

    private bindEvents(): void {
        const stage = this.game.stage;

        stage.interactive = true;
        stage.hitArea = new Rectangle(0, 0, 1920, 1080);

        const
        strike = new Strike(this.ticker, this.playerMove2D, 1000, 180),
        replicate = new Replicate(this.ticker, this.playerMove2D, 700, 100);

        this.eventBinder.listen(stage, 'mousemove', e => this.setPlayerRotation(e));
        this.eventBinder.listen(stage, 'click', e => strike.shot(this.toLocal(e.data.global), 20));
        this.eventBinder.listen(stage, 'rightdown', e => replicate.shot(this.toLocal(e.data.global), this.game.stage, this.playerObjectOption));
    }

    private initResizeWatcher(): void {
        this.resizeWatcher = new ResizeWatcher(this.container, 1920, 1080, this.eventBinder);
        this.resizeWatcher.watch();

        this.events.push( this.eventBinder.subscribe(this.resizeWatcher.size, size => this.rescale(size)) );
    }

    private initPlayer(): void {
        this.player = new AI(true, this.playerObjectOption);
        this.player.subject.zIndex = 9;

        this.playerMove2D = new Move2D(this.player.subject, new Vector2D(0, 0), 1, 0.08, 20);
        this.playerStare2D = new Stare2D(this.player.subject, this.playerMove2D.position, new Vector2D(0, 0));

        this.playerMove2D.friction = 0.08;
        this.playerMove2D.maxSpeed = 20;

        this.game.stage.addChild(this.player.subject);
        this.playerMove2D.run();
        this.playerStare2D.run();
    }

    private setPlayerRotation(event: interaction.InteractionEvent): void {
        this.playerStare2D.target.set(...this.toLocal(event.data.global).raws);
    }

    private toLocal(globalPoint: Point): Vector2D {
        const { x, y } = globalPoint;
        
        return new Vector2D(x, y).divide(this.resizeWatcher.scale);
    }

}
/** Types */
import { GameSkill, GameFrameFn, AIObjectOption } from '../@types';

/** Custom Modules */
import { Move2D } from '../behaviors/move2D.behavior';
import { Vector2D } from '../core/vector2D.core';

/** Node Modules */
import { Container, Ticker } from 'pixi.js';

/** Objects */
import { AI } from '../objects/ai.object';


export class Replicate implements GameSkill {

    public available: boolean = true;

    _durationWatcher: GameFrameFn;
    _cooltimeWatcher: GameFrameFn;

    constructor(
        private gameTicker: Ticker,
        private move2D: Move2D,
        public cooltime: number = 0,
        public duration: number = 0
    ) {}

    shot(target: Vector2D, stage: Container, options?: AIObjectOption): { id: number; clone: AI; } {
        if (!this.available) return;

        const between = Vector2D.between(target, this.move2D.position).normalize().multiply(-20);

        const id = this.move2D.uniqueForce.add(between);
        this.available = false;

        const clone = new AI(true, { ...options, ...this.move2D.position.raw });
        clone.subject.rotation = between.heading;
        clone.subject.alpha = 0.8;

        stage.addChild(clone.subject);

        let start: number = performance.now();

        this._durationWatcher = () => {
            if (performance.now() - start < this.duration) return;

            this.cancel(id);
        }
        this._cooltimeWatcher = () => {
            if (performance.now() - start < this.cooltime) return;

            this.cooldown();
        }

        this.gameTicker.add(this._durationWatcher).add(this._cooltimeWatcher);

        return { id, clone }
    }

    cooldown(): void {
        this.gameTicker.remove(this._cooltimeWatcher);
        this.available = true;
    }

    cancel(id: number): void {
        this.gameTicker.remove(this._durationWatcher);
        this.move2D.uniqueForce.remove(id);
    }

}
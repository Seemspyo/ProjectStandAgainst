/** Custom Modules */
import { Vector2D } from '../core/vector2D.core';
import { Move2D } from '../behaviors/move2D.behavior';

/** Types */
import { GameSkill, GameFrameFn } from '../@types';

/** Node Modules */
import { Ticker } from 'pixi.js';


export class Strike implements GameSkill {

    public available: boolean = true;

    _durationWatcher: GameFrameFn;
    _cooltimeWatcher: GameFrameFn;

    constructor(
        private gameTicker: Ticker,
        private move2D: Move2D,
        public cooltime: number = 0,
        public duration: number = 0
    ) {}

    shot(target: Vector2D, power: number = 1): number {
        if (!this.available) return;

        const between = Vector2D.between(target, this.move2D.position).normalize().multiply(power);

        const id = this.move2D.uniqueForce.add(between);
        this.available = false;

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

        return id;
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
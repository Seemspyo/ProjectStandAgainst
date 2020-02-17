/** Node Modules */
import { BehaviorSubject } from 'rxjs';

/** Custom Modules */
import { EventBinder } from './event-binder.core';

/** Types */
import { Size } from '../@types';


export class ResizeWatcher {

    public size: BehaviorSubject<Size> = new BehaviorSubject(void 0);

    private events: Array<() => void> = []
    private _size: Size;

    constructor(
        private el: Window | HTMLElement,
        public width: number,
        public height: number,
        private eventBinder: EventBinder
    ) {}

    public watch(): void {
        this.events.push( this.eventBinder.listen(window, 'resize', () => this.update()) );
        this.update();
    }

    public destroy(): void {
        for (const remove of this.events) remove();

        this.events = []
    }

    public get scale(): number {
        return this._size?.width / this.width;
    }

    public update(): void {
        const { width, height } = this.calculate();

        if (width !== this._size?.width || height !== this._size?.height) {
            this._size = { width, height }
            this.size.next(this._size);
        }
    }

    private calculate(): Size {
        let width: number, height: number;

        if (this.el instanceof HTMLElement) {
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
        } else if (this.el instanceof Window) {
            width = this.el.innerWidth;
            height = this.el.innerHeight;
        }

        const ratio = this.height / this.width;

        switch (height > width * ratio) {
            case true:
                height = width * ratio;
                break;
            case false:
                width = height / ratio;
                break;
        }

        return { width, height }
    }

}
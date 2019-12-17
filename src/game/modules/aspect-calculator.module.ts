import { BehaviorSubject } from 'rxjs';
import { Size } from '../types';
import { EventHelper } from './helper.module';


export default class AspectCalculator {

    public aspectRatio: number = 0.5625;
    public size: BehaviorSubject<Size> = new BehaviorSubject(this.aspect);

    private removeResizeEvent?: () => void;

    constructor(
        private el: Window | HTMLElement
    ) {}

    public watch(): void {
        this.removeResizeEvent = EventHelper.listen(window, 'resize', () => this.size.next(this.aspect));
        this.size.next(this.aspect);
    }

    public destroy(): void {
        if (this.removeResizeEvent) {
            this.removeResizeEvent();
            this.removeResizeEvent = void(0);
        }
    }

    public getScale(baseX: number): number {
        return this.aspect.width / baseX;
    }

    private get aspect(): Size {
        let width: number, height: number;

        if (this.el instanceof HTMLElement) {
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
        } else {
            width = this.el.innerWidth;
            height = this.el.innerHeight;
        }

        switch (height > width * this.aspectRatio) {
            case true:
                height = width * this.aspectRatio;
                break;
            case false:
                width = height / this.aspectRatio;
                break;
        }

        return { width, height }
    }

}
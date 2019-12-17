import assignInWith from 'lodash.assigninwith';
import { Container, Sprite } from 'pixi.js';
import { Observable } from 'rxjs';


export class UtilHelper {

    static EMPTY(): void {

    }

    static assign(target: any, source: any, override?: boolean): any {
        return assignInWith(target, source, (oldValue: any, newValue: any) => override || oldValue === void(0) ? newValue : oldValue);
    }

    static brace(n: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, n));
    }

}

export class EventHelper {

    static listen(el: any, type: string, handler: any): () => void {
        if (el instanceof EventTarget) {
            el.addEventListener(type, handler);

            return () => el.removeEventListener(type, handler);
        }

        return UtilHelper.EMPTY;
    }

    static listenPixi(el: any, type: string, handler: any): () => void {
        if (el instanceof Container || el instanceof Sprite) {
            el.on(type, handler);

            return () => el.off(type, handler);
        }

        return UtilHelper.EMPTY;
    }

    static subscribe(observable: Observable<any>, handler: any): () => void {
        if (observable instanceof Observable) {
            const subscription = observable.subscribe(handler);

            return () => subscription.unsubscribe();
        }

        return UtilHelper.EMPTY;
    }

}
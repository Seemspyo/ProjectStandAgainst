import assignInWith from 'lodash.assigninwith';
import { Container, Sprite } from 'pixi.js';


export class UtilHelper {

    static void(): void {
        return void(0);
    }

    static assign(target: any, source: any, override?: boolean): any {
        return assignInWith(target, source, (oldValue: any, newValue: any) => override || oldValue === void(0) ? newValue : oldValue);
    }

    static brace(n: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, n));
    }

    static radians(degree: number): number {
        return degree * Math.PI / 180;
    }

    static degrees(radian: number): number {
        return radian * 180 / Math.PI;
    }

}

export class EventHelper {

    static listen(el: any, type: string, handler: any): () => void {
        if (el instanceof EventTarget) {
            el.addEventListener(type, handler);

            return () => el.removeEventListener(type, handler);
        }

        return UtilHelper.void;
    }

    static listenPixi(el: any, type: string, handler: any): () => void {
        if (el instanceof Container || el instanceof Sprite) {
            el.on(type, handler);

            return () => el.off(type, handler);
        }

        return UtilHelper.void;
    }

}
/** Node Modules */
import { Sprite, Container } from 'pixi.js';
import { Observable } from 'rxjs';

/** Custom Modules */
import { blank } from './functions.core';


export class EventBinder {

    public listen(el: EventTarget | Container | Sprite, type: string, handler: any, optionOrContext?: any): () => void {
        let remove: () => void = blank;

        if (el instanceof EventTarget) remove = this.listenNative(el, type, handler, optionOrContext);
        else if (this.isPixiTarget(el)) remove = this.listenPixi(el, type, handler, optionOrContext);
        else throw new TypeError(`el must be an EventTarget instance but received ${ el }`);

        return remove;
    }

    public subscribe(observable: Observable<any>, handler: (...args: any[]) => void): () => void {
        const subscription = observable.subscribe(handler);

        return () => subscription.unsubscribe();
    }

    private listenNative(el: EventTarget, type: string, handler: any, options?: boolean | AddEventListenerOptions): () => void {
        el.addEventListener(type, handler, options);

        return () => el.removeEventListener(type, handler, options);
    }

    private listenPixi(el: Container | Sprite, type: string, handler: any, context?: any): () => void {
        el.on(type, handler, context);

        return () => el.off(type, handler, context);
    }

    /** Due to TypeScript linting problem */
    private isPixiTarget(el: any): boolean {
        return el instanceof Container || el instanceof Sprite;
    }

}
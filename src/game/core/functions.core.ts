/** Node Modules */
import assignInWith from 'lodash.assigninwith';


export function blank(): void {
    return void(0);
}

export function clone(target: any, source: any, override?: boolean): any {
    const clone = Object.assign({}, target);

    return assignInWith(clone, source, (oldValue: any, newValue: any) => override || oldValue === void(0) ? newValue : oldValue);
}

export function brace(n: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, n));
}

export function radians(degree: number): number {
    return degree * Math.PI / 180;
}

export function degrees(radian: number): number {
    return radian * 180 / Math.PI;
}
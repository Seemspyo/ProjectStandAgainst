/** Node Modules */
import { Container } from "pixi.js";


export interface Size {
    width: number;
    height: number;
}

export interface Raw2D {
    x: number;
    y: number;
}

export interface GameObject {

    subject: Container;

    create(): void;
    kill(): void;

}

export interface AIObjectOption {
    x?: number;
    y?: number;
    scale?: number;
    rotation?: number;
    bodyColor?: number;
    eyeColorLeft?: number;
    eyeColorRight?: number;
}

export interface GameBehavior {

    init(): void;
    destroy(): void;

    run(): void;
    stop(): void;

}
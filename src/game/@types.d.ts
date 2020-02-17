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

    container: Container;

    create(): void;
    kill(): void;

    setScale(n: number): void;
    setPosition(x: number, y: number): void;
    setRotation(radian: number): void;

}
<template>
<div class="game" ref="container" @keydown="onKey($event)" @keyup="onKey($event)" tabindex="0">
    <canvas ref="view"></canvas>
    <div class="game-ui"></div>
</div>
</template>

<style lang="scss" scoped>
.game {
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    outline: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

/** Custom Modules */
import Game from '../game';
import { Vector2D } from '../game/core/vector2D.core';
import { radians, degrees } from '../game/core/functions.core';


@Component
export default class GameComponent extends Vue {

    private game: Game;
    private keyControlMap: Map<number, { id?: number; degree: number; }> = new Map([
        [ 87, { degree: -90 } ],
        [ 68, { degree: 0 } ],
        [ 83, { degree: 90 } ],
        [ 65, { degree: 180 } ]
    ]);

    mounted() {
        const { view, container } = this.$refs as { [key: string]: HTMLElement };

        this.game = new Game(view as HTMLCanvasElement, container as HTMLElement);

        this.game.init();
        this.game.playerMove2D.friction = 0.08;
        this.game.playerMove2D.maxSpeed = 20;
    }

    destroyed() {
        if (this.game) this.game.destroy();
    }

    public onKey(event: KeyboardEvent): void {
        const control = this.keyControlMap.get(event.keyCode);

        if (control) {
            switch (event.type) {
                case 'keydown':
                    if (!control.id) {
                        event.preventDefault();

                        const radian = radians(control.degree);

                        control.id = this.game.playerMove2D.addForce(Vector2D.from(radian).multiply(1));
                    }
                    break;
                case 'keyup':
                    if (control.id) {
                        this.game.playerMove2D.removeForce(control.id);

                        delete control.id;
                    }
                    break;
            }
        }
    }

}
</script>
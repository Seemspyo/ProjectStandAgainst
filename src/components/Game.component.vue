<template>
<div class="game" ref="container" @contextmenu.prevent @keydown="game.onKey($event)" @keyup="game.onKey($event)" tabindex="0">
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

    public game: Game;

    mounted() {
        const { view, container } = this.$refs as { [key: string]: HTMLElement };

        this.game = new Game(view as HTMLCanvasElement, container as HTMLElement);

        this.game.init();
    }

    destroyed() {
        if (this.game) this.game.destroy();
    }

}
</script>
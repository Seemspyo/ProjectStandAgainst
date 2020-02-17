<template>
<div class="game" ref="container">
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
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

/** Custom Modules */
import Game from '../game';


@Component
export default class GameComponent extends Vue {

    private game: Game;

    mounted() {
        const { view, container } = this.$refs;

        this.game = new Game(view as HTMLCanvasElement, container as HTMLElement);

        this.game.init();
    }

    destroyed() {
        if (this.game) this.game.destroy();
    }

}
</script>
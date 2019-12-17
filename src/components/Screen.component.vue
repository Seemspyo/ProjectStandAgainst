<template>
<div class="screen">
    <canvas ref="view"></canvas>
    <div class="screen-ui"></div>
</div>
</template>

<style lang="scss" scoped>
.screen {
    width: 100%;
    display: flex;
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
export default class ScreenComponent extends Vue {

    private game?: Game;

    mounted() {
        this.game = new Game(this.$refs.view as HTMLCanvasElement);
        this.game.init();
    }

    destroyed() {
        if (this.game) this.game.destroy();
    }

}
</script>
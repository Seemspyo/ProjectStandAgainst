<template>
<main id="app">
    <div class="screen-container">
        <Screen></Screen>
    </div>

    <div class="community-container">
        <Community></Community>
    </div>
</main>
</template>

<style lang="scss">

* { margin: 0; border: 0; padding: 0; box-sizing: border-box; }
:root { width: 100%; height: 100%; }
body { width: 100%; height: 100%; overflow: { x: hidden; y: auto; } }

</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

/** Components */
import ScreenComponent from '@/components/Screen.component.vue';
import CommunityComponent from '@/components/Community.component.vue';


@Component({
    components: {
        Screen: ScreenComponent,
        Community: CommunityComponent
    }
})
export default class App extends Vue {

}
</script>
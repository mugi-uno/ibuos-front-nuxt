<template lang='pug'>
img(:src='imagePath', :class='{ noimage: !available }')
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class NoImage extends Vue {
  @Prop({ default: '' })
  url!: string;

  get imagePath() {
    return this.url || this.noImagePath;
  }

  get noImagePath() {
    return '/images/no-image.svg';
  }

  get available() {
    return !!this.url;
  }
}
</script>

<style scoped>
.noimage {
  width: 100px;
}
</style>

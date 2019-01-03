<template lang='pug'>
figure.image
  img.is-rounded(
    v-show='visible'
    :src='imagePath'
    :class='{ error: !available }'
    @load='onLoad'
    @error='onError'
  )
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class UserImage extends Vue {
  @Prop({ default: '' })
  url!: string;

  loaded: boolean = false;
  error: boolean = false;

  get visible() {
    return this.loaded || this.error;
  }

  get available() {
    return !this.error && this.loaded;
  }

  get imagePath() {
    return this.available ? this.url : this.noImagePath;
  }

  get noImagePath() {
    return '/images/no-user.svg';
  }

  onLoad() {
    this.loaded = true;
  }

  onError() {
    this.error = true;
  }
}
</script>

<style scoped>
.error {
  opacity: 0.5;
}
</style>

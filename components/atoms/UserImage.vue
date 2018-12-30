<template lang="pug">
figure.image
  img.is-rounded(
    :src='imagePath'
    :class='{ error: this.error }'
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

  error: boolean = false;

  get imagePath() {
    return !this.error ? this.url : this.noImagePath;
  }

  get noImagePath() {
    return '/images/no-user.svg';
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

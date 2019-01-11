<template lang='pug'>
el-tooltip(
  placement='left'
  :content='content'
)
  nuxt-link.button.is-link.is-large(
    :to='link'
    :class='{ "is-absolute": absolute }'
  )
    i.fas.fa-plus
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class LinkToNewItem extends Vue {
  @Prop({ default: true })
  absolute!: boolean;
  @Prop({ default: '' })
  genre!: string;

  get link() {
    return this.genre
      ? `/items/new?genre=${encodeURIComponent(this.genre)}`
      : '/items/new';
  }

  get content() {
    return this.genre
      ? `「${this.genre}」の使っているものを追加する`
      : '使っているものを追加する';
  }
}
</script>

<style scoped>
.button {
  border-radius: 50%;
  text-decoration: none;
  opacity: 0.4;
  transition: opacity 100ms;

  &:hover {
    opacity: 1;
  }

  &.is-absolute {
    z-index: 10000;
    position: fixed;
    right: 20px;
    bottom: 40px;
  }
}
</style>

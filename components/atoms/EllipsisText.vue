<template lang='pug'>
span {{ellipsisText}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ellipsis } from '~/lib/text';

@Component
export default class EllipsisText extends Vue {
  @Prop({ default: '' })
  text!: string;
  @Prop({ default: 100 })
  size!: number;

  get ellipsisText() {
    return ellipsis(this.text, this.size);
  }
}
</script>

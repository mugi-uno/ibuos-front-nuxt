<template lang="pug">
  section.hero.is-light.is-medium
    .hero-body
      .container
        template(v-if='error.statusCode === 404')
          h1.title 404
          h2.subtitle ページが見つかりません
        template(v-else)
          h1.title Oops!
          h2.subtitle エラーが発生しました。しばらく置いてから再度お試しください
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class ErrorPage extends Vue {
  @Prop({ default: '' })
  error!: any;
}
</script>

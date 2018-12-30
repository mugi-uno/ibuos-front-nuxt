<template lang="pug">
#app
  app-header
  #main
    alerts
    nuxt
  footer.footer.layoutFooter
    .content.has-text-left
      div
        nuxt-link(to='/help') このサイトについて
      div
        a(href='https://twitter.com/mugi_uno', target='_blank') @mugi_uno
</template>

<script lang="ts">
import Vue from 'vue';
import VueComponent from 'vue-class-component';
import { Prop, Component } from 'vue-property-decorator';
import { User } from 'store/auth';
import AppHeader from '../containers/AppHeader.vue';
import Alerts from '../containers/Alerts.vue';

@Component({
  components: {
    AppHeader,
    Alerts,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
.layoutFooter {
  padding: 1rem;
  font-size: 0.8rem;
}
</style>

<template lang="pug">
.tabs
  ul
    li(:class='{ "is-active": mode === "help" }')
      nuxt-link(to='/help') ibuos?
    li(:class='{ "is-active": mode === "history" }')
      nuxt-link(to='/help/history') 変更履歴
    li(:class='{ "is-active": mode === "terms" }')
      nuxt-link(to='/help/terms') 利用規約
    li(:class='{ "is-active": mode === "policy" }')
      nuxt-link(to='/help/policy') プライバシーポリシー
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class HelpTab extends Vue {
  @Prop({ default: 'help' })
  mode!: string;
}
</script>

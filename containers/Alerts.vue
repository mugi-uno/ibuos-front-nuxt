<template lang="pug">
  div
    el-alert(
      v-for='alert in alertState.alerts'
      :key='alert.key'
      :title='alert.title'
      :type='alert.type'
      @close='remove(alert)'
      show-icon center
    )
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import { State as Alert } from '../store/alert';

@Component
export default class AppHeader extends Vue {
  @State('alert') alertState!: Alert;

  @Action('alert/removeAlert') remove;
}
</script>

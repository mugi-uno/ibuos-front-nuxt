<template lang='pug'>
div
  a.button.is-small(@click='linkToGitHub')
    span.icon
      i.fab.fa-github
    span GitHub - 連携済

  a.button.is-small(@click='linkToTwitter')
    span.icon
      i.fab.fa-twitter
    span Twitter - 連携済

  a.button.is-small(@click='linkToGoogle')
    span.icon
      i.fab.fa-google
    span Google - 連携済
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import * as _ from 'lodash';

@Component
export default class LinkedProviders extends Vue {
  // @Prop() paginating!: Paginating;

  // @Emit()
  // changePage(page: number) {}

  async linkToOtherProvider(provider) {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;

    const result = await currentUser.linkWithPopup(provider);

    console.log(result);
  }

  async linkToTwitter() {
    await this.linkToOtherProvider(new firebase.auth.TwitterAuthProvider());
  }
  async linkToGitHub() {
    await this.linkToOtherProvider(new firebase.auth.GithubAuthProvider());
  }
  async linkToGoogle() {
    await this.linkToOtherProvider(new firebase.auth.GoogleAuthProvider());
  }
}
</script>

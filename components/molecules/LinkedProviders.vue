<template lang="pug">
div
  a.button.m-l-xs.is-small(
    @click='linkToGitHub'
    :class='{ "is-primary": linkedToGithub, "not-linked": !linkedToGithub }'
  )
    span.icon
      i.fab.fa-github
    span GitHub -
    span.text 連携済
    span.not-linked-text 未連携
    span.not-linked-text-hover 連携する

  a.button.m-l-xs.is-small(
    @click='linkToTwitter'
    :class='{ "is-primary": linkedToTwitter, "not-linked": !linkedToTwitter }'
  )
    span.icon
      i.fab.fa-twitter
    span Twitter -
    span.text 連携済
    span.not-linked-text 未連携
    span.not-linked-text-hover 連携する

  a.button.m-l-xs.is-small(
    @click='linkToGoogle'
    :class='{ "is-primary": linkedToGoogle, "not-linked": !linkedToGoogle }'
  )
    span.icon
      i.fab.fa-google
    span Google -
    span.text 連携済
    span.not-linked-text 未連携
    span.not-linked-text-hover 連携する
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import * as _ from 'lodash';
import { ProvierProfile } from 'presenters/anyUser';

@Component
export default class LinkedProviders extends Vue {
  @Prop() profileOfGithub!: ProvierProfile;
  @Prop() profileOfTwitter!: ProvierProfile;
  @Prop() profileOfGoogle!: ProvierProfile;

  @Emit()
  link(credential: firebase.auth.UserCredential) {}

  async linkToOtherProvider(provider) {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;

    const credential: firebase.auth.UserCredential = await currentUser.linkWithPopup(
      provider
    );

    this.link(credential);
  }

  async linkToTwitter() {
    if (this.linkedToTwitter) return;
    await this.linkToOtherProvider(new firebase.auth.TwitterAuthProvider());
  }
  async linkToGitHub() {
    if (this.linkedToGithub) return;
    await this.linkToOtherProvider(new firebase.auth.GithubAuthProvider());
  }
  async linkToGoogle() {
    if (this.linkedToGoogle) return;
    await this.linkToOtherProvider(new firebase.auth.GoogleAuthProvider());
  }

  get linkedToTwitter() {
    return this.profileOfTwitter && !!this.profileOfTwitter.providerId;
  }
  get linkedToGithub() {
    return this.profileOfGithub && !!this.profileOfGithub.providerId;
  }
  get linkedToGoogle() {
    return this.profileOfGoogle && !!this.profileOfGoogle.providerId;
  }
}
</script>

<style scoped>
.button {
  width: 150px;
  text-decoration: none;
}
.not-linked-text,
.not-linked-text-hover {
  display: none;
}
.not-linked {
  & span {
    opacity: 0.4;
  }

  & .text {
    display: none;
  }

  & .not-linked-text {
    display: inline-block;
  }

  &:hover {
    & span {
      opacity: 1;
    }

    & .not-linked-text {
      display: none;
    }

    & .not-linked-text-hover {
      display: inline-block;
    }
  }
}
</style>

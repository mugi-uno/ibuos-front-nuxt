<template lang='pug'>
section.section
  .firebaseui-auth-container
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { State as Auth } from '../store/auth';
import * as qs from 'query-string';

import * as auth from '~/store/auth';

const authModule = namespace(auth.name);

@Component({
  head: () => ({ title: 'サインイン' }),
})
export default class ComponentName extends Vue {
  @authModule.State user!: auth.User;
  @authModule.Action signin: any;

  public mounted() {
    global.firebaseui.start('.firebaseui-auth-container', {
      callbacks: {
        signInSuccess: (
          currentUser: firebase.User,
          credential: any,
          redirectUrl: any
        ) => {
          this.signin(currentUser).then(() => {
            this.$router.push((this.$route.query.r as string) || '/');
            this.$message({
              type: 'success',
              message: 'ログインしました',
            });
          });
          return false;
        },
      },
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
    });

    // 何らかのURLのリダイレクトを要求されている
    // = 認証が必要なページに認証が無い状態でのアクセスと判断して、エラーメッセージを表示
    if (this.$route.query.r) {
      this.$store.dispatch('alert/addWarningAlert', {
        title: 'ログインが必要です',
      });
    }
  }
}
</script>

<style>
</style>

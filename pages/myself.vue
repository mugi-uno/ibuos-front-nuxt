<template lang='pug'>
section.section
  .container
    .columns
      .column
        label.label
          span 連携済サービス
        linked-providers(
          :profile-of-github='user.profileOfGithub'
          :profile-of-twitter='user.profileOfTwitter'
          :profile-of-google='user.profileOfGoogle'
          @link='handleLinkProvider'
        )
    .columns
      .column.is-6
        label.label
          span 表示名
        .field.has-addons.m-b-none
          .control.is-expanded
            input.input(
              type='text'
              v-model='name'
            )
          .control
            button.button.is-primary(
              @click='handleUpdate'
              :class='{ "is-loading": updatingDisplayName }'
            ) 更新
        div(v-if='updated')
          span.icon.has-text-success
            i.fas.fa-check-circle
          span 更新しました
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { State as Auth } from '../store/auth';
import * as qs from 'query-string';
import * as auth from '~/store/auth';
import { NuxtContext } from 'types';
import LinkedProviders from '~/components/molecules/LinkedProviders.vue';

const authModule = namespace(auth.name);

@Component({
  head: () => ({ title: 'マイページ' }),
  middleware: ['authenticated'],
  components: { LinkedProviders },
})
export default class Myself extends Vue {
  @authModule.State user!: auth.User;
  @authModule.Action updateDisplayName: any;
  @authModule.Action linkProvider: any;

  name = '';
  updated = false;
  updatingDisplayName = false;

  asyncData(context: NuxtContext) {
    const user: auth.User = context.store.state.auth.user;
    return { name: user.displayName };
  }

  async handleLinkProvider(credential: firebase.auth.UserCredential) {
    try {
      await this.linkProvider(credential);
    } catch {
      // nothing to do.
      this.$message({
        type: 'error',
        message: '更新に失敗しました。時間をおいて再度お試しください。',
      });
    }
  }

  async handleUpdate() {
    this.updatingDisplayName = true;
    this.updated = false;

    try {
      await this.updateDisplayName(this.name);
      this.updated = true;
    } catch {
      // nothing to do.
      this.$message({
        type: 'error',
        message: '更新に失敗しました。時間をおいて再度お試しください。',
      });
    }

    this.updatingDisplayName = false;
  }
}
</script>

<style>
</style>

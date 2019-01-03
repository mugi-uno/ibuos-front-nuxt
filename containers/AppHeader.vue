<template lang="pug">
nav.navbar.is-dark(role='navigation' aria-label='main navigation')
  .navbar-brand
    nuxt-link.navbar-item(to='/')
      img(src='/images/ibuos@half.png')
    .navbar-burger.burger(data-target='navbarRightMenu')
      span
      span
      span
  .navbar-menu#navbarRightMenu
    .navbar-end
      nuxt-link.navbar-item(to='/items/new')
        i.fas.fa-edit
        span 使っているものを追加する
      .navbar-item.has-dropdown.is-hoverable(v-if='auth.user.id')
        nuxt-link.is-flex(to='/myself')
          .navbar-link.is-flex
            user-image.is-32x32.photoWrapper(
              :url='auth.user.photoURL'
            )
            span {{auth.user.displayName}}
        .navbar-dropdown.is-right
          nuxt-link.navbar-item(:to='`/users/${auth.user.id}`')
            | 自分の使っているものを見る
          hr.navbar-divider
          a.navbar-item
            button.button.is-small(
              @click='handleSignOut'
            )
              span.icon
                i.fas.fa-sign-out-alt
              span Sign Out
      .navbar-item(v-else)
        nuxt-link.button(to='/signin')
          span.icon
            i.fas.fa-sign-in-alt
          span Sign In
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UserImage from '~/components/atoms/UserImage.vue';
import { State, Action } from 'vuex-class';
import { State as Auth } from '../store/auth';

@Component({
  components: { UserImage }
})
export default class AppHeader extends Vue {
  @State('auth') auth!: Auth;
  @Action('auth/signOut') signOut;

  async handleSignOut() {
    await this.signOut();
    this.$router.push('/');
    this.$message({ message: 'ログアウトしました' });
  }
}
</script>

<style scoped>
.photoWrapper {
  margin-right: 4px;
}
.photoImage {
  max-height: inherit;
}
</style>

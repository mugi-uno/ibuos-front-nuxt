<template lang='pug'>
section.section
  .container
    .headerArea
      h4.title.is-4.is-flex.is-ai-center        
        figure.image.is-64x64.m-r-sm(v-if='user.picture')
          img.is-rounded(:src='user.picture')
        | {{user.name}}の使っているもの
      div(v-if='paginating')
        | {{paginating.totalCount}}件の使っているもの

    paginator(
      :paginating='paginating'
      @change-page='changePage'
    )

    .tile.is-ancestor.m-t-none.m-b-none(
      v-for='(items, index) in itemChunks'
      :key='index'
    )
      .tile.is-6(
        v-for='(item) in items'
        :key='item.key'
      )
        item-card(
          :item='item'
          :editable='isMyItems'
        )

    paginator(
      :paginating='paginating'
      @change-page='changePage'
    )
</template>

<script lang="ts">
import { NuxtContext } from 'types';
import * as _ from 'lodash';
import * as api from '~/api';
import { State } from 'vuex-class';
import { State as Auth } from '~/store/auth';
import AnyUserPresenter, { AnyUser } from '~/presenters/anyUser';
import Component from 'vue-class-component';
import ItemCard from '~/components/items/ItemCard.vue';
import ItemPresenter, { Item } from '~/presenters/item';
import PaginatingPresenter, { Paginating } from '~/presenters/paginating';
import Paginator from '~/components/molecules/Paginator.vue';
import Vue from 'vue';

@Component({
  head() {
    return {
      title: `${(this as any).user.name}の使っているもの`,
      meta: [
        { hid: 'og:title', property: 'og:title', content: `${(this as any).user.name}の使っているもの | ibuos` }
      ]
    };
  },
  components: { ItemCard, Paginator },
  watchQuery: ['page'],
})
export default class ShowGenre extends Vue {
  @State('auth') auth!: Auth;

  user: AnyUser | null = null;
  items: Item[] = [];
  paginating: Paginating | null = null;

  async asyncData(context: NuxtContext) {
    try {
      const userId = context.params.id as number;
      const page: number = parseInt(context.route.query.page as string) || 1;
      const res = await api.getUserItems(context.$axios, userId, page);

      if (!res) return {};

      return {
        user: AnyUserPresenter.fromResponse(res.user),
        items: ItemPresenter.fromResponses(res.list),
        paginating: PaginatingPresenter.fromResponse(res.meta),
      };
    } catch(e) {
      context.error(e);
    }
  }

  changePage(page: number) {
    this.$router.push(`/?page=${page}`);
  }

  get isMyItems() {
    return this.user!.id === this.auth.user.id;
  }

  get itemChunks() {
    return _.chunk(this.items, 2);
  }
}
</script>

<style scoped>
.headerArea {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
</style>

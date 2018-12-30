<template lang="pug">
div
  link-to-new-item
  section.hero.is-light.is-small.is-paddingless
    .hero-body.heroBody
      .container
        h1.title.is-4.hero
          | みんな、なに使ってる？
        h3.subtitle.is-6.hero
          | Ibuosは「使っているもの」を管理・共有するためのサービスです。

  section.section
    .container
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
          item-card(:item='item')
      paginator(
        :paginating='paginating'
        @change-page='changePage'
      )
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State } from 'vuex-class';
import { State as Auth } from '~/store/auth';
import ItemPresenter, { Item } from '~/presenters/item';
import PaginatingPresenter, { Paginating } from '~/presenters/paginating';
import * as api from '~/api';
import { NuxtContext } from 'types';
import * as _ from 'lodash';
import ItemCard from '~/components/items/ItemCard.vue';
import Paginator from '~/components/molecules/Paginator.vue';
import LinkToNewItem from '~/components/atoms/LinkToNewItem.vue';

@Component({
  head: () => ({
    title: 'ibuos',
    titleTemplate: '',
  }),
  components: { ItemCard, LinkToNewItem, Paginator },
  watchQuery: ['page'],
})
export default class IndexPage extends Vue {
  items: Item[] = [];
  paginating: Paginating | null = null;

  async asyncData(context: NuxtContext) {
    try {
      const page: number = parseInt(context.route.query.page as string) || 1;
      const res = await api.top(context.$axios, page);

      return {
        items: ItemPresenter.fromResponses(res.fresh_items.list),
        paginating: PaginatingPresenter.fromResponse(res.fresh_items.meta),
      };
    } catch (e) {
      context.error(e);
    }
  }

  changePage(page: number) {
    this.$router.push(`/?page=${page}`);
  }

  get itemChunks() {
    return _.chunk(this.items, 2);
  }
}
</script>

<style scoped>
.hero {
  text-align: center;
  font-weight: normal;
}

.heroBody {
  padding-top: 2.5rem !important;
  padding-bottom: 2.5rem !important;
}
</style>

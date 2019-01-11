<template lang='pug'>
section.section
  link-to-new-item(:genre='genreName')
  .container
    .headerArea
      h4.title.is-4.is-flex.is-ai-center
        i.fas.fa-tag.m-r-xs
        | 「{{genreName}}」で使われているもの
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
        item-card(:item='item')

    paginator(
      :paginating='paginating'
      @change-page='changePage'
    )
</template>

<script lang="ts">
import { NuxtContext } from 'types';
import * as api from '~/api';
import * as _ from 'lodash';
import Component from 'vue-class-component';
import ItemPresenter, { Item } from '~/presenters/item';
import Vue from 'vue';
import PaginatingPresenter, { Paginating } from '~/presenters/paginating';
import ItemCard from '~/components/items/ItemCard.vue';
import Paginator from '~/components/molecules/Paginator.vue';
import LinkToNewItem from '~/components/atoms/LinkToNewItem.vue';

@Component({
  head() {
    return {
      title: `「${(this as any).genreName}」で使われているもの`,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: `「${(this as any).genreName}」で使われているもの | ibuos`,
        },
      ],
    };
  },
  components: { ItemCard, LinkToNewItem, Paginator },
  watchQuery: ['page'],
})
export default class ShowGenre extends Vue {
  genreName: string = '';
  items: Item[] = [];
  paginating: Paginating | null = null;

  async asyncData(context: NuxtContext) {
    try {
      const genreName = context.params.name as string;
      const page: number = parseInt(context.route.query.page as string) || 1;
      const res = await api.getGenreItems(context.$axios, genreName, page);

      return {
        genreName,
        items: ItemPresenter.fromResponses(res.list),
        paginating: PaginatingPresenter.fromResponse(res.meta),
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
.headerArea {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
</style>

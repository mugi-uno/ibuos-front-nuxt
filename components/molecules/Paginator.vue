<template lang="pug">
nav.pagination.is-centered.is-small.m-t-sm.m-b-sm(
  v-if='needPagination'
  role='navigation'
  aria-label='pagination'
)
  a.pagination-previous(
    :disabled='!activatedPrevious'
    @click='selectPage(paginating.currentPage - 1)'
  )
    | Previous
  a.pagination-next(
    :disabled='!activatedNext'
    @click='selectPage(paginating.currentPage + 1)'
  )
    | Next page
  ul.pagination-list  
    li(
      v-for='pageData in pagingRange'
      :key='pageData.page'
    )
      a.pagination-link(
        :class='{ "is-current": pageData.current }'
        @click='selectPage(pageData.page)'
      )
        | {{pageData.page}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import { Paginating } from 'presenters/paginating';
import * as _ from 'lodash';

@Component
export default class Paginator extends Vue {
  @Prop() paginating!: Paginating;

  @Emit()
  changePage(page: number) {}

  selectPage(page: number) {
    if (page < 1 || page > this.paginating.totalPages) return;
    if (page == this.paginating.currentPage) return;
    this.changePage(page);
  }

  get needPagination(): boolean {
    if (!this.paginating) return false;
    if (this.paginating.totalPages < 2) return false;
    return true;
  }

  get activatedPrevious(): boolean {
    if (!this.needPagination) return false;
    return this.paginating.currentPage !== 1;
  }

  get activatedNext(): boolean {
    if (!this.needPagination) return false;
    return this.paginating.currentPage !== this.paginating.totalPages;
  }

  get pagingRange(): number[] {
    if (!this.needPagination) return [];
    return _.range(1, this.paginating.totalPages + 1).map((page: number) => ({
      page,
      current: page === this.paginating.currentPage,
    }));
  }
}
</script>

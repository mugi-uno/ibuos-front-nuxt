<template lang='pug'>
section.section
  .container
    .columns
      .column
        .columns
          .column.is-9
            h5.title.is-5
              nuxt-link(:to='`/genres/${item.genre}`')
                | {{item.genre}}
            h3.title.is-3 {{item.name}}
          .column.is-3.is-flex-column.justify-center
            div
              nuxt-link(:to='`/users/${item.user.id}`').is-flex
                figure.image.is-32x32.m-r-sm
                  img.is-rounded(:src='item.user.picture')
                div {{item.user.name}}
            div
              span.timestamp {{updatedAt}}
        .columns
          .column
            .imageWrapper
              template(v-if='item.imageUrl')
                img(:src='item.imageUrl')
              template(v-else)
                | No Image
            div(v-if='item.link')
              a(:href='item.link' target='_blank')
                span 参考リンクを開く
                span.icon
                  i.fas.fa-external-link-alt
        .columns
          .column
            .description
              | {{item.description}}
</template>

<script lang="ts">
import { namespace } from 'vuex-class';
import { NuxtContext } from 'types';
import * as api from '~/api';
import * as auth from '~/store/auth';
import * as moment from 'moment';
import * as _ from 'lodash';
import Component from 'vue-class-component';
import ItemPresenter, { Item } from '~/presenters/item';
import Vue from 'vue';

const authModule = namespace(auth.name);

@Component({
  head() {
    return {
      title: (this as any).item.name,
      meta: [
        { hid: 'og:title', property: 'og:title', content: `${(this as any).item.name} | ibuos` },
        { hid: 'og:image', property: 'og:image', content: (this as any).ogpImage },
        { hid: 'twitter:image', name: 'twitter:image', content: (this as any).ogpImage },
      ]
    };
  },
})
export default class ShowItem extends Vue {
  @authModule.State user!: auth.User;

  item: Item | null = null;

  async asyncData(context: NuxtContext) {
    try {
      const res = await api.getItem(context.$axios, context.params.id);
      return {
        item: ItemPresenter.fromResponse(res),
      };
    } catch(e) {
      context.error(e);
    }
  }

  get updatedAt() {
    if (!this.item) return '';
    return moment(this.item.updatedAt).fromNow() + 'に更新';
  }

  get ogpImage() {
    return this.item!.imageUrl || 'https://ibuos.net/images/ibuos@og.png';
  }
}
</script>

<style scoped>
.imageWrapper {
  min-height: 150px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.image {
  max-height: 350px;
}

.description {
  white-space: pre-wrap;
}

.timestamp {
  font-size: 0.8rem;
}
</style>

<template lang='pug'>
section.section
  .container
    .columns
      .column
        .columns
          .column
            .user-and-genre.is-flex-column.m-b-md
              nuxt-link(:to='`/users/${item.user.id}`').is-flex.is-ai-center
                user-image.is-32x32.m-r-sm(:url='item.user.picture')
                div {{item.user.name}}
              nuxt-link(:to='`/genres/${item.genre}`')
                span.sparator-text
                  | /
                | {{item.genre}}
            h3.title.is-3 {{item.name}}
          .column.is-2.is-flex
            div
              span.timestamp {{updatedAt}}
        .columns
          .column.is-5
            .imageWrapper(:class='{ noimage: !item.imageUrl }')
              item-image(:url='item.imageUrl')
          .column
            .description
              | {{item.description}}
            .itemLink(v-if='item.link')
              a(:href='item.link' target='_blank')
                hr
                span 参考リンクを開く
                span.icon
                  i.fas.fa-external-link-alt
</template>

<script lang="ts">
import { namespace } from 'vuex-class';
import { NuxtContext } from 'types';
import * as api from '~/api';
import * as auth from '~/store/auth';
import * as moment from 'moment';
import * as _ from 'lodash';
import ItemImage from '~/components/atoms/ItemImage.vue';
import UserImage from '~/components/atoms/UserImage.vue';
import Component from 'vue-class-component';
import ItemPresenter, { Item } from '~/presenters/item';
import Vue from 'vue';

const authModule = namespace(auth.name);

@Component({
  components: { ItemImage, UserImage },
  head() {
    return {
      title: (this as any).item.name,
      meta: [
        { hid: 'og:title', property: 'og:title', content: `${(this as any).ogpTitle} | ibuos` },
        { hid: 'og:title', property: 'og:description', content: `${(this as any).ogpTitle} | ibuos` },
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

  get ogpTitle() {
    return `${this.item!.name} - ${this.item!.user!.name}の使っているもの`
  }

  get ogpImage() {
    return this.item!.imageUrl || 'https://ibuos.net/images/ibuos@og.png';
  }
}
</script>

<style scoped>
.user-and-genre {
  width: 100%;
  font-size: 1.0rem;

  & .sparator-text {
    font-size: 0.7rem;
    margin-left: 2.5rem;
    margin-right: 0.25rem;
  }
}

.itemLink {
  font-size: 0.8rem;  
}

.imageWrapper {
  align-items: center;
  background-color: #fafafa;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  height: 300px;
  padding: 1rem;

  &.noimage {
    height: 80px;
  }

  & img {
    max-height: 100%;
  }
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

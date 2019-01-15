<template lang='pug'>
section.section
  link-to-new-item(:genre='genreName')
  .container
    .columns
      .column
        .columns
          .column
            .user-and-genre.is-flex-column.m-b-md
              nuxt-link(:to='`/users/${user.id}`').is-flex.is-ai-center
                user-image.is-32x32.m-r-sm(:url='user.picture')
                div {{user.name}}
              nuxt-link(:to='`/genres/${genreName}`')
                span.sparator-text
                  | /
                | {{genreName}}
  .container
    .timeline-bar
    .item-container(
      v-for='item in items'
    )
      .timeline-mark--current(v-if='isUsing(item)')
      .timeline-mark--legacy(v-else)
      .columns
        .column
          template(v-if='isUsing(item)')
            h3.title.is-3
              | {{item.name}}
          template(v-else)
            h4.title.is-4
              | {{item.name}}
              span.notUsingLabel （過去に利用）
      .columns
        .column.is-5
          .imageWrapper(:class='{ noimage: !item.imageUrl }')
            item-image(:url='item.imageUrl')
        .column
          div(v-if='isEditable(item)')
            nuxt-link.edit-link(:to='`/items/${item.id}/edit`')
              span.icon.is-small
                i.fas.fa-edit
              span 編集する
          .description
            | {{item.description}}
          .itemLink(v-if='item.link')
            a(:href='item.link' target='_blank')
              hr
              span 参考リンクを開く
              span.icon
                i.fas.fa-external-link-alt
          div
            span.timestamp {{updatedAt(item)}}
</template>

<script lang="ts">
import { State } from 'vuex-class';
import { State as Auth } from '~/store/auth';
import { NuxtContext } from 'types';
import * as _ from 'lodash';
import * as api from '~/api';
import * as auth from '~/store/auth';
import * as moment from 'moment';
import AnyUserPresenter, { AnyUser } from '~/presenters/anyUser';
import Component from 'vue-class-component';
import ItemImage from '~/components/atoms/ItemImage.vue';
import ItemPresenter, { Item } from '~/presenters/item';
import LinkToNewItem from '~/components/atoms/LinkToNewItem.vue';
import UserImage from '~/components/atoms/UserImage.vue';
import Vue from 'vue';

@Component({
  components: { ItemImage, UserImage, LinkToNewItem },
  head() {
    return {
      title: (this as any).title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${(this as any).title} | ibuos`,
        },
        {
          hid: 'og:title',
          property: 'og:description',
          content: `${(this as any).title} | ibuos`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: (this as any).ogpImage,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: (this as any).ogpImage,
        },
      ],
    };
  },
})
export default class UserGenre extends Vue {
  @State('auth') auth!: Auth;

  user: AnyUser | null = null;
  genreName: string = '';
  items: Item[] = [];

  async asyncData(context: NuxtContext) {
    try {
      const userId = context.params.id as number;
      const genreName = context.params.genre as string;
      const res = await api.getUserGenreItems(context.$axios, userId, genreName);
      return {
        genreName,
        user: AnyUserPresenter.fromResponse(res.user),
        items: ItemPresenter.fromResponses(res.list),
      };
    } catch (e) {
      context.error(e);
    }
  }

  updatedAt(item: Item) {
    return moment(item.updatedAt).fromNow() + 'に更新';
  }

  isEditable(item: Item) {
    return item.user && item.user.id === this.auth.user.id;
  }

  isUsing(item: Item) {
    return item.statusOfUse === 'using';
  }

  get title() {
    return `${this.user!.name}の使っている${this.genreName}`;
  }

  get ogpImage() {
    return this.firstItem ? this.firstItem.imageUrl : 'https://ibuos.net/images/ibuos@og.png';
  }

  get firstItem() {
    return this.items.length ? this.items[0] : null;
  }
}
</script>

<style scoped>
.user-and-genre {
  width: 100%;
  font-size: 1rem;

  & .sparator-text {
    font-size: 0.7rem;
    margin-left: 2.5rem;
    margin-right: 0.25rem;
  }
}

.notUsingLabel {
  font-size: 0.5em;
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

.edit-link {
  font-size: 0.8rem;
  margin-bottom: 15px;
}

.description {
  white-space: pre-wrap;
}

.timestamp {
  font-size: 0.8rem;
  color: #999;
}

.item-container {
  position: relative;
  padding-left: 20px;
  margin-bottom: 40px;
}

.timeline-bar {
  border-left: 2px solid #ddd;
  display: block;
  height: calc(100% - 30px);
  left: 0px;
  position: absolute;
  width: 3px;
  top: 30px;
}

.timeline-mark--current {
  position: absolute;
  left: -8px;
  top: 23px;
  border: 9px solid hsla(165, 34%, 65%, 1);
  border-radius: 100%;
}

.timeline-mark--legacy {
  position: absolute;
  left: -5px;
  top: 23px;
  border: 6px solid #ccc;
  border-radius: 100%;
}

</style>

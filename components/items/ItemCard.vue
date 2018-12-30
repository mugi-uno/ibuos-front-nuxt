<template lang='pug'>
.card.card
  nuxt-link.editLink(
    v-if='editable'
    :to='`/items/${item.id}/edit`'
  )
    span.icon.is-small
      i.fas.fa-edit
  .card-image.cardImage
    nuxt-link.cardImageLink(:to='`/items/${item.id}`')
      template(v-if='item.imageUrl')
        img(:src='item.imageUrl')
      template(v-else)
        | No Image
  .card-content.cardContent
    .media
      .media-content
        p.subtitle.is-6(v-if='item.genre')
          nuxt-link(:to='`/genres/${item.genre}`')
            ellipsis-text(
              :text='item.genre'
              :size='15'
            )
        p.title.is-5
          nuxt-link(:to='`/items/${item.id}`')
            ellipsis-text(
              :text='item.name'
              :size='40'
            )
    .cardfooter
      template(v-if='item.user && !withoutUser')
        nuxt-link.user(:to='`/users/${item.user.id}`')
          figure.image.is-32x32
            img.is-rounded(:src='item.user.picture')
          span {{item.user.name}}
      span {{updatedAtText}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import { Item } from 'presenters/item';
import EllipsisText from '../atoms/EllipsisText.vue';
import * as moment from 'moment';

@Component({
  components: { EllipsisText },
})
export default class ItemCard extends Vue {
  @Prop() item!: Item;
  @Prop({ default: false })
  withoutUser!: boolean;
  @Prop({ default: false })
  editable!: boolean;

  get updatedAtText() {
    return moment(this.item.updatedAt).fromNow();
  }
}
</script>

<style scoped>
.card {
  width: 95%;
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.editLink {
  display: inline-block;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  opacity: 0.4;
  cursor: pointer;
  z-index: 1000000;

  &:hover {
    opacity: 1;
  }
}

.cardImage {
  height: 160px;
}

.cardImageLink {
  display: flex;
  width: calc(100% - 2rem);
  height: calc(100% - 1rem);
  justify-content: center;
  align-items: center;
  margin: 1rem 1rem 0rem 1rem;
}

.cardImage img {
  max-height: 100%;
  max-width: 100%;
}

.cardContent {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user {
  display: flex;
  align-items: center;

  & span {
    padding-left: 4px;
  }
}

.cardfooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: gray;
}
</style>

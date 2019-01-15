<template lang='pug'>
.card.card
  nuxt-link.editLink(
    v-if='editable'
    :to='`/items/${item.id}/edit`'
  )
    span.icon.is-small
      i.fas.fa-edit
  .card-content.cardContent(:class='{ notUsing: isNotUsing }')
    .leftArea
      .card-image.cardImage
        nuxt-link.cardImageLink(:to='`/users/${item.user.id}/${item.genre}`')
          item-image(:url='item.imageUrl')
    .rightArea
      .itemData
        p.subtitle.is-6(v-if='item.genre')
          nuxt-link(:to='`/genres/${item.genre}`')
            ellipsis-text(
              :text='item.genre'
              :size='15'
            )
        p.title.is-5
          nuxt-link(:to='`/users/${item.user.id}/${item.genre}`')
            i(v-if='isNotUsing').fas.fa-archive.m-r-xs
            ellipsis-text(
              :text='item.name'
              :size='50'
            )
      .cardfooter
        nuxt-link.user(:to='`/users/${item.user.id}`')
          user-image.is-32x32(:url='item.user.picture')
          span {{item.user.name}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import { Item } from 'presenters/item';
import EllipsisText from '../atoms/EllipsisText.vue';
import ItemImage from '~/components/atoms/ItemImage.vue';
import UserImage from '~/components/atoms/UserImage.vue';
import * as moment from 'moment';

@Component({
  components: { EllipsisText, ItemImage, UserImage },
})
export default class ItemCard extends Vue {
  @Prop() item!: Item;
  @Prop({ default: false })
  withoutUser!: boolean;
  @Prop({ default: false })
  editable!: boolean;

  get isNotUsing() {
    return this.item!.statusOfUse === 'notusing';
  }

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

.cardContent {
  padding: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;

  &.notUsing {
    background-color: #eee;
  }
}

.leftArea {
  justify-content: center;
  display: flex;
  align-self: stretch;
  align-items: center;
  background-color: #fafafa;
}

.rightArea {
  padding: 0.5rem 1rem;
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
  height: 120px;
  width: 120px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardImageLink {
  display: flex;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
  justify-content: center;
  align-items: center;
}

.cardImage img {
  max-height: 100%;
  max-width: 100%;
}

.user {
  display: flex;
  align-items: center;

  & span {
    padding-left: 4px;
  }
}

.cardfooter {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: gray;
}
</style>

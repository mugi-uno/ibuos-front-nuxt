<template lang='pug'>
section.section
  .container
    .title-line
      h4.title.is-4
        | 使っているものを更新する
      a(href='#' @click.prevent='deleteItem').delete-link.has-text-danger 削除する
    item-edit-form(
      :initial-item-form='itemForm'
      :saving='saving'
      @save='updateItem'
    )
</template>

<script lang="ts">
import { namespace } from 'vuex-class';
import { NuxtContext } from 'types';
import * as api from '~/api';
import * as auth from '~/store/auth';
import * as moment from 'moment';
import * as _ from 'lodash';
import Component from 'vue-class-component';
import ItemEditForm from '~/components/organisms/ItemEditForm.vue';
import ItemPresenter, { Item } from '~/presenters/item';
import ItemFormPresenter, { ItemForm } from '~/presenters/itemForm';
import Vue from 'vue';

const authModule = namespace(auth.name);

@Component({
  components: { ItemEditForm },
  middleware: ['authenticated'],
  head() {
    return {
      title: (this as any).item.name,
    };
  },
})
export default class EditItem extends Vue {
  @authModule.State user!: auth.User;

  item!: Item;
  itemForm!: ItemForm;
  id!: number;
  saving: boolean = false;

  async asyncData(context: NuxtContext) {
    try {
      const id = context.params.id;
      const res = await api.getItem(context.$axios, id);
      const item = ItemPresenter.fromResponse(res);
      return {
        id,
        item,
        itemForm: ItemFormPresenter.buildFromItem(item),
      };
    } catch (e) {
      context.error(e);
    }
  }

  async updateItem(itemForm: ItemForm) {
    this.saving = true;

    try {
      await api.updateItem(this.$axios, this.id, itemForm);

      this.$router.push(`/users/${this.user.id}/${encodeURIComponent(itemForm.genre)}`);
      this.$message({
        type: 'success',
        message: `「${itemForm.name}」を更新しました`,
      });
    } finally {
      this.saving = false;
    }
  }

  async deleteItem() {
    try {
      await this.$confirm('削除しますか？', {
        type: 'warning',
        confirmButtonText: '削除する',
        cancelButtonText: 'やめておく'
      });
    } catch(_e) {
      return;
    }

    try {
      await api.deleteItem(this.$axios, this.id);

      this.$router.push(`/users/${this.user.id}`);
      this.$message({
        type: 'success',
        message: `削除しました`,
      });
    } finally {
      // nothing to do.
    }
  }
}
</script>

<style scoped>
.title-line {
  display: flex;
  justify-content: space-between;
}

.delete-link {
  font-size: 0.85em;
}
</style>

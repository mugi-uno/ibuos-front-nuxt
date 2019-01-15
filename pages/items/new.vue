<template lang='pug'>
section.section
  .container
    h4.title.is-4
      | 使っているものを追加する
    item-edit-form(
      :initial-item-form='itemForm'
      :saving='saving'
      @save='saveItem'
    )
</template>

<script lang="ts">
import { namespace } from 'vuex-class';
import { NuxtContext } from 'types';
import * as api from '~/api';
import * as auth from '~/store/auth';
import * as _ from 'lodash';
import ItemFormPresenter, { ItemForm } from '~/presenters/itemForm';
import ItemEditForm from '~/components/organisms/ItemEditForm.vue';
import Component from 'vue-class-component';
import Vue from 'vue';

const authModule = namespace(auth.name);

@Component({
  head: () => ({ title: '使っているものを追加する' }),
  middleware: ['authenticated'],
  components: { ItemEditForm },
})
export default class NewItem extends Vue {
  @authModule.State user!: auth.User;
  itemForm!: ItemForm;
  saving: boolean = false;

  asyncData(context: NuxtContext) {
    const itemForm = ItemFormPresenter.build();
    const genre = context.route.query.genre as string;

    if (genre) {
      itemForm.genre = genre;
    }

    return { itemForm };
  }

  async saveItem(itemForm: ItemForm) {
    this.saving = true;

    try {
      await api.saveItem(this.$axios, itemForm);

      this.$router.push(`/users/${this.user.id}/${encodeURIComponent(itemForm.genre)}`);
      this.$message({
        type: 'success',
        message: `使っているものに「${itemForm.name}」を追加しました`,
      });
    } finally {
      this.saving = false;
    }
  }
}
</script>

<template lang='pug'>
  div
    .columns
      .column.is-8
        .field
          label.label
            i.fas.fa-tag.m-r-xs
            span ジャンル
          .control
            input.input.is-medium(
              type='text' placeholder='e.g.) キーボード'
              v-model='itemForm.genre'
            )

        .field
          label.label
            i.fas.fa-signature.m-r-xs
            span 名前
          .control.is-medium
            input.input.is-medium(
              type='text' placeholder='e.g.) Happy Hacking Keyboard'
              v-model='itemForm.name'
            )

        .field
          .control.is-medium
            textarea.textarea.is-small(
              placeholder='説明' rows='5'
              v-model='itemForm.description'
            )

        .field
          label.label
            i.fas.fa-link.m-r-xs
            span 参考リンク
          .control
            input.input.is-medium(
              type='text' placeholder='https://example.com/xxx'
              v-model='itemForm.link'
            )

        .field
          label.label
            i.fas.fa-car-side.m-r-xs
            span 使用状況
          el-radio-group(v-model='itemForm.statusOfUse')
            el-radio-button(label='using') 使っている
            el-radio-button(label='notusing') いまは使っていない

      .column.is-4.is-flex
        .imageBox
          image-uploader(
            :image-url='imageUrl'
            @uploaded='uploadedTemporaryImage'
          )
    .columns.is-centered
      .column.is-narrow
        button.button.is-primary.is-medium(
          :class='{ "is-loading": saving }'
          @click='save'
        )
          span(v-if='isUpdate') 更新する
          span(v-else) 追加する
</template>

<script lang="ts">
import { ItemForm } from '~/presenters/itemForm';
import { Prop, Emit } from 'vue-property-decorator';
import Component from 'vue-class-component';
import ImageUploader from '~/components/organisms/ImageUploader.vue';
import Vue from 'vue';

@Component({
  components: { ImageUploader },
})
export default class ItemEditForm extends Vue {
  @Prop({ default: false })
  saving!: boolean;
  @Prop() initialItemForm!: ItemForm;

  itemForm: ItemForm = {
    ...this.initialItemForm,
    temporaryImage: {
      ...this.initialItemForm.temporaryImage,
    },
  };

  get imageUrl(): string {
    return (
      this.itemForm.temporaryImage.imageTemporaryUrl || this.itemForm.imageUrl
    );
  }

  get isUpdate(): boolean {
    return !!this.itemForm.id;
  }

  uploadedTemporaryImage(data: { url: string; basename: string }) {
    this.itemForm.temporaryImage.imageTemporaryUrl = data.url;
    this.itemForm.temporaryImage.imageTemporaryBasename = data.basename;
  }

  @Emit()
  save() {
    return this.itemForm;
  }
}
</script>

<style scoped>
.imageBox {
  border: 1px solid #ddd;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
</style>

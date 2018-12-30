<template lang="pug">
  .wrapper
    no-ssr
      dropzone.dropzone(
        id='dropzone'
        :options='{ url: "example.com", autoQueue: false, autoProcessQueue: false, previewTemplate: "<div></div>" }'
        :use-custom-slot='true'
        :class='{ "dropzone--active": active }'
        :include-styling='false'
        @vdropzone-file-added='onFileAdded'
        @vdropzone-drag-over='active = true'
        @vdropzone-drag-leave='active = false'
      )
        .is-flex-column.is-ai-center
          img(v-if='imageUrl' :src='imageUrl')
          span.icon.loader(v-if='uploading')
          div(v-else)
            i.fas.fa-image.m-r-xs
            span 画像をアップロード
            .limitationText (jpg/png/gif, 〜3MB)
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import * as api from '~/api';

let Dropzone;
if (process.client) {
  Dropzone = require('vue2-dropzone');
} else {
  Dropzone = null;
}

@Component({
  components: { Dropzone },
})
export default class ImageUploader extends Vue {
  @Prop({ default: '' })
  imageUrl!: string;

  active: boolean = false;
  uploading: boolean = false;

  @Emit()
  uploaded(data: { url: string; basename: string }) {}

  async onFileAdded(file) {
    if (this.uploading) return;
    this.uploading = true;

    const { data } = await api
      .uploadTemporaryImage(this.$axios, file)
      .catch(() => ({ data: {} }));

    if (data && data.url) {
      this.uploaded(data);
    }

    this.uploading = false;
    this.active = false;
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.dropzone {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 0.25rem;
}

.dropzone--active {
  border: 3px solid #a7ffba;
}

.limitationText {
  font-size: 0.75rem;
  text-align: center;
}
</style>

<template lang='pug'>
section.section
  .container
    help-tab(mode='history')
    .content
      ul
        li 2019/01/16 - 「使っていたもの」も登録できるようになりました。
        li 2019/01/01 - SNS共有時にタイトル・画像が展開されるようになりました。
        li 2018/09/01 - ジャンルごとの「使っているもの」ページを追加しました。
        li 2018/08/31 - このページを追加しました。
        li 2018/08/30 - サービスを公開しました。
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HelpTab from '~/components/help/HelpTab.vue';

@Component({
  components: { HelpTab },
  head: () => ({ title: '変更履歴' }),
})
export default class History extends Vue {}
</script>

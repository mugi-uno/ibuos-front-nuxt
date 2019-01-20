<template lang="pug">
section.section
  .container
    help-tab(mode='help')
    .content
      h2 ibuosとは？
      p ibuosは「使っているもの」の管理・共有サービスです。
      p 自分が使っているものを登録して共有したり、みんなの使っているものを眺めたりすることができます。
      hr
      h2 つかいかた
      h4 ログイン
      p 右上のメニューから「Sign In」を選んでください。
      p Twitter、Google、GitHubのいずれかのアカウントでログインすることができます。
      h4 使っているものを追加する
      p 右上のメニューの「使っているものを追加する」リンクから追加できます。
      p 画像をアップロードする際は、権利を侵害しないものをご利用ください。
      h4 自分の使っているものを確認する
      p 右上のメニューの「自分の使っているものを見る」リンクから確認できます。
      p このページ内のそれぞれの「使っているもの」右上の編集リンクから、内容を編集できます。
      h4 アカウント名を変更する
      p 右上のメニューから自分のアカウント名をクリックしたリンク先から編集できます。
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HelpTab from '~/components/help/HelpTab.vue';

@Component({
  components: { HelpTab },
  head: () => ({ title: 'ヘルプ' }),
})
export default class Help extends Vue {}
</script>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { onMounted, onBeforeUnmount, ref } from 'vue';
const editor = ref();
onMounted(() => {
  editor.value = new Editor({
    content: `
      <h1>This is a 1st level heading</h1>
      <p>I’m running Tiptap with Vue.js. 🎉</p>
    `,
    extensions: [
      StarterKit,
      Document,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Paragraph,
      Text,
    ],
    editorProps: {
      // 给 DOM 元素增加 Tailwind CSS 类
      attributes: {
        class: 'min-h-14 bg-slate-100',
      },
    }
  });
})
onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<template>
  <editor-content :editor="editor" />
</template>

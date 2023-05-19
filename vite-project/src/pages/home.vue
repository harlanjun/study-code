<template>
  <div>home</div>
  <todoList></todoList>
  <rate :value="3"></rate>
  <rate :value="5" theme="pink"></rate>
</template>
<script setup>
import todoList from '../components/todolist.vue'
import rate from '../components/rate.vue'
</script>
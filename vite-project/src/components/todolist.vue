<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo">
    <div v-if="all > 0">
      <div v-for="(item, index) in todoList" :key="index">
        <input type="checkbox" v-model="item.done">
        <span>{{item.title}}</span>
      </div>
    </div>
    <div v-else>暂无数据</div>
    <div>
      <input type="checkbox" v-model="allDone" />
      <span>全选</span>
    </div>
    <div>{{active}} / {{all}}</div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
let title = ref('')
let todoList = ref([])
function addTodo () {
  todoList.value.push({
    title: title.value,
    done: false
  })
}
const active = computed(() => {
  return todoList.value.filter(v => v.done).length
})
const all = computed(()=> todoList.value.length)
const allDone = computed({ 
  get: function () { 
    return active.value > 0 && active.value === all.value; 
  }, 
  set: function (value) { 
    todoList.value.forEach((todo) => { todo.done = value; }); 
  },
})
</script>
<style>
h1 {
  color: pink;
}
</style>